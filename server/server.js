const express = require("express");
const cors = require("cors");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.paths = {
      contact: "/api/contact",
    };

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: true }));// Enable CORS
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../dani-tax-project/build")));
  }

  // Bind controllers to routes
  routes() {
    this.app.use(this.paths.contact, require("./routes/contact"));

    // Catch all requests that don't match any route
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../dani-tax-project/build/index.html"));
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port:", this.port);
    });
  }
}

module.exports = Server;
