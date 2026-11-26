require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas de Autenticação (Públicas)
app.use('/auth', authRoutes);

// Rota de teste (Pública)
app.get('/', (req, res) => res.json({ message: 'API SGA - Dr. Eletron rodando!' }));

// Exemplo de Rota Protegida (Para testar o Middleware)
const authMiddleware = require('./middlewares/authMiddleware');
app.get('/perfil', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso autorizado!', usuarioId: req.usuarioId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));