import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ReceivablesService } from './receivables.service';
import { CreateReceivableDto } from './dto/create-receivable.dto';
import { UpdateReceivableDto } from './dto/update-receivable.dto';
import { log } from 'console';
import { IdParam } from '@/shared/dto/id-param.dto';
import { SkipTakeQuery } from '@/shared/dto/skip-take-query.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('receivables')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class ReceivablesController {
  constructor(private readonly receivablesService: ReceivablesService) {}

  @Post()
  create(@Body() createReceivableDto: CreateReceivableDto) {
    log(createReceivableDto);
    //return this.receivablesService.create(createReceivableDto);
  }

  @Get()
  findAll(@Query() query: SkipTakeQuery) {
    return this.receivablesService.findAll(query.skip, query.take);
  }

  @Get(':id')
  async findOne(@Param() param: IdParam) {
    const receivable = await this.receivablesService.findOneById(param.id);
    if (!receivable) {
      throw new NotFoundException('Cobrança não encontrada');
    }
    return receivable;
  }

  @Patch(':id')
  async update(
    @Param() param: IdParam,
    @Body() updateReceivableDto: UpdateReceivableDto,
  ) {
    const receivable = await this.receivablesService.findOneById(param.id);
    if (!receivable) {
      throw new NotFoundException('Cobrança não encontrada');
    }
    return this.receivablesService.update(receivable, updateReceivableDto);
  }

  @Delete(':id')
  remove(@Param() param: IdParam) {
    const receivable = this.receivablesService.findOneById(param.id);
    if (!receivable) {
      throw new NotFoundException('Cobrança não encontrada');
    }

    return this.receivablesService.remove(param.id);
  }
}
