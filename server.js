import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import path from "path";
import config from "config";
import mongoose from "mongoose";
import { default as connectMongoDBSession } from "connect-mongodb-session";
import methodOverride from "method-override";

import homeRouter from "./routes/home.router.js";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import officeRouter from "./routes/office.router.js";
import authRouter from "./routes/auth.router.js";
import categoryRouter from "./routes/category.router.js";
import orderRouter from "./routes/order.router.js";

import { errorFind } from "./middleware/errorFind.js";

const __dirname = path.resolve();
const PORT = config.get("PORT");
const uri = config.get("uri");

const app = express();

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({ uri, collection: "sessions" });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

async function start() {
  await mongoose.connect(uri);
  console.log("Mongo is working");
  try {
    app.listen(PORT, () => {
      console.log("http://localhost:3000");
    });
  } catch (e) {
    console.log(e);
  }
}

start();

app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/office", officeRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use(authRouter);

app.use(errorFind);
