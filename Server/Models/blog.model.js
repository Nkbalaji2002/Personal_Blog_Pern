const pool = require("../DBConfig");

// GET method
const getPosts = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM posts ORDER BY created_at DESC`
    );
    const posts = result.rows;
    client.release();
    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST method
const addPosts = async (title, content) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *`,
      [title, content]
    );
    client.release();
    return result.rows[0]; // Return the Added Post
  } catch (error) {
    console.error("Error Getting Blogs", error);
    throw error;
  }
};

// Update method
const updatePosts = async (id, title, content) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE posts SET title = $1, content = $2, edited = $3 WHERE id = $4 RETURNING *`,
      [title, content, true, id]
    );
    client.release();
    return result.rows[0]; // Return the updated post
  } catch (error) {
    console.error("Error updating Blog:", error);
    throw error;
  }
};

// Delete method
const deletePosts = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM posts WHERE id = $1 RETURNING *`,
      [id]
    );
    client.release();
    return result.rows[0]; // Return the deleted post
  } catch (error) {
    console.error("Error deleting Blog:", error);
    throw error;
  }
};

module.exports = {
  getPosts,
  addPosts,
  updatePosts,
  deletePosts,
};
