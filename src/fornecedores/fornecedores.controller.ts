import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FornecedoresService } from './fornecedores.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from '@prisma/client';
import { SearchFornecedorDto } from './dto/search-fornecedor.dto';

@Controller('fornecedores')
export class FornecedoresController {
  constructor(private readonly fornecedoresService: FornecedoresService) {}

  @Post()
  create(
    @Body() createFornecedoreDto: CreateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedoresService.create(createFornecedoreDto);
  }

  @Get('filter')
  findAll(
    @Query() searchFornecedorDto: SearchFornecedorDto,
  ): Promise<Fornecedor[]> {
    return this.fornecedoresService.findAll(searchFornecedorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Fornecedor> {
    return this.fornecedoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFornecedoreDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    return this.fornecedoresService.update(id, updateFornecedoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Fornecedor> {
    return this.fornecedoresService.remove(id);
  }
}
