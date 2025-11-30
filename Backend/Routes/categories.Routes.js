import {Router} from 'express';
import categoriesController from '../Controllers/categoriesControllers.js';
const router = Router();

router.get('/', categoriesController.getAllCategories);
router.get('/:id', categoriesController.getCategories);
router.get('/code/:id', categoriesController.getCategoriesByCode);
router.post('/', categoriesController.createCategories);
router.put('/', categoriesController.updateCategories);
router.delete('/:id', categoriesController.deleteCategories);

export default router;