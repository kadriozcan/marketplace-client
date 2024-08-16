import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { addNewProduct, getAllSellers } from '../utils/ApiFunctions';

const NewProductForm = ({ isOpen, onRequestClose, onAddProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categoryName, setCategoryName] = useState('')
    const [sellerName, setSellerName] = useState('')

    const [sellers, setSellers] = useState([])

    const fetchSellers = async () => {
        const response = await getAllSellers()
        console.log(response.payload)
        setSellers(response.payload)
    }

    useEffect(() => {
        fetchSellers()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            price,
            categoryName,
            sellerName
        }

        await onAddProduct(newProduct)

        console.log('New product:', name);
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="custom-modal" overlayClassName="custom-modal-overlay">
            <h2>New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <label>
                    Category Name:
                    <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                        <option value=''>Select Category</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Sports'>Sports</option>
                        <option value='Clothing'>Clothing</option>
                        <option value='Furniture'>Furniture</option>

                    </select>
                </label>
                <label>
                    Seller:
                    <select value={sellerName} onChange={(e) => setSellerName(e.target.value)}>
                        <option value=''>Select Seller</option>
                        {sellers.map((seller) => (
                            <option value={seller.name}>{seller.name}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Product</button>
            </form>
        </Modal>
    );
};

export default NewProductForm;