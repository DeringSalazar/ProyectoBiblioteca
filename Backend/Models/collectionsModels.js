import pool from '../Database/db.js';

class CollectionsModel {

  async getCollectionsByUserId(userId) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, usuario_id, nombre, descripcion, visibilidad 
         FROM colecciones 
         WHERE usuario_id = ? 
         ORDER BY id DESC`,
        [userId]
      );
      return rows;
    } catch (error) {
      console.error('Error finding collections by user ID:', error);
      throw error;
    }
  }

  async getCollectionById(id) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, usuario_id, nombre, descripcion, visibilidad 
         FROM colecciones 
         WHERE id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('Error finding collection by ID:', error);
      throw error;
    }
  }

  async createCollection(collection) {
    if (!collection) {
      throw new Error("Collection data is undefined");
    }
    const { usuario_id, nombre, descripcion, visibilidad } = collection;
    try {
      const [result] = await pool.execute(
        `INSERT INTO colecciones (usuario_id, nombre, descripcion, visibilidad) 
         VALUES (?, ?, ?, ?)`,
        [usuario_id, nombre, descripcion || null, visibilidad || 'privada']
      );
      return this.getCollectionById(result.insertId);
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  }

  async updateCollection(collection) {
    if (!collection) {
      throw new Error("Collection data is undefined");
    }
    const { id, nombre, descripcion, visibilidad } = collection;
    try {
      const [result] = await pool.execute(
        `UPDATE colecciones 
         SET nombre = ?, descripcion = ?, visibilidad = ? 
         WHERE id = ?`,
        [nombre, descripcion, visibilidad, id]
      );
      
      if (result.affectedRows === 0) {
        return null;
      }
      
      return this.getCollectionById(id);
    } catch (error) {
      console.error('Error updating collection:', error);
      throw error;
    }
  }

  async deleteCollection(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM colecciones WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error;
    }
  }

  async addSnippetToCollection(collectionId, snippetId) {
    try {
      const [result] = await pool.execute(
        `INSERT INTO coleccion_codigo (coleccion_id, codigo_id) 
         VALUES (?, ?)`,
        [collectionId, snippetId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error adding snippet to collection:', error);
      throw error;
    }
  }

  async removeSnippetFromCollection(collectionId, snippetId) {
    try {
      const [result] = await pool.execute(
        `DELETE FROM coleccion_codigo 
         WHERE coleccion_id = ? AND codigo_id = ?`,
        [collectionId, snippetId]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error removing snippet from collection:', error);
      throw error;
    }
  }

  async getSnippetsByCollectionId(collectionId) {
    try {
      const [rows] = await pool.execute(
        `SELECT c.*, cc.fecha_agregado 
         FROM codigo c
         INNER JOIN coleccion_codigo cc ON c.id = cc.codigo_id
         WHERE cc.coleccion_id = ?
         ORDER BY cc.fecha_agregado DESC`,
        [collectionId]
      );
      return rows;
    } catch (error) {
      console.error('Error getting snippets from collection:', error);
      throw error;
    }
  }

  async snippetExistsInCollection(collectionId, snippetId) {
    try {
      const [rows] = await pool.execute(
        `SELECT 1 FROM coleccion_codigo 
         WHERE coleccion_id = ? AND codigo_id = ?`,
        [collectionId, snippetId]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error checking snippet in collection:', error);
      throw error;
    }
  }
}

export default new CollectionsModel();