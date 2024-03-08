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
