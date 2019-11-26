let faker = require("faker");
const mongoose = require("mongoose");
const Record = require("../models/Record");

(async () => {
  //Connect to DB
  mongoose.connect("mongodb://localhost:27017/record-shop", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("error", console.error);
  mongoose.connection.on("open", () => {
    console.log("Database connection established...");
  });

  console.log("This is the purge");

  try {
    await Record.deleteMany({});
    console.log("Records purged");
  } catch (err) {
    console.error(err);
  }

  const recordPromises = Array(5)
    .fill(null)
    .map(() => {
      const record = new Record({
        title: faker.name.title(),
        artist: faker.company.companyName(),
        year: faker.random.number({ min: 1960, max: 2019 }),
        img: faker.image.nightlife(),
        price: faker.commerce.price()
      });

      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log("The records are seeded");
  } catch (e) {
    console.error(e);
  }
  mongoose.connection.close();
})();
