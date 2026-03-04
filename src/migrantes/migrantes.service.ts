import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMigranteDto } from './dto/create-migrante.dto';
import { UpdateMigranteDto } from './dto/update-migrante.dto';

@Injectable()
export class MigrantesService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Migrante
  create(dto: CreateMigranteDto) {
    return this.prisma.migrante.create({
      data: {
        nomeCompleto:        dto.nomeCompleto,
        dataNascimento:      dto.dataNascimento,
        sexo:                dto.sexo,
        nacionalidade:       dto.nacionalidade,
        paisOrigem:          dto.paisOrigem,
        statusLegal:         dto.statusLegal,
        etnia:               dto.etnia,
        cpf:                 dto.cpf,
        temDeficiencia:      dto.temDeficiencia ?? false,
        dataEntradaBrasil:   dto.dataEntradaBrasil,
        pontoEntradaBrasil:  dto.pontoEntradaBrasil,
        bairro:              dto.bairro,
        contato:             dto.contato,
        municipioResidencia: dto.municipioResidencia,
        profissao:           dto.profissao,
        composicaoFamiliar:  dto.composicaoFamiliar,
        isChefeFamilia:      dto.isChefeFamilia ?? false,
        escolaridade:        dto.escolaridade,
        crnm:                dto.crnm,
        validadeCrnm:        dto.validadeCrnm,
        grupoFamiliarId:     dto.grupoFamiliarId,
      },
    });
  }

  // 2. Listar Todos
  findAll() {
    return this.prisma.migrante.findMany({
      orderBy: { id: 'desc' },
    });
  }

  // 3. Buscar Um por ID — inclui o último atendimento para exibição no modal
  async findOne(id: number) {
    const migrante = await this.prisma.migrante.findUnique({
      where: { id },
      include: {
        atendimentos: {
          orderBy: { dataAtendimento: 'desc' },
          take: 1,
        },
      },
    });
    if (!migrante) throw new NotFoundException('Migrante não encontrado.');

    const { atendimentos, ...migranteData } = migrante;
    const ultimoAtendimento = atendimentos?.[0] ?? {};
    return {
      ...migranteData,
      ...ultimoAtendimento,
      id: migranteData.id,
      atendimentoId: (ultimoAtendimento as any).id ?? null,
    };
  }

  // 4. Atualizar (parcial)
  async update(id: number, dto: UpdateMigranteDto) {
    const exists = await this.prisma.migrante.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Migrante não encontrado.');

    return this.prisma.migrante.update({
      where: { id },
      data: {
        ...(dto.nomeCompleto        !== undefined && { nomeCompleto:        dto.nomeCompleto        }),
        ...(dto.dataNascimento      !== undefined && { dataNascimento:      dto.dataNascimento      }),
        ...(dto.sexo                !== undefined && { sexo:                dto.sexo                }),
        ...(dto.nacionalidade       !== undefined && { nacionalidade:       dto.nacionalidade       }),
        ...(dto.paisOrigem          !== undefined && { paisOrigem:          dto.paisOrigem          }),
        ...(dto.statusLegal         !== undefined && { statusLegal:         dto.statusLegal         }),
        ...(dto.etnia               !== undefined && { etnia:               dto.etnia               }),
        ...(dto.cpf                 !== undefined && { cpf:                 dto.cpf                 }),
        ...(dto.temDeficiencia      !== undefined && { temDeficiencia:      dto.temDeficiencia      }),
        ...(dto.dataEntradaBrasil   !== undefined && { dataEntradaBrasil:   dto.dataEntradaBrasil   }),
        ...(dto.pontoEntradaBrasil  !== undefined && { pontoEntradaBrasil:  dto.pontoEntradaBrasil  }),
        ...(dto.bairro              !== undefined && { bairro:              dto.bairro              }),
        ...(dto.contato             !== undefined && { contato:             dto.contato             }),
        ...(dto.municipioResidencia !== undefined && { municipioResidencia: dto.municipioResidencia }),
        ...(dto.profissao           !== undefined && { profissao:           dto.profissao           }),
        ...(dto.composicaoFamiliar  !== undefined && { composicaoFamiliar:  dto.composicaoFamiliar  }),
        ...(dto.isChefeFamilia      !== undefined && { isChefeFamilia:      dto.isChefeFamilia      }),
        ...(dto.escolaridade        !== undefined && { escolaridade:        dto.escolaridade        }),
        ...(dto.crnm                !== undefined && { crnm:                dto.crnm                }),
        ...(dto.validadeCrnm        !== undefined && { validadeCrnm:        dto.validadeCrnm        }),
        ...(dto.grupoFamiliarId     !== undefined && { grupoFamiliarId:     dto.grupoFamiliarId     }),
      },
    });
  }

  // 5. Deletar
  async remove(id: number) {
    const exists = await this.prisma.migrante.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Migrante não encontrado.');
    return this.prisma.migrante.delete({ where: { id } });
  }
}