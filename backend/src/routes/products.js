const express = require("express");
const router = express.Router();
const db = require("../database");

// Obter todos os produtos
router.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (error, rows) => {
    if (error) return res.status(500).send(error.message);
    res.json(rows);
  });
});

// Adicionar um produto
router.post("/products", (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const query = "INSERT INTO products (name, description, price, imageUrl) VALUES (?, ?, ?, ?)";
  db.run(query, [name, description, price, imageUrl], function (error) {
    if (error) return res.status(500).send(error.message);
    res.status(201).send({ id: this.lastID });
  });
});

// Atualizar um produto
router.put("/products/:id", (req, res) => {
  const { name, description, price, imageUrl } = req.body;
  const { id } = req.params;
  const query = "UPDATE products SET name = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?";
  db.run(query, [name, description, price, imageUrl, id], function (error) {
    if (error) return res.status(500).send(error.message);
    res.send({ message: "Produto atualizado com sucesso" });
  });
});

// Deletar um produto
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.run(query, id, function (error) {
    if (error) return res.status(500).send(error.message);
    res.send({ message: "Produto deletado com sucesso" });
  });
});

module.exports = router;