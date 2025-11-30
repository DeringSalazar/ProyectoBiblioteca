import pool from '../Database/db.js';

class CategoriesModel {

    async getAllCategory() {
        try {
            const result = await pool.execute('CALL sp_categorias_getall()');
            return result[0];
        } catch (error) {
            console.error('Error finding categories:', error);
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            return await pool.execute('CALL sp_categorias_getid(?)', [id]);
        } catch (error) {
            console.error('Error finding category by ID:', error);
            throw error;
        }
    }

    async getCategoryByCode(id) {
        try {
            return await pool.execute('CALL sp_categorias_get_codigos(?)', [id]);
        } catch (error) {
            console.error('Error finding category by code:', error);
            throw error;
        }
    }

    async createCategory( categories ) {
        if (!categories) {
            throw new Error("Categories data is undefined");
        }
        const {nombre, descripcion, estado} = categories;
        try {
            const result = await pool.execute('CALL sp_categorias_create(?, ?, ?)',
                [nombre, descripcion, estado]);
            return result;
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    }

    async updateCategory( categories ) {
        if (!categories) {
            throw new Error("Categories data is undefined");
        }
        const {id, nombre, descripcion, estado} = categories;
        try {
            const result = await pool.execute('CALL sp_categorias_update(?, ?, ?, ?)',
                [id, nombre, descripcion, estado]);
            return result;
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            return await pool.execute('CALL sp_categorias_delete(?)', [id]);
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
}

export default new CategoriesModel();