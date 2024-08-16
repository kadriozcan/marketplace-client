import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { addNewProduct, getAllProducts } from "../utils/ApiFunctions";
import ProductList from "./ProductList";
import ProductFilter from "./ProductFilter";
import { useAuth } from "../provider/AuthContext";
import NewProductForm from "./NewProductForm";
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Home = () => {
    const { roles } = useAuth()
    console.log('Roles: ', roles)

    const isAdmin = roles.includes('ROLE_ADMIN')

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ categories: [] });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        try {
            const response = await getAllProducts(filters);
            if (Array.isArray(response.payload)) {
                setProducts(response.payload);
            } else {
                console.error("getAllProducts did not return an array");
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            await addNewProduct(newProduct)
            fetchProducts()
        } catch (e) {
            console.error('Error adding product: ', e)
        }
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        console.log("categories: ", newFilters);
    };

    return (
        <div className="home-page">
            <div className="sidebar">
                <ProductFilter onFilterChange={handleFilterChange} />
            </div>
            <div className="main-content">
                {isAdmin && (
                    <button className="add-product-button" onClick={openModal}>New Product</button>
                )}
                <ProductList products={products} fetchProducts={fetchProducts} />
            </div>
            <NewProductForm
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onAddProduct={handleAddProduct} />
        </div>
    );
};

export default Home;
