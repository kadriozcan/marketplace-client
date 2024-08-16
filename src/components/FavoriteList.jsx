import React, { useEffect, useState } from 'react'
import { getFavorites, removeFromFavorites } from '../utils/ApiFunctions'
import { useAuth } from '../provider/AuthContext'
import '../styles/FavoriteList.css'

const FavoriteList = () => {
    const { userId } = useAuth()
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavorites(userId)
    }, [])

    const fetchFavorites = async (userId) => {
        const response = await getFavorites(userId)
        console.log("response: ", response)
        setFavorites(response.payload)
    }

    const handleDelete = async (userId, productId) => {
        await removeFromFavorites(userId, productId)
        fetchFavorites(userId)
    }

    return (
        <div className="table-container">
            <h2>Favorites</h2>
            <table className="favorites-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.length > 0 ? (
                        favorites.map(favorite => (
                            <tr key={favorite.id}>
                                <td>{favorite.id}</td>
                                <td>{favorite.name}</td>
                                <td>{favorite.description}</td>
                                <td>

                                    <button onClick={() => handleDelete(userId, favorite.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No favorites found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default FavoriteList