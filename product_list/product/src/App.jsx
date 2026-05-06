import { useEffect, useState } from 'react';

function App3(){
     const [products, setProducts] = useState([])
     const [status, setStatus] = useState("Loading...")

     useEffect(()=>{
         async function fetchProducts() {
            const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts")
            const data = await response.json()
            if(response.ok && data.data && data.data.data){
                setProducts(data.data.data)
                setStatus("")
            }else{
                setStatus("Unable to load Products")
            }
         }
         fetchProducts()
     }, [])

    return(
        <div>
           <h1>Products Listing: </h1>
           <p>{status}</p>
           <div style={{ display:"grid", gap:"20px", gridTemplateColumns:"repeat(3, 1fr)"}}>
                  {products.map((product, index)=>(
                    <div key={index} style={{ border: "1px solid", borderRadius: "10px", padding: "15px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"}}>
                     <br></br>
                      <img src={product.thumbnail} alt={`Product Image`} style={{ width: "100%", height: "auto", objectFit: "cover"}}/>
                      <br></br>
                      <span>{product.id}: </span>
                      <span>{product.title}</span>
                      <p>Price: {product.price}</p>
                      <br></br>
                      <p style={{textAlign: "left"}}>Description: {product.description}</p>
                      <br></br>
                      <p style={{textAlign: "left"}}>rating: {product.rating}</p>
                    </div>

                  ))}
           </div>
        </div>
    )
}

export default App3;
