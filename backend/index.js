import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Egg", price: 20 },
  { id: 2, name: "Chicken", price: 320 },
  { id: 3, name: "Nutella", price: 580 },
  { id: 4, name: "Peanut Butter", price: 310 },
];

let cart = [];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  const { id } = req.body;
  const product = products.find((prod) => prod.id === id);
  if (product) {
    cart.push(product);
    res.json(cart);
  } else {
    res.status(404).json({ msg: "product not found" });
  }
});

app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  const ID = parseInt(id);
  cart = cart.filter((item) => item.id !== ID);
  res.json(cart);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
