import React, { useEffect, useState } from 'react'
import { getBlacklist, removeFromBlacklist } from '../utils/ApiFunctions'
import { useAuth } from '../provider/AuthContext'

const Blacklist = () => {
    const { userId } = useAuth()
    const [blacklist, setBlacklist] = useState([])

    useEffect(() => {
        fetchBlacklist(userId)
    }, [])

    const fetchBlacklist = async (userId) => {
        const response = await getBlacklist(userId)
        setBlacklist(response.payload)
    }

    const handleDelete = async (userId, sellerId) => {
        await removeFromBlacklist(userId, sellerId)
        fetchBlacklist(userId)
    }
    return (
        <div className="table-container">
            <h2>Sellers in my Blacklist</h2>
            <table className="favorites-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blacklist.length > 0 ? (
                        blacklist.map(seller => (
                            <tr key={seller.id}>
                                <td>{seller.name}</td>
                                <td>

                                    <button onClick={() => handleDelete(userId, seller.id)}>Delete</button>
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

export default Blacklist