import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/products", newProduct)
      .then(() => {
        setProducts((prev) => [...prev, newProduct]);
        setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Produtos</h1>

      {/* Formulário para adicionar produtos */}
      <form
        className="bg-white p-4 rounded-lg shadow-md mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-2">Adicionar Produto</h2>
        <input
          type="text"
          placeholder="Nome do Produto"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrição"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        ></textarea>
        <input
          type="number"
          placeholder="Preço"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
          required
        />
        <input
          type="text"
          placeholder="URL da Imagem"
          className="w-full p-2 border rounded mb-2"
          value={newProduct.imageUrl}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Adicionar Produto
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-40 w-full object-cover rounded-t-md"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-green-500 font-bold mt-2">R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;