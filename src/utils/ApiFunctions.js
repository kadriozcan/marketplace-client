import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: 'true'
})

// get all products
export async function getAllProducts(filters) {
    try {
        const queryParams = new URLSearchParams(filters).toString()
        const response = await api.get(`/products?${queryParams}`)
        console.log(response.data)
        return response.data
    } catch (e) {
        throw new Error("Error fetching all products!")
    }
}

export async function getProductDetailById(productId) {
    try {
        const response = await api.get(`/products/${productId}`)
        return response.data

    } catch (e) {
        throw new Error(`Error fetching product by id: ${productId}`)
    }
}

export async function addToFavorites(userId, productId) {
    try {
        const response = await api.post(`/favorites`, null, {
            params: {
                userId: userId,
                productId: productId
            }
        });
        return response;
    } catch (error) {
        console.error('Error adding to favorites:', error);
        throw error;
    }
}

export async function login(username, password) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await api.post('/login', params.toString(), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    return response
}

export async function logout() {
    const response = await api.post('/logout')
    return response
}

export async function getFavorites(userId) {
    const params = new URLSearchParams()
    params.append('userId', userId)

    const response = await api.get(`/favorites?${params.toString()}`)
    return response.data

}

export async function removeFromFavorites(userId, productId) {
    const params = new URLSearchParams()
    params.append('userId', userId)
    params.append('productId', productId)

    await api.delete(`/favorites?${params.toString()}`)
}

export async function addNewProduct(product) {
    try {
        const response = await api.post('/products', product)
        console.log('Product added successfully!', response.data)
    } catch (e) {
        console.error('Error adding new product: ', e)
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await api.delete(`/products/${productId}`)

    } catch (e) {
        console.error(e)
    }
}

export async function addSellerToBlacklist(userId, sellerName) {
    const params = new URLSearchParams()
    params.append('userId', userId)
    params.append('sellerName', sellerName)

    await api.post(`/blacklists?${params.toString()}`)
}

export async function getBlacklist(userId) {
    const params = new URLSearchParams()
    params.append('userId', userId)

    const response = await api.get(`/blacklists?${params.toString()}`)
    return response.data

}

export async function removeFromBlacklist(userId, sellerId) {
    const params = new URLSearchParams()
    params.append('userId', userId)
    params.append('sellerId', sellerId)

    await api.delete(`/blacklists?${params.toString()}`)
}

export async function getAllSellers() {

    const response = await api.get("/sellers")
    return response.data

}