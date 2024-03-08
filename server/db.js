const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/acme_store_db"
);
//... other imports

const createTables = async () => {
  //implementation goes here
};

module.exports = {
  client,
  createTables,
  // other methods
};
