import CodigoCategoriaModel from '../Models/codigoCategoriaModels.js';
import CodigosModel from '../Models/codigosModels.js';
import CategoriesModel from '../Models/categoriesModels.js';
class CodigoCategoriaService {


 async verifyCatAndCodeExist(categoriaId, codigoId) {

      const [categoriesRows] = await CategoriesModel.getCategoryById(categoriaId);
      if (categoriesRows[0].length === 0) {
        throw new Error('La categoria no existe');
      }

      const existsCode = await CodigosModel.getCodigoById(codigoId);
      console.log('existsCode:', existsCode);
      if (existsCode.length === 0) {
        throw new Error('El codigo no existe');
      }
 }

  async addCodigoToCategoria(codigoId, categoriaId) {
    try {
      if (!codigoId || !categoriaId) {
        throw new Error('codigoId y categoriaId son requeridos');
      }
      
      await this.verifyCatAndCodeExist(categoriaId, codigoId);

      return await CodigoCategoriaModel.addCodigoToCategoria(codigoId, categoriaId);
    } catch (error) {
      console.error('Error en service addCodigoToCategoria:', error);
      throw error;
    }
  }

  async removeCodigoFromCategoria(codigoId, categoriaId) {
    try {
      if (!codigoId || !categoriaId) {
        throw new Error('codigoId y categoriaId son requeridos');
      }
      await this.verifyCatAndCodeExist(categoriaId, codigoId);
      return await CodigoCategoriaModel.removeCodigoFromCategoria(codigoId, categoriaId);
    } catch (error) {
      console.error('Error en service removeCodigoFromCategoria:', error);
      throw error;
    }
  }

  async getCategoriasFromCodigo(codigoId) {
    try {
      if (!codigoId) {
        throw new Error('codigoId es requerido');
      }
      const categorias = await CodigoCategoriaModel.getCategoriasFromCodigo(codigoId);
      return categorias;
    } catch (error) {
      console.error('Error en service getCategoriasFromCodigo:', error);
      throw error;
    }
  }

  async getCodigosFromCategoria(categoriaId) {
    try {
      if (!categoriaId) {
        throw new Error('categoriaId es requerido');
      }
      const codigos = await CodigoCategoriaModel.getCodigosFromCategoria(categoriaId);
      return codigos;
    } catch (error) {
      console.error('Error en service getCodigosFromCategoria:', error);
      throw error;
    }
  }

}

export default new CodigoCategoriaService();
