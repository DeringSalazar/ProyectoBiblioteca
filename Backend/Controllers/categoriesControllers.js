import categoriesServices from "../Services/categoriesServices.js";

class CategoriesController {

    async getAllCategories(req = Request, res = Response) {
        try {
            const categories = await categoriesServices.getAllCategories();
            res.status(200).json({
                success: true,
                message: 'List of categories obtained correctly',
                categories: categories[0],
            });
        } catch (error) {
            console.error('Error in gatAllCategories:', error);
            res.status(500).json({
                success: false,
                message: 'Error obtaining categories',
                error: error.message,
            });
        }
    }

    async getCategories(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const categories = await categoriesServices.getCategories(id);
            res.status(200).json({
                success: true,
                message: 'Category obtained correctly',
                categories: categories[0][0],
            });
        } catch (error) {
            console.error('Error in getCategories:', error);
            res.status(500).json({
                success: false,
                message: 'Error obtaining category',
                error: error.message,
            });
        }
    }

    async getCategoriesByCode(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const categories = await categoriesServices.getCategoriesByCode(id);
            res.status(200).json({
                success: true,
                message: 'Category obtained correctly',
                categories: categories[0][0],
            });
        } catch (error) {
            console.error('Error in getCategoriesByCode:', error);
            res.status(500).json({
                success: false,
                message: 'Error obtaining category',
                error: error.message,
            });
        }
    }

    async createCategories(req = Request, res = Response) {
        const { nombre, descripcion, estado } = req.body;
        try {
            const categories = await categoriesServices.createCategories({ nombre, descripcion, estado });
            res.status(201).json({
                success: true,
                message: 'Category created correctly',
            });
        } catch (error) {
            console.error('Error in createCategories:', error);
            if (error.code === 'MISSING_DATA') {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: nombre, descripcion, estado'
                });
            }
            if (error.code === 'DUPLICATE') {
                return res.status(409).json({
                    success: false,
                    message: 'The category already exists. Duplicates are not allowed.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error creating category',
                error: error.message,
            });
        }
    }

    async updateCategories(req = Request, res = Response) {
        const { id, nombre, descripcion, estado } = req.body;
        try {
            const categories = await categoriesServices.updateCategories({ id, nombre, descripcion, estado });
            res.status(200).json({
                success: true,
                message: 'Category updated correctly',
            });
        } catch (error) {
            console.error('Error in updateCategories:', error);
            if (error.code === 'DUPLICATE') {
                return res.status(409).json({
                    success: false,
                    message: 'The category already exists. Duplicates are not allowed.',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Error updating category',
                error: error.message,
            });
        }
    }

    async deleteCategories(req = Request, res = Response) {
        const { id } = req.params;
        try {
            const categories = await categoriesServices.deleteCategories(id);
            res.status(200).json({
                success: true,
                message: 'Category deleted correctly',
            });
        } catch (error) {
            console.error('Error in deleteCategories:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting category',
                error: error.message,
            });
        }
    }
}

export default new CategoriesController();