const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplica o middleware em todas as rotas deste arquivo
router.use(authMiddleware);

router.post('/', categoriaController.criar);
router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.buscarPorId);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.excluir);

module.exports = router;