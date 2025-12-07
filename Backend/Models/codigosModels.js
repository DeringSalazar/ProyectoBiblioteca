import pool from '../Database/db.js';

class CodigosModel {

  async getCodigosByUserId(userId) {
    try {
      const [rows] = await pool.execute(
        `CALL sp_codigo_by_usuario(?)`,
        [userId]
      );
      // Los procedimientos almacenados retornan [resultSet, fields]
      return Array.isArray(rows) && rows.length > 0 ? rows : [];
    } catch (error) {
      console.error('Error finding codes by user ID:', error);
      throw error;
    }
  }

  async getCodigoById(id) {
    try {
      const [rows] = await pool.execute(
        `CALL sp_codigo_getid(?)`,
        [id]
      );
      return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error finding code by ID:', error);
      throw error;
    }
  }

  async createCodigo(codigoData) {
    if (!codigoData) {
      throw new Error("Code data is undefined");
    }
    const { usuario_id, titulo, descripcion, codigo, lenguaje, tags, tipo } = codigoData;
    try {
      await pool.execute(
        `CALL sp_codigo_create(?, ?, ?, ?, ?, ?, ?)`,
        [usuario_id, titulo, descripcion || null, codigo, lenguaje, tags || null, tipo || null]
      );
      // Obtener el código creado
      const [lastCode] = await pool.execute(
        `SELECT * FROM codigo WHERE usuario_id = ? ORDER BY id DESC LIMIT 1`,
        [usuario_id]
      );
      return lastCode[0];
    } catch (error) {
      console.error('Error creating code:', error);
      throw error;
    }
  }

  async updateCodigo(id, codigoData) {
    if (!codigoData) {
      throw new Error("Code data is undefined");
    }
    const { titulo, descripcion, codigo, lenguaje, tags, tipo } = codigoData;
    try {
      await pool.execute(
        `CALL sp_codigo_update(?, ?, ?, ?, ?, ?, ?)`,
        [id, titulo, descripcion || null, codigo, lenguaje, tags || null, tipo || null]
      );
      return this.getCodigoById(id);
    } catch (error) {
      console.error('Error updating code:', error);
      throw error;
    }
  }

  async deleteCodigo(id) {
    try {
      await pool.execute(
        `DELETE FROM coleccion_codigo WHERE codigo_id = ?`,
        [id]
      );
      
      await pool.execute(
        `CALL sp_codigo_delete(?)`,
        [id]
      );
      return true;
    } catch (error) {
      console.error('Error deleting code:', error);
      throw error;
    }
  }

  async getCodigosByTag(tag) {
    try {
      const [rows] = await pool.execute(
        `CALL sp_codigo_by_categoria(?)`,
        [tag]
      );
      return Array.isArray(rows) && rows.length > 0 ? rows : [];
    } catch (error) {
      console.error('Error finding codes by tag:', error);
      throw error;
    }
  }

  async addCodigoToColeccion(codigoId, coleccionId) {
    try {
      await pool.execute(
        `CALL sp_colecciones_add_snippet(?, ?)`,
        [coleccionId, codigoId]
      );
      return { success: true };
    } catch (error) {
      console.error('Error adding code to collection:', error);
      throw error;
    }
  }

  async getColeccionesByCodigoId(codigoId) {
    try {
      // Este método obtiene las CATEGORÍAS de un código
      const [rows] = await pool.execute(
        `CALL sp_categorias_get_codigos(?)`,
        [codigoId]
      );
      return Array.isArray(rows) && rows.length > 0 ? rows : [];
    } catch (error) {
      console.error('Error finding categories for code:', error);
      throw error;
    }
  }

  async removeCodigoFromColeccion(codigoId, coleccionId) {
    try {
      await pool.execute(
        `CALL sp_colecciones_remove_snippet(?, ?)`,
        [coleccionId, codigoId]
      );
      return { success: true };
    } catch (error) {
      console.error('Error removing code from collection:', error);
      throw error;
    }
  }
}

export default new CodigosModel();
