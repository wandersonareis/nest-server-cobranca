import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, ILike, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserAddress } from './entities/user-address.entity';
import SharedService from '@/shared/shared.service';
import IPersonalInfo from '@/shared/interface/IPersonalInfo';
import * as diacritics from 'diacritics';
import ICreateUser from './interface/ICreateUser';

@Injectable()
export class UsersService {
  constructor(
    private readonly sharedService: SharedService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<ICreateUser> {
    const { address: userAddress_req, ...user_req } = createUserDto;
    const user = this.userRepository.create(user_req);
    user.password = this.sharedService.hashPassword(createUserDto.password);

    if (userAddress_req) {
      user.address = this.userAddressRepository.create(userAddress_req);
    }

    return this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<IPersonalInfo[]> {
    return await this.userRepository.find({ relations: ['address'] });
  }

  findAllByName(letter: string): Promise<IPersonalInfo[]> {
    const search = diacritics.remove(letter);
    const clientes = this.userRepository.find({
      where: {
        name: ILike(`%${search}%`),
      },
    });
    return clientes;
  }

  findOne(conditions: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(conditions);
  }

  findOneById(id: number): Promise<IPersonalInfo | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['address'],
    });
  }

  findOneByEmail(email: string): Promise<IPersonalInfo | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['address'],
    });
  }

  update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      user.password = this.sharedService.hashPassword(updateUserDto.password);
    }

    this.userRepository.merge(user, updateUserDto);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async checkUniqueProperties(
    properties: string[],
    userDto: IPersonalInfo,
    userId?: number,
  ): Promise<void> {
    if (!properties || !properties.length) {
      return;
    }

    for (const property of properties) {
      if (!userDto[property]) {
        continue;
      }

      const query: FindOneOptions<User> = userId
        ? { where: { [property]: userDto[property], id: Not(userId) } }
        : { where: { [property]: userDto[property] } };

      const existingUser = await this.userRepository.findOne(query);

      if (existingUser) {
        throw new BadRequestException(
          `${property}: Já existe um usuário cadastrado com este ${property}`,
        );
      }
    }
  }

  get repository() {
    return this.userRepository;
  }
}
