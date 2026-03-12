import { useState, useEffect } from 'react';

function Shop() {
    function capitalizeFirstLetter(string){
        return string[0].toUpperCase() + string.slice(1)
    }

    const [products, setProducts] = useState([])
    
    useEffect(()=>{
        console.log("Uniquement au premier render")

        fetch("https://fakestoreapi.com/products/", {headers: {"Method":"GET","Accept":"application/json"}})
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        console.log(products)
    },[products])


    
    return (
        <>
            {products.map((product) => (
                <div key={product.id} style={{backgroundColor: "grey", borderRadius: "32px", display: "flex", justifyContent: "flex-start", padding: "32px", gap: "16px", margin: "64px 0px"}}>
                    <img style={{width: "128px", height: "128px", objectFit: "contain"}}src={product.image} alt="Product Image"/>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "baseline", gap: "16px"}}>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "baseline", gap: "16px"}}>
                            <h3 style={{margin: "0", textAlign:"left"}}>{product.title}</h3>
                            <h4 style={{margin: "0", color: "#D0D0D0"}}>{capitalizeFirstLetter(product.category)}</h4>
                            <button style={{margin: "0 auto"}}>Ajouter au Panier</button>
                        </div> 
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "baseline", gap: "16px"}}>
                            <h4 style={{margin: "0", textAlign:"left"}}>{product.description}</h4>
                            <h4 style={{margin: "0", textAlign:"left"}}>{product.price} €</h4>
                        </div>       
                    </div>
                </div>
            ))}
        </>
    );
}

export default Shop;