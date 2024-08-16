import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useAuth } from "../provider/AuthContext";
import { addSellerToBlacklist, addToFavorites, api, deleteProduct } from "../utils/ApiFunctions";
import ConfirmationDialog from '../components/ConfirmationDialog';

function ProductCard({ product, fetchProducts }) {
    const { userId, roles } = useAuth();
    const isAdmin = roles.includes('ROLE_ADMIN')
    const [showDialog, setShowDialog] = useState(false);
    const [selectedSellerName, setSelectedSellerName] = useState(null);

    const handleSellerClick = (sellerId) => {
        setSelectedSellerName(sellerId);
        setShowDialog(true);
    };

    const handleConfirm = async () => {
        setShowDialog(false);
        try {
            await addSellerToBlacklist(userId, selectedSellerName)
            alert('Seller has been blacklisted');
            fetchProducts()
        } catch (error) {
            console.error('Error blacklisting seller:', error);
        }
    };

    const handleCancel = () => {
        setShowDialog(false);
    };

    const handleFavoriteClick = async (userId, productId) => {
        try {
            const result = await addToFavorites(userId, productId);
            console.log(`Added to favorites: `, result);
            if (result.data.code === 100003) { alert("Product was already added to favorites!") }
            else { alert('Added to favorites!') }
        } catch (error) {
            console.error('Failed to add to favorites', error);
        }
    };

    const handleDeleteClick = async (productId) => {
        try {
            await deleteProduct(productId);
            onDeleteAction();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="product-card">
            {/* <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div> */}
            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="price">Price: ${product.price}</p>
                <p>Category: {product.categoryName}</p>
                <p>
                    Seller: <a href="#" onClick={() => handleSellerClick(product.sellerName)}>{product.sellerName}</a>
                </p>
            </div>
            <div className="product-actions">
                <Link to={`/products/${product.id}`} className="view-details">Details</Link>
                <Button onClick={() => handleFavoriteClick(userId, product.id)}><FaStar /></Button>
                {isAdmin && <Button onClick={() => handleDeleteClick(product.id)}><FaTrashAlt /></Button>}
            </div>
            <ConfirmationDialog
                isOpen={showDialog}
                message="Do you want to add the seller to blacklist?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default ProductCard;
