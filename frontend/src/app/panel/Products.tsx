'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Products.module.scss'

interface Product {
    id: number
    name: string
    description: string
    price: number
    images: string[] // Assuming images are URLs returned from the server
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number | ''>('')
    const [images, setImages] = useState<FileList | null>(null) // New state for images

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:7111/products')
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleCreateProduct = async () => {
        if (!name || !description || price === '' || !images) {
            alert('Please fill in all fields and select images')
            return
        }

        const formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price.toString())

        // Append selected images to the FormData
        Array.from(images).forEach((image) => {
            formData.append('images', image)
        })

        try {
            await axios.post('http://localhost:7111/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            fetchProducts()
            setName('')
            setDescription('')
            setPrice('')
            setImages(null)
        } catch (error) {
            console.error('Error creating product:', error)
        }
    }

    const handleDeleteProduct = async (productId: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return

        try {
            await axios.post('http://localhost:7111/products/delete', {
                productId,
            })
            fetchProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
        }
    }

    return (
        <div className={styles.products}>
            <h2>Products</h2>
            <div className={styles.createForm}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                />
                <button onClick={handleCreateProduct}>Create Product</button>
            </div>
            <div className={styles.list}>
                {products.map((product) => (
                    <div key={product.id} className={styles.product}>
                        <span>
                            {product.name} - ${product.price}
                        </span>
                        <button onClick={() => handleDeleteProduct(product.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
