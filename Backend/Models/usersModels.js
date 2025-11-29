import pool from '../Database/db.js';

const UsersModel = {
  async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre_completo, email, contrasena, fecha_creacion, rol FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre_completo, email, fecha_creacion, rol FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return rows[0];
  },

  async create({ nombre_completo, email, contrasena, rol }) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nombre_completo, email, contrasena, rol) VALUES (?, ?, ?, ?)',
      [nombre_completo, email, contrasena, rol || 'usuario']
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const updates = [];
    const values = [];
    for (const [k, v] of Object.entries(fields)) {
      updates.push(`${k} = ?`);
      values.push(v);
    }
    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const sql = `UPDATE usuarios SET ${updates.join(', ')} WHERE id_usuario = ?`;
    const [result] = await pool.execute(sql, values);
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM usuarios WHERE id_usuario = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  async searchByNameOrEmail(q) {
    const like = `%${q}%`;
    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre_completo, email, fecha_creacion, rol FROM usuarios WHERE nombre_completo LIKE ? OR email LIKE ? ORDER BY fecha_creacion DESC',
      [like, like]
    );
    return rows;
  },

  async listAll() {
    const [rows] = await pool.execute(
      'SELECT id_usuario, nombre_completo, email, fecha_creacion, rol FROM usuarios ORDER BY id_usuario DESC'
    );
    return rows;
  }
};

export default UsersModel;
