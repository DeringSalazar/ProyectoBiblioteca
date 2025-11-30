import e from "express";
import categoriesModels from "../Models/categoriesModels.js";

class CategoriesServices {

    async getAllCategories() {
        try {
            return await categoriesModels.getAllCategory();
        } catch (error) {
            console.error('Error in categoriesServices.getAllCategories:', error);
            throw error;
        }
    }

    async getCategories(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        const result = await categoriesModels.getCategoryById(id);
        return result;
    }

    async getCategoriesByCode(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        const result = await categoriesModels.getCategoryByCode(id);
        return result;
    }

    async createCategories(categories) {
        const { nombre, descripcion, estado } = categories;
        if (!nombre || !descripcion || !estado) {
            throw new Error("Data is missing: nombre, descripcion, estado");
        }
        const validStates = ['activo', 'inactivo'];
        if (!validStates.includes(estado)) {
            throw new Error("Invalid value for estado. Must be 'activo' or 'inactivo'");
        }
        const result = await categoriesModels.createCategory(categories);
        return result;
    }

    async updateCategories(categories) {
        const { id, nombre, descripcion, estado } = categories;
        if (!id || !nombre || !descripcion || !estado) {
            throw new Error("Data is missing: id, nombre, descripcion, estado");
        }
        const validStates = ['activo', 'inactivo'];
        if (!validStates.includes(estado)) {
            throw new Error("Invalid value for estado. Must be 'activo' or 'inactivo'");
        }
        const result = await categoriesModels.updateCategory(categories);
        return result;
    }

    async deleteCategories(id) {
        if (!id) {
            throw new Error("Data is missing: id");
        }
        const result = await categoriesModels.deleteCategory(id);
        return result;
    }
}

export default new CategoriesServices();