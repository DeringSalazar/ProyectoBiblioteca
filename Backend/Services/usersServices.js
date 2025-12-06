import UsersModel from '../Models/usersModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SALT_ROUNDS = 10;

const UsersService = {
  async createUser(payload) {
    const { nombre_completo, email, contrasena, rol } = payload;

    if (!nombre_completo || !email || !contrasena) {
      throw new Error('Faltan datos obligatorios (nombre_completo, email, contrasena)');
    }

    const existing = await UsersModel.findByEmail(email);
    if (existing) {
      const err = new Error('El email ya existe');
      err.code = 'DUPLICATE';
      throw err;
    }

    const hash = await bcrypt.hash(contrasena, SALT_ROUNDS);
    const user = await UsersModel.create({
      nombre_completo,
      email,
      contrasena: hash,
      rol: rol || 'usuario'
    });

    return user;
  },

  async login({ email, contrasena }) {
    if (!email || !contrasena) return null;
    const user = await UsersModel.login(email);
    if (!user) return null;

    const valid = await bcrypt.compare(contrasena, user.contrasena);
    if (!valid) return null;

    const payload = {
      id_usuario: user.id_usuario,
      email: user.email,
      rol: user.rol
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });

    const safeUser = {
      id_usuario: user.id_usuario,
      nombre_completo: user.nombre_completo,
      email: user.email,
      fecha_creacion: user.fecha_creacion,
      rol: user.rol
    };

    return { user: safeUser, token };
  },

  async getProfile(id) {
    return await UsersModel.findById(id);
  },

  async updateProfile(requester, idToUpdate, data) {

    if (requester.id_usuario !== Number(idToUpdate) && requester.rol !== 'admin') {
      const err = new Error('No autorizado');
      err.code = 'FORBIDDEN';
      throw err;
    }

    const fields = {};
    if (data.nombre_completo !== undefined) fields.nombre_completo = data.nombre_completo;
    if (data.email !== undefined) fields.email = data.email;
    if (data.rol !== undefined) {
      if (requester.rol !== 'admin') {
        const err = new Error('Solo administradores pueden cambiar roles');
        err.code = 'FORBIDDEN';
        throw err;
      }
      fields.rol = data.rol;
    }
    if (data.contrasena !== undefined && data.contrasena.trim() !== '') {
      fields.contrasena = await bcrypt.hash(data.contrasena, SALT_ROUNDS);
    }


    if (fields.email) {
      const existing = await UsersModel.findByEmail(fields.email);
      if (existing && existing.id_usuario !== Number(idToUpdate)) {
        const err = new Error('El email ya existe');
        err.code = 'DUPLICATE';
        throw err;
      }
    }

    const updated = await UsersModel.update(idToUpdate, fields);
    if (!updated) {
      const err = new Error('Usuario no encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }
    return updated;
  },

  async deleteUser(requester, idToDelete) {
    if (requester.rol !== 'admin') {
      const err = new Error('No autorizado');
      err.code = 'FORBIDDEN';
      throw err;
    }
    const ok = await UsersModel.delete(idToDelete);
    if (!ok) {
      const err = new Error('Usuario no encontrado');
      err.code = 'NOT_FOUND';
      throw err;
    }
    return { message: 'Usuario eliminado correctamente' };
  },

  async search(q) {
    return await UsersModel.searchByNameOrEmail(q);
  },

  async listAll(requester) {
    if (requester.rol !== 'admin') {
      const err = new Error('No autorizado');
      err.code = 'FORBIDDEN';
      throw err;
    }
    return await UsersModel.listAll();
  }
};

export default UsersService;
