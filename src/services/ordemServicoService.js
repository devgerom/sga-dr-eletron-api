const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrdemServicoService {
  async criar(dados) {
    const ordemExiste = await prisma.ordemServico.findUnique({
      where: { numero: Number(dados.numero) },
    });

    if (ordemExiste) throw new Error('Ordem de Serviço já cadastrada');

    const clienteExiste = await prisma.cliente.findUnique({
      where: { id: Number(dados.clienteId) },
    });

    if (!clienteExiste) throw new Error('Cliente não encontrado');

    return await prisma.ordemServico.create({
      data: {
        numero: Number(dados.numero),
        clienteId: Number(dados.clienteId),
        descricaoProblema: dados.descricaoProblema,
        equipamento: dados.equipamento,
        dataAbertura: dados.dataAbertura
          ? new Date(dados.dataAbertura)
          : undefined,
      },
    });
  }

  async listarTodas() {
    return await prisma.ordemServico.findMany({
      include: { cliente: true },
    });
  }

  async buscarPorId(id) {
    const ordemServico = await prisma.ordemServico.findUnique({
      where: { id: Number(id) },
      include: { cliente: true },
    });

    if (!ordemServico) throw new Error('Ordem de Serviço não encontrada');

    return ordemServico;
  }

  async atualizar(id, dados) {
    await this.buscarPorId(id);

    if (dados.clienteId) {
      const clienteExiste = await prisma.cliente.findUnique({
        where: { id: Number(dados.clienteId) },
      });

      if (!clienteExiste) throw new Error('Cliente não encontrado');
    }

    return await prisma.ordemServico.update({
      where: { id: Number(id) },
      data: {
        ...(dados.numero !== undefined && {
          numero: Number(dados.numero),
        }),
        ...(dados.clienteId !== undefined && {
          clienteId: Number(dados.clienteId),
        }),
        ...(dados.descricaoProblema !== undefined && {
          descricaoProblema: dados.descricaoProblema,
        }),
        ...(dados.equipamento !== undefined && {
          equipamento: dados.equipamento,
        }),
        ...(dados.dataAbertura !== undefined && {
          dataAbertura: new Date(dados.dataAbertura),
        }),
      },
    });
  }

  async excluir(id) {
    await this.buscarPorId(id);

    return await prisma.ordemServico.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = new OrdemServicoService();