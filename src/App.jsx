import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/NavigationBar";
import Home from "./components/Home";
import Login from "./components/Login";
import "./app.css";
import { useAuth } from "./provider/AuthContext.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import FavoriteList from "./components/FavoriteList.jsx";
import Blacklist from "./components/Blacklist.jsx";

function App() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <main>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                        <Route path="/products/:productId" element={<ProductDetail />} />
                        <Route path="/my-favorites" element={<FavoriteList />} />
                        <Route path="/blacklists" element={<Blacklist />} />
                    </Routes>
                </Router>
            </main>
        </>
    );
}

export default App;
