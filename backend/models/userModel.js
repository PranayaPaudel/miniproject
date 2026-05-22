import pool from '../db/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async (name, email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
    [name, normalizedEmail, hashedPassword, 'viewer']
  );
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await pool.query('SELECT * FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
  return result.rows[0];
};

export const getUserById = async (id) => {
  const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, name, email, role FROM users ORDER BY id DESC');
  return result.rows;
};

export const updateUserRole = async (userId, role) => {
  const result = await pool.query(
    'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, name, email, role',
    [role, userId]
  );
  return result.rows[0];
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
