const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const { nome, email, senha } = req.body;
      if (!nome || !email || !senha) return res.status(400).json({ error: 'Preencha todos os campos' });

      const usuario = await authService.register(nome, email, senha);
      return res.status(201).json({ message: 'Usuário criado com sucesso', usuario });
    } catch (error) {
      if (error.message === 'E-mail já cadastrado') return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      if (!email || !senha) return res.status(400).json({ error: 'Preencha todos os campos' });

      const dados = await authService.login(email, senha);
      return res.status(200).json(dados);
    } catch (error) {
      console.log("ERRO NO LOGIN:", error); // <-- ADICIONE ESTA LINHA
      if (error.message === 'Credenciais inválidas') return res.status(401).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return res.status(200).json({ message: 'Se o e-mail existir, um token foi gerado (ver console)' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, novaSenha } = req.body;
      if (!token || !novaSenha) return res.status(400).json({ error: 'Token e nova senha são obrigatórios' });

      await authService.resetPassword(token, novaSenha);
      return res.status(200).json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      if (error.message.includes('Token')) return res.status(400).json({ error: error.message });
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}

module.exports = new AuthController();