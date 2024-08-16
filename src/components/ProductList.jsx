import React from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductList.css";

function ProductList({ products, fetchProducts }) {
    console.log(products);
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    product={product}
                    fetchProducts={fetchProducts}
                />
            ))}
        </div>
    );
}

export default ProductList;
