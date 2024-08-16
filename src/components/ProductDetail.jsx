import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetailById } from '../utils/ApiFunctions';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct(productId);
    }, [productId]);

    const fetchProduct = async (productId) => {
        try {
            const data = await getProductDetailById(productId);
            setProduct(data.payload);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    return (
        <div className="single-product-page">
            <div className="product-image">
                <img src={product?.imageUrl} alt={product?.name} />
            </div>
            <div className="product-details">
                <h2>{product?.name}</h2>
                <p>{product?.description}</p>
                <p className="price">Price: ${product?.price}</p>
                <p className="category">Category: {product?.categoryName}</p>
                <div className="product-buttons">
                    <button className="buy-now">Buy Now</button>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
