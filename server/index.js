//Express application and setup functions/RESTful Routes

const {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
  fetchFavorites,
  createFavorite,
  destroyFavorite,
} = require("./db");
const express = require("express");
const app = express();
app.use(express.json());

//RESTful Routes

//GET USERS
app.get("/api/users", async (req, res) => {
  const users = await fetchUsers();
  res.json(users);
});

//GET PRODUCTS
app.get("/api/products", async (req, res) => {
  const products = await fetchProducts();
  res.json(products);
});

//GET FAVORITES
app.get("/api/users/:id/favorites", async (req, res) => {
  const userId = req.params.id;
  const favorites = await fetchFavorites(userId);
  if (favorites !== undefined) {
    res.json(favorites);
  } else {
    res.status(404).json({ error: `No favorites found for user ${userId}` });
  }
});

//POST FAVORITES
app.post("/api/users/:id/favorites", async (req, res) => {
  const userId = req.params.id;
  const productId = req.body.product_id;
  const newFavorite = await createFavorite(userId, productId);
  res.status(201).json(newFavorite);
});

//DELETE FAVORITE
app.delete("/api/users/:userId/favorites/:id", async (req, res) => {
  const userId = req.params.userId;
  const favoriteId = req.params.id;
  const deletedFavorite = await destroyFavorite(userId, favoriteId);
  if (deletedFavorite) {
    res.json(deletedFavorite);
  } else {
    res
      .status(404)
      .json({
        error: `No favorite found for user ${userId} with id ${favoriteId}`,
      });
  }
});

const init = async () => {
  try {
    console.log("Connecting to the database");
    await client.connect();
    console.log("Connected to database");

    //call your createTables method or other setup functions here
    await createTables();
    //...

    //Test createProduct method
    // const newProduct = await createProduct({ name: "Sample Product" });
    // console.log("New product created:", newProduct);

    //Test createUser method
    // const newUser = await createUser({
    //   username: "MarcosPerez16",
    //   password: "test_password",
    // });
    // console.log("New user created:", newUser);

    //Test fetchUsers method
    // const users = await fetchUsers();
    // console.log("Fetched users:", users);

    //Test fetchProducts method
    // const products = await fetchProducts();
    // console.log("Fetched products:", products);

    //Test fetchFavorites method
    // const userId = "23fd3544-47a7-47cd-85fd-f6cd9165e10c";
    // const favorites = await fetchFavorites(userId);
    //this if statement helps us distingush between the case where favorites are fetched successfully or there are no favorites found
    // if (favorites !== undefined) {
    //   console.log(`Fetched favorites for user ${userId}:`, favorites);
    // } else {
    //   console.log(`No favorites found for user ${userId}`);
    // }

    //Test createFavorite method
    // const userId = "23fd3544-47a7-47cd-85fd-f6cd9165e10c";
    // const productId = "8b8ddb1a-6661-4c68-b11a-a1c72d2663a5";
    // const newFavorite = await createFavorite(userId, productId);
    // console.log("New favorite created:", newFavorite);

    //Test destroyFavorite method
    // const userId = "23fd3544-47a7-47cd-85fd-f6cd9165e10c";
    // const favoriteId = "650d4384-d2a3-4cfa-a675-c458ff29a3f5";
    // const deletedFavorite = await destroyFavorite(userId, favoriteId);
    // if (deletedFavorite) {
    //   console.log("Favorite deleted:", deletedFavorite);
    // } else {
    //   console.log(`No favorite found for user ${userId} with id ${favoriteId}`);
    // }

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();
