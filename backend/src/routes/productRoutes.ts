import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateProduct } from '../validators/productValidator';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../config/multer';

const router = Router();
const productController = new ProductController();

router.get('/', (req, res) => productController.getAll(req, res));
router.get('/:id', (req, res) => productController.getById(req, res));
router.post('/', authMiddleware, upload.single('image'), validateProduct, (req, res) => productController.create(req, res));
router.put('/:id', authMiddleware, upload.single('image'), validateProduct, (req, res) => productController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => productController.delete(req, res));

export default router;