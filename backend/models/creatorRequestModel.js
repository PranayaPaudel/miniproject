import pool from '../db/db.js';

export const createCreatorRequest = async (user_id, sample_work_link, message) => {
  const result = await pool.query(
    'INSERT INTO creator_requests (user_id, sample_work_link, message, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [user_id, sample_work_link, message, 'pending']
  );
  return result.rows[0];
};

export const getPendingRequests = async () => {
  const result = await pool.query(
    'SELECT cr.*, u.name, u.email FROM creator_requests cr JOIN users u ON cr.user_id = u.id WHERE cr.status = $1 ORDER BY cr.id DESC',
    ['pending']
  );
  return result.rows;
};

export const getAllRequests = async () => {
  const result = await pool.query(
    'SELECT cr.*, u.name, u.email FROM creator_requests cr JOIN users u ON cr.user_id = u.id ORDER BY cr.id DESC'
  );
  return result.rows;
};

export const getRequestById = async (id) => {
  const result = await pool.query('SELECT * FROM creator_requests WHERE id = $1', [id]);
  return result.rows[0];
};

export const approveRequest = async (id) => {
  const request = await getRequestById(id);
  await pool.query('UPDATE creator_requests SET status = $1 WHERE id = $2', ['approved', id]);
  await pool.query('UPDATE users SET role = $1 WHERE id = $2', ['creator', request.user_id]);
};

export const rejectRequest = async (id) => {
  await pool.query('UPDATE creator_requests SET status = $1 WHERE id = $2', ['rejected', id]);
};

export const getRequestByUserId = async (user_id) => {
  const result = await pool.query('SELECT * FROM creator_requests WHERE user_id = $1 ORDER BY id DESC LIMIT 1', [user_id]);
  return result.rows[0];
};
