import axios from 'axios'

const API_URL = 'http://localhost:7111'

// 📌 Отримати всі товари в кошику
export const getBasketProducts = async (userId: number) => {
    try {
        const response = await axios.post(`${API_URL}/baskets/products`, {
            userId,
        })
        return response.data // [{ productId, quantity }]
    } catch (error) {
        console.error('Error fetching basket products:', error)
        throw error
    }
}

// 📌 Отримати деталі продукту за його ID
export const getProductDetails = async (productId: number) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`)
        return response.data // { id, name, description, price, images }
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error)
        throw error
    }
}

// 📌 Додати товар до кошика
export const addProductToBasket = async (
    basketId: number,
    productId: number,
    quantity: number
) => {
    try {
        const response = await axios.post(`${API_URL}/baskets/add-product`, {
            basketId,
            productId,
            quantity,
        })
        return response.data
    } catch (error) {
        console.error('Error adding product to basket:', error)
        throw error
    }
}

// 📌 Видалити товар із кошика
export const removeProductFromBasket = async (
    basketId: number,
    productId: number
) => {
    try {
        const response = await axios.delete(
            `${API_URL}/baskets/remove-product`,
            {
                data: { basketId, productId },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error removing product:', error)
        throw error
    }
}

// 📌 Збільшити кількість товару в кошику
export const increaseProductQuantity = async (
    basketId: number,
    productId: number
) => {
    try {
        const response = await axios.post(
            `${API_URL}/baskets/increase-product`,
            {
                basketId,
                productId,
                quantity: 1,
            }
        )
        return response.data
    } catch (error) {
        console.error('Error increasing product quantity:', error)
        throw error
    }
}

// 📌 Зменшити кількість товару в кошику
export const decreaseProductQuantity = async (
    basketId: number,
    productId: number
) => {
    try {
        const response = await axios.post(
            `${API_URL}/baskets/decrease-product`,
            {
                basketId,
                productId,
                quantity: 1,
            }
        )
        return response.data
    } catch (error) {
        console.error('Error decreasing product quantity:', error)
        throw error
    }
}

export const decodeToken = (
    token: string | null
): Record<string, any> | null => {
    if (!token) return null

    try {
        const jwt = token.startsWith('Bearer ') ? token.split(' ')[1] : token

        const [, payload] = jwt.split('.')
        const decodedPayload = JSON.parse(atob(payload))
        return decodedPayload
    } catch (error) {
        console.error('Invalid token:', error)
        return null
    }
}
