import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { Fornecedor } from '@prisma/client';
import { SearchFornecedorDto } from './dto/search-fornecedor.dto';

@Injectable()
export class FornecedoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    return this.prisma.fornecedor.create({
      data: createFornecedorDto,
    });
  }

  async findAll(
    searchFornecedorDto: SearchFornecedorDto,
  ): Promise<Fornecedor[]> {
    try {
      const { search, minValue } = searchFornecedorDto;

      const valorMinimo = isNaN(parseFloat(String(minValue)))
        ? 0
        : parseFloat(String(minValue));

      return this.prisma.fornecedor.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  nome: {
                    contains: search ?? '',
                  },
                },
                {
                  estadoOrigem: {
                    contains: search ?? '',
                  },
                },
              ],
            },
            {
              limiteMinimoKwh: {
                gte: valorMinimo,
              },
            },
          ],
        },
      });
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new Error('Erro ao buscar fornecedores');
    }
  }

  async findOne(id: string): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
    }

    return fornecedor;
  }

  async update(
    id: string,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
    }

    return this.prisma.fornecedor.update({
      where: { id },
      data: updateFornecedorDto,
    });
  }

  async remove(id: string): Promise<Fornecedor> {
    const fornecedor = await this.prisma.fornecedor.findUnique({
      where: { id },
    });

    if (!fornecedor) {
      throw new NotFoundException(`Fornecedor com ID ${id} não encontrado.`);
    }

    return this.prisma.fornecedor.delete({
      where: { id },
    });
  }
}
