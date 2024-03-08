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
  //implement here
};

const fetchProducts = async () => {
  //implement here
};

const fetchFavorites = async (userId) => {
  //implement here
};

const createFavorite = async (favoriteData) => {
  //implement here
};

const destroyFavorite = async (userId, favoriteId) => {
  //implement here
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
