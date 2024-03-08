//Data layer

const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_store_db"
);
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
//... other imports

const createTables = async () => {
  try {
    const SQL = `
                CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY,
                    username VARCHAR(50) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                );

                CREATE TABLE IF NOT EXISTS products (
                    id UUID PRIMARY KEY,
                    name VARCHAR(100) NOT NULL
                );

                CREATE TABLE IF NOT EXISTS favorites (
                    id UUID PRIMARY KEY,
                    user_id UUID REFERENCES users(id) NOT NULL,
                    product_id UUID REFERENCES products(id) NOT NULL,
                    CONSTRAINT unique_user_id_product_id UNIQUE (user_id, product_id)
                );
            `;

    await client.query(SQL);
    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables:", error);
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const { name } = productData;

    const productId = uuidv4();
    const SQL = `
        INSERT INTO products (id, name)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const response = await client.query(SQL, [productId, name]);
    return response.rows[0];
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const createUser = async ({ username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `
        INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;

    const response = await client.query(SQL, [
      uuidv4(),
      username,
      hashedPassword,
    ]);
    return response.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

const fetchUsers = async () => {
  try {
    const SQL = `
        SELECT id, username, password
        FROM users
    `;
    const response = await client.query(SQL);
    return response.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const SQL = `
        SELECT * FROM products
    `;
    const response = await client.query(SQL);

    return response.rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const fetchFavorites = async (userId) => {
  try {
    const SQL = `
        SELECT * FROM favorites WHERE user_id = $1
    `;
    const response = await client.query(SQL, [userId]);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};

const createFavorite = async (user_id, product_id) => {
  try {
    const SQL = `
        INSERT INTO favorites (id, user_id, product_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const favoriteId = uuidv4();
    const response = await client.query(SQL, [favoriteId, user_id, product_id]);
    return response.rows[0];
  } catch (error) {
    console.error("Error creating favorite:", error);
    throw error;
  }
};

const destroyFavorite = async (userId, favoriteId) => {
  try {
    const result = await client.query(
      `
            DELETE FROM favorites
            WHERE user_id = $1 AND id = $2
            RETURNING *;
            `,
      [userId, favoriteId]
    );

    if (result.rows.length === 0) {
      console.log(`No favorite found for user ${userId} with id ${favoriteId}`);
      return null;
    }

    console.log(`Favorite deleted for user ${userId} with id ${favoriteId}`);
    return result.rows[0];
  } catch (error) {
    console.error(`Error deleting favorite: ${error}`);
    throw error;
  }
};

module.exports = {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  createFavorite,
  destroyFavorite,
  // other methods
};
