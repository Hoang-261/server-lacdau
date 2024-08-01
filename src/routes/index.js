const usersRouter = require("./users");

function route(app) {
  app.use("/api", usersRouter);
}

module.exports = route;
