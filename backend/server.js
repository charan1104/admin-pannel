const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// // Static folders
// app.use("/categories", express.static(path.join(__dirname, "../uploads/categories")));
// app.use("/products", express.static(path.join(__dirname, "../uploads/products")));
// app.use("/props", express.static(path.join(__dirname, "../uploads/props")));
// app.use("/banners", express.static(path.join(__dirname, "../uploads/banners")));
// app.use("/resumes", express.static(path.join(__dirname, "../uploads/resumes")));

// Admin Routes
app.use("/api", require("./src/routes/admin/auth"));
// app.use("/api", require("./src/routes/admin/admin"));


// Front Routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});