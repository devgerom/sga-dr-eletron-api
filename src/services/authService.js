const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const prisma = new PrismaClient();

class AuthService {
  async register(nome, email, senha) {
    const usuarioExiste = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExiste) throw new Error('E-mail já cadastrado');

    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });
    return { id: usuario.id, nome: usuario.nome, email: usuario.email };
  }

  async login(email, senha) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) throw new Error('Credenciais inválidas');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
  }

  async forgotPassword(email) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return; // Não revela se o e-mail existe

    const token = crypto.randomBytes(20).toString('hex');
    const expiracao = new Date(Date.now() + 3600000); // 1 hora

    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { resetToken: token, resetTokenExpiresAt: expiracao },
    });

    // O professor permite exibir no console
    console.log(`🔑 Token de recuperação para ${email}: ${token}`);
  }

  async resetPassword(token, novaSenha) {
    const usuario = await prisma.usuario.findFirst({ where: { resetToken: token } });
    if (!usuario) throw new Error('Token inválido');
    if (usuario.resetTokenExpiresAt < new Date()) throw new Error('Token expirado');

    const senhaHash = await bcrypt.hash(novaSenha, 10);
    await prisma.usuario.update({
      where: { id: usuario.id },
      data: { senha: senhaHash, resetToken: null, resetTokenExpiresAt: null },
    });
  }
}

module.exports = new AuthService();