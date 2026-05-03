import { useEffect, useState } from 'react';

function App3() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts");
        const data = await response.json();
        
        if (response.ok && data.data && data.data.data) {
          setProducts(data.data.data);
          setStatus(""); 
        } else {
          setStatus("Failed to load products.");
        }
      } catch (error) {
        setStatus("Error fetching products.");
      }
    }
    
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <p style={{ color: "blue" }}>{status}</p>
      
      {products.map((product) => (
        <div key={product.id} style={{ borderBottom: "1px solid gray", padding: "10px 0" }}>
          <img src={product.thumbnail} alt={product.title} width="150" />
          <h3>{product.title} - ${product.price}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App3;
