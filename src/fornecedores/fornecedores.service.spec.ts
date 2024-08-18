import { Test, TestingModule } from '@nestjs/testing';
import { FornecedoresService } from './fornecedores.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';
import { ObjectId } from 'mongodb';

describe('FornecedoresService', () => {
  let service: FornecedoresService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FornecedoresService, PrismaService],
    }).compile();

    service = module.get<FornecedoresService>(FornecedoresService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new fornecedor', async () => {
      const createFornecedorDto: CreateFornecedorDto = {
        nome: 'Energia Solar Ltda',
        logo: 'https://example.com/logos/energia-solar.png',
        estadoOrigem: 'São Paulo',
        custoPorKwh: 0.45,
        limiteMinimoKwh: 5000,
        totalClientes: 150,
        avaliacaoMedia: 4.8,
      };

      const result = { id: '1', ...createFornecedorDto };

      jest.spyOn(prisma.fornecedor, 'create').mockResolvedValue(result);

      expect(await service.create(createFornecedorDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of fornecedores with search and minValue', async () => {
      const result = [
        {
          id: '1',
          nome: 'Energia Solar Ltda',
          logo: 'https://example.com/logos/energia-solar.png',
          estadoOrigem: 'São Paulo',
          custoPorKwh: 0.45,
          limiteMinimoKwh: 5000,
          totalClientes: 150,
          avaliacaoMedia: 4.8,
        },
      ];

      jest.spyOn(prisma.fornecedor, 'findMany').mockResolvedValue(result);

      expect(
        await service.findAll({ search: 'Energia', minValue: 1000 }),
      ).toEqual(result);
    });

    it('should return an array of fornecedores with search only', async () => {
      const result = [
        {
          id: '1',
          nome: 'Energia Solar Ltda',
          logo: 'https://example.com/logos/energia-solar.png',
          estadoOrigem: 'São Paulo',
          custoPorKwh: 0.45,
          limiteMinimoKwh: 5000,
          totalClientes: 150,
          avaliacaoMedia: 4.8,
        },
      ];

      jest.spyOn(prisma.fornecedor, 'findMany').mockResolvedValue(result);

      expect(await service.findAll({ search: 'Solar' })).toEqual(result);
    });

    it('should return an array of fornecedores with minValue only', async () => {
      const result = [
        {
          id: '1',
          nome: 'Energia Solar Ltda',
          logo: 'https://example.com/logos/energia-solar.png',
          estadoOrigem: 'São Paulo',
          custoPorKwh: 0.45,
          limiteMinimoKwh: 5000,
          totalClientes: 150,
          avaliacaoMedia: 4.8,
        },
      ];

      jest.spyOn(prisma.fornecedor, 'findMany').mockResolvedValue(result);

      expect(await service.findAll({ minValue: 1000 })).toEqual(result);
    });

    it('should return an empty array when no fornecedores match search and minValue', async () => {
      jest.spyOn(prisma.fornecedor, 'findMany').mockResolvedValue([]);

      expect(
        await service.findAll({ search: 'Nonexistent', minValue: 1000 }),
      ).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single fornecedor', async () => {
      const id = '1';
      const result = {
        id: '1',
        nome: 'Energia Solar Ltda',
        logo: 'https://example.com/logos/energia-solar.png',
        estadoOrigem: 'São Paulo',
        custoPorKwh: 0.45,
        limiteMinimoKwh: 5000,
        totalClientes: 150,
        avaliacaoMedia: 4.8,
      };

      jest.spyOn(prisma.fornecedor, 'findUnique').mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a fornecedor', async () => {
      const id = new ObjectId().toHexString();
      const updateFornecedorDto: UpdateFornecedorDto = {
        nome: 'Energia Solar Atualizada Ltda',
      };

      const result = {
        id,
        nome: 'Energia Solar Atualizada Ltda',
        logo: 'https://example.com/logos/energia-solar.png',
        estadoOrigem: 'São Paulo',
        custoPorKwh: 0.45,
        limiteMinimoKwh: 5000,
        totalClientes: 150,
        avaliacaoMedia: 4.8,
      };

      jest.spyOn(prisma.fornecedor, 'findUnique').mockResolvedValue(result);
      jest.spyOn(prisma.fornecedor, 'update').mockResolvedValue(result);

      expect(await service.update(id, updateFornecedorDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should delete a fornecedor', async () => {
      const id = new ObjectId().toHexString();
      const result = {
        id,
        nome: 'Energia Solar Ltda',
        logo: 'https://example.com/logos/energia-solar.png',
        estadoOrigem: 'São Paulo',
        custoPorKwh: 0.45,
        limiteMinimoKwh: 5000,
        totalClientes: 150,
        avaliacaoMedia: 4.8,
      };

      jest.spyOn(prisma.fornecedor, 'findUnique').mockResolvedValue(result);
      jest.spyOn(prisma.fornecedor, 'delete').mockResolvedValue(result);

      expect(await service.remove(id)).toEqual(result);
    });
  });
});
