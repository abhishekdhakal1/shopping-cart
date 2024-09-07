import { useState, useEffect } from "react";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .then((error) => console.error("Error fetching products", error));

    fetch("http://localhost:5000/api/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  function addToCart(id) {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error adding to cart:", error));
  }

  function removeFromCart(id) {
    fetch(`http://localhost:5000/api/cart/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCart(data))
      .catch((error) => console.error("Error removing from cart:", error));
  }

  return (
    <div className="h-screen mx-auto p-4 bg-indigo-200">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-200 rounded-lg mb-2 flex justify-between items-center"
            >
              <span>
                {product.name} - Rs.{product.price}
              </span>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart <FaShoppingCart className="inline ml-2" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg mb-2 flex justify-between items-center"
              >
                <span>
                  {item.name} - Rs.{item.price}
                </span>
                <button
                  className="bg-red-500 text-white p-2 rounded"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove <FaTrashAlt className="inline ml-2" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
