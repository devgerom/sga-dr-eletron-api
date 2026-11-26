const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoriaService {
  async criar(nome) {
    const categoriaExiste = await prisma.categoria.findUnique({ where: { nome } });
    if (categoriaExiste) throw new Error('Categoria já cadastrada');

    return await prisma.categoria.create({ data: { nome } });
  }

  async listarTodas() {
    return await prisma.categoria.findMany();
  }

  async buscarPorId(id) {
    const categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } });
    if (!categoria) throw new Error('Categoria não encontrada');
    return categoria;
  }

  async atualizar(id, nome) {
    await this.buscarPorId(id); // Garante que existe
    return await prisma.categoria.update({
      where: { id: Number(id) },
      data: { nome },
    });
  }

  async excluir(id) {
    await this.buscarPorId(id); // Garante que existe
    return await prisma.categoria.delete({ where: { id: Number(id) } });
  }
}

module.exports = new CategoriaService();