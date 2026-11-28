const express = require('express');
const router = express.Router();
const ordemServicoController = require('../controllers/ordemServicoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Aplica o middleware em todas as rotas deste arquivo
router.use(authMiddleware);

router.post('/', ordemServicoController.criar);
router.get('/', ordemServicoController.listar);
router.get('/:id', ordemServicoController.buscarPorId);
router.put('/:id', ordemServicoController.atualizar);
router.delete('/:id', ordemServicoController.excluir);

module.exports = router;