const usersRouter = require("./users");
const siteRouter = require("./site");

function route(app) {
  app.use("/api", usersRouter);

  app.use("/", siteRouter);
}

module.exports = route;
