const ordemServicoService = require('../services/ordemServicoService');

class OrdemServicoController {
  async criar(req, res) {
    try {
      const {
        numero,
        clienteId,
        descricaoProblema,
        equipamento,
        dataAbertura,
      } = req.body;

      if (!numero || !clienteId || !descricaoProblema || !equipamento) {
        return res.status(400).json({
          error: 'Número, cliente, descrição do problema e equipamento são obrigatórios',
        });
      }

      if (!Number.isInteger(Number(numero)) || Number(numero) <= 0) {
        return res.status(400).json({
          error: 'O número da Ordem de Serviço deve ser um número inteiro positivo',
        });
      }

      if (!Number.isInteger(Number(clienteId)) || Number(clienteId) <= 0) {
        return res.status(400).json({
          error: 'O ID do cliente deve ser um número inteiro positivo',
        });
      }

      const ordemServico = await ordemServicoService.criar({
        numero,
        clienteId,
        descricaoProblema,
        equipamento,
        dataAbertura,
      });

      return res.status(201).json(ordemServico);
    } catch (error) {
      if (
        error.message === 'Ordem de Serviço já cadastrada' ||
        error.message === 'Cliente não encontrado'
      ) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async listar(req, res) {
    try {
      const ordensServico = await ordemServicoService.listarTodas();
      return res.status(200).json(ordensServico);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async buscarPorId(req, res) {
    try {
      const ordemServico = await ordemServicoService.buscarPorId(req.params.id);
      return res.status(200).json(ordemServico);
    } catch (error) {
      if (error.message === 'Ordem de Serviço não encontrada') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        numero,
        clienteId,
        descricaoProblema,
        equipamento,
        dataAbertura,
      } = req.body;

      if (
        numero === undefined &&
        clienteId === undefined &&
        descricaoProblema === undefined &&
        equipamento === undefined &&
        dataAbertura === undefined
      ) {
        return res.status(400).json({
          error: 'Informe pelo menos um campo para atualizar',
        });
      }

      if (numero !== undefined && (!Number.isInteger(Number(numero)) || Number(numero) <= 0)) {
        return res.status(400).json({
          error: 'O número da Ordem de Serviço deve ser um número inteiro positivo',
        });
      }

      if (clienteId !== undefined && (!Number.isInteger(Number(clienteId)) || Number(clienteId) <= 0)) {
        return res.status(400).json({
          error: 'O ID do cliente deve ser um número inteiro positivo',
        });
      }

      const ordemServico = await ordemServicoService.atualizar(id, {
        numero,
        clienteId,
        descricaoProblema,
        equipamento,
        dataAbertura,
      });

      return res.status(200).json(ordemServico);
    } catch (error) {
      if (
        error.message === 'Ordem de Serviço não encontrada' ||
        error.message === 'Cliente não encontrado'
      ) {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async excluir(req, res) {
    try {
      await ordemServicoService.excluir(req.params.id);
      return res.status(204).send();
    } catch (error) {
      if (error.message === 'Ordem de Serviço não encontrada') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = new OrdemServicoController();