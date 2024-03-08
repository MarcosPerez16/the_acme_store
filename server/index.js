const { client, createTables } = require("./db");
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

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

init();
