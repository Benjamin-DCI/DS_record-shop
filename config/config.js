const { env } = process;

const config = {
  env: env.NODE_ENV || "development"
};

const devConfig = {
  db: "mongodb://localhost:27017/record-shop",
  jwt_key: "iamaverysecretkey"
};

const prodConfig = {
  db:
    "mongodb+srv://<username>:<password>@record-shop-test-ejhsh.mongodb.net/test?retryWrites=true&w=majority",
  jwt_key: "iamaverysecretkey"
};

const currentConfig = config.env === "production" ? prodConfig : devConfig;

module.exports = Object.assign({}, config, currentConfig);
