//Express application and setup functions/RESTful Routes

const {
  client,
  createTables,
  createProduct,
  createUser,
  fetchUsers,
  fetchProducts,
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

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();
