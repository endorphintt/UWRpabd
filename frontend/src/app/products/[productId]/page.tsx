'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Product.module.scss'
import { decodeToken } from '@/app/functions'

interface Product {
    id: number
    name: string
    description: string
    price: number
    images: string[]
}

interface AddProductToBasketDto {
    basketId: number
    productId: number
    quantity: number
}

const ProductPage: React.FC = () => {
    const pathname = usePathname()
    const id = pathname?.split('/').pop()

    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const basketId = decodeToken(localStorage.getItem('token'))?.basket.id
    useEffect(() => {
        if (!id || isNaN(Number(id))) {
            setIsLoading(false)
            setError('Invalid product ID')
            return
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:7111/products/${id}`
                )
                if (!response.ok) throw new Error('Failed to fetch product')
                const data = await response.json()
                setProduct(data)
            } catch (err) {
                setError('Error fetching product details')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [id])

    const addToBasket = async () => {
        if (!basketId || !product) {
            alert('User not authenticated or product not found')
            return
        }

        const payload: AddProductToBasketDto = {
            basketId: basketId,
            productId: product.id,
            quantity: 1,
        }

        try {
            const response = await fetch(
                `http://localhost:7111/baskets/add-product`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                }
            )
            if (!response.ok) throw new Error('Failed to add product to basket')
            alert('Product added to basket!')
        } catch (err) {
            alert('Error adding product to basket')
        }
    }

    if (isLoading) return <p className={styles.loading}>Loading...</p>
    if (error) return <p className={styles.error}>{error}</p>
    if (!product) return <p className={styles.notFound}>Product not found</p>

    return (
        <div className={styles.productPage}>
            <div className={styles.productImage}>
                {product.images.length > 0 && (
                    <img
                        src={'http://localhost:7111/' + product.images[0]}
                        alt={product.name}
                    />
                )}
            </div>
            <div className={styles.productDetails}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div className={styles.price}>${product.price}</div>

                <button className={styles.addToBasket} onClick={addToBasket}>
                    Add to Basket
                </button>
            </div>
        </div>
    )
}

export default ProductPage
