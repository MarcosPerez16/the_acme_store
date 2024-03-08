//Express application and setup functions/RESTful Routes

const { client, createTables, createProduct } = require("./db");
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

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();
