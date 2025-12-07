import pool from '../Database/db.js';

class CollectionsModel {

  async getCollectionsByUserId(userId) {
    try {
      const [rows] = await pool.execute(
        'CALL sp_colecciones_by_usuario(?)',
        [userId]
      );

      return rows[0]; 
    } catch (error) {
      console.error('Error finding collections by user ID:', error);
      throw error;
    }
  }

  
  async getCollectionById(id) {
    try {
      const [rows] = await pool.execute(
        'CALL sp_colecciones_get_by_id(?)',
        [id]
      );

      return rows[0][0] || null;
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
      await pool.execute(
        'CALL sp_colecciones_create(?, ?, ?, ?)',
        [usuario_id, nombre, descripcion, visibilidad]
      );

      return { success: true };
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
      await pool.execute(
        'CALL sp_colecciones_update(?, ?, ?, ?)',
        [id, nombre, descripcion, visibilidad]
      );

      return { success: true };
    } catch (error) {
      console.error('Error updating collection:', error);
      throw error;
    }
  }
n

  async deleteCollection(id) {
    try {
      await pool.execute(
        'CALL sp_colecciones_delete(?)',
        [id]
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error;
    }
  }

    async addSnippetToCollection(collectionId, snippetId) {
    try {
      await pool.execute(
        'CALL sp_colecciones_add_snippet(?, ?)',
        [collectionId, snippetId]
      );
      return { success: true };
    } catch (error) {
      console.error('Error adding snippet to collection:', error);
      throw error;
    }
  }


  async removeSnippetFromCollection(collectionId, snippetId) {
    try {
      await pool.execute(
        'CALL sp_colecciones_remove_snippet(?, ?)',
        [collectionId, snippetId]
      );
      return { success: true };
    } catch (error) {
      console.error('Error removing snippet from collection:', error);
      throw error;
    }
  }


  async getSnippetsByCollectionId(collectionId) {
    try {
      const [rows] = await pool.execute(
        'CALL sp_colecciones_get_snippets(?)',
        [collectionId]
      );
      return rows[0];
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
