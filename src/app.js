// Módulos de Node.js
const process = require("process");
// Módulos de terceros
const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
// Rutas
const {
  enterpriseRouter,
  usersRouter,
  categoryRouter,
  productRouter,
  orderRouter,
  notificationRouter,
  paymentRouter,
  pointRouter,
} = require("./routes");

const app = express();

// Configuración
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Rutas
app.use("/api/enterprises", enterpriseRouter);
app.use("/api/users", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/point", pointRouter);

// Manejo de errores
app.use((err, req, res, next) => {
  if (err.status === 422) {
    // error validacion
    const errorMessages = err.array().map((error) => error.msg);
    return res.status(422).json({ errors: errorMessages });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Iniciar servidor
app.listen(PORT, () =>
  console.log(`Server listen in port: ${PORT}\n http://localhost:${PORT}`)
);
