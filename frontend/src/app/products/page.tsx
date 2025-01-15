'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import styles from './Products.module.scss'
import { useRouter } from 'next/navigation'

interface Product {
    id: number
    name: string
    description: string
    price: number
    images: string[]
}

interface FilterState {
    search: string
    minPrice: number | null
    maxPrice: number | null
    sortBy: 'price' | 'name'
}

const Products: React.FC = () => {
    const dispatch = useDispatch()
    const [allProducts, setAllProducts] = useState<Product[]>([]) // Зберігаємо всі продукти
    const [pagination, setPagination] = useState({ page: 1, limit: 10 }) // Ліміт фіксований на 10
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        minPrice: null,
        maxPrice: null,
        sortBy: 'price',
    })

    const basketIsOpen = useSelector((state: RootState) => state.basket.isOpen)

    const fetchProducts = async () => {
        const search = filters.search ? `&search=${filters.search}` : ''
        const minPrice =
            filters.minPrice !== null ? `&minPrice=${filters.minPrice}` : ''
        const maxPrice =
            filters.maxPrice !== null ? `&maxPrice=${filters.maxPrice}` : ''
        const sortBy = filters.sortBy ? `&sortBy=${filters.sortBy}` : ''

        const url = `http://localhost:7111/products?${search}${minPrice}${maxPrice}${sortBy}` // Забираємо параметри пагінації

        const response = await fetch(url)
        const data = await response.json()

        if (data && Array.isArray(data)) {
            setAllProducts(data)
        } else {
            setAllProducts([])
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [filters])

    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch = filters.search
            ? product.name.toLowerCase().includes(filters.search.toLowerCase())
            : true
        const matchesMinPrice =
            filters.minPrice !== null ? product.price >= filters.minPrice : true
        const matchesMaxPrice =
            filters.maxPrice !== null ? product.price <= filters.maxPrice : true

        return matchesSearch && matchesMinPrice && matchesMaxPrice
    })

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (filters.sortBy === 'price') {
            return a.price - b.price
        } else if (filters.sortBy === 'name') {
            return a.name.localeCompare(b.name)
        }
        return 0
    })

    const paginatedProducts = sortedProducts.slice(
        (pagination.page - 1) * pagination.limit,
        pagination.page * pagination.limit
    )

    const handleFilterChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: keyof FilterState
    ) => {
        const value = event.target.value
        setFilters({
            ...filters,
            [field]:
                value === ''
                    ? null
                    : field === 'minPrice' || field === 'maxPrice'
                    ? parseFloat(value)
                    : value,
        })
    }

    const handleSortChange = (sortBy: 'price' | 'name') => {
        setFilters({
            ...filters,
            sortBy,
        })
    }

    const handlePageChange = (newPage: number) => {
        if (
            newPage >= 1 &&
            newPage <= Math.ceil(filteredProducts.length / pagination.limit)
        ) {
            setPagination({
                ...pagination,
                page: newPage,
            })
        }
    }

    const router = useRouter()
    const changePage = (route: string) => {
        router.push(route)
    }

    return (
        <div className={styles.products}>
            <div className={styles.productsFilters}>
                <input
                    type="text"
                    value={filters.search}
                    placeholder="Search by name"
                    className={styles.filterInput}
                    onChange={(e) => handleFilterChange(e, 'search')}
                />
                <input
                    type="number"
                    value={filters.minPrice !== null ? filters.minPrice : ''}
                    placeholder="Min Price"
                    className={styles.filterInput}
                    onChange={(e) => handleFilterChange(e, 'minPrice')}
                />
                <input
                    type="number"
                    value={filters.maxPrice !== null ? filters.maxPrice : ''}
                    placeholder="Max Price"
                    className={styles.filterInput}
                    onChange={(e) => handleFilterChange(e, 'maxPrice')}
                />
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('price')}
                >
                    Sort by Price
                </button>
                <button
                    className={styles.sortButton}
                    onClick={() => handleSortChange('name')}
                >
                    Sort by Name
                </button>
            </div>

            <div className={styles.productsList}>
                {paginatedProducts.map((product) => (
                    <div
                        onClick={() => changePage('/products/' + product.id)}
                        key={product.id}
                        className={styles.productCard}
                    >
                        <img
                            src={'http://localhost:7111/' + product.images[0]}
                            alt={product.name}
                        />
                        <h3 className={styles.productTitle}>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className={styles.price}>${product.price}</div>
                    </div>
                ))}
            </div>
            <div className={styles.productsPagination}>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                >
                    Prev
                </button>
                <span>Page {pagination.page}</span>
                <button
                    className={styles.pageButton}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={
                        pagination.page * pagination.limit >=
                        filteredProducts.length
                    }
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Products
