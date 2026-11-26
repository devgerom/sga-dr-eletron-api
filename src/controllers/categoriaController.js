const categoriaService = require('../services/categoriaService');

class CategoriaController {
  async criar(req, res) {
    try {
      const { nome } = req.body;
      if (!nome) return res.status(400).json({ error: 'O nome da categoria é obrigatório' });

      const categoria = await categoriaService.criar(nome);
      return res.status(201).json(categoria);
    } catch (error) {
      if (error.message === 'Categoria já cadastrada') return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listar(req, res) {
    try {
      const categorias = await categoriaService.listarTodas();
      return res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req, res) {
    try {
      const categoria = await categoriaService.buscarPorId(req.params.id);
      return res.status(200).json(categoria);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') return res.status(404).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      if (!nome) return res.status(400).json({ error: 'O nome da categoria é obrigatório' });

      const categoria = await categoriaService.atualizar(id, nome);
      return res.status(200).json(categoria);
    } catch (error) {
      if (error.message === 'Categoria não encontrada') return res.status(404).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async excluir(req, res) {
    try {
      await categoriaService.excluir(req.params.id);
      return res.status(204).send(); // 204 No Content para exclusão bem-sucedida
    } catch (error) {
      if (error.message === 'Categoria não encontrada') return res.status(404).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new CategoriaController();