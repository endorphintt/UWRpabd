'use client'

import axios from 'axios'
import { TOGGLE_BASKET } from '@/app/redux/consts'
import c from './Basket.module.scss'
import { RootState } from '@/app/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import {
    decodeToken,
    decreaseProductQuantity,
    getBasketProducts,
    getProductDetails,
    increaseProductQuantity,
    removeProductFromBasket,
} from '@/app/functions'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BasketItem {
    basketId: number
    productId: number
    quantity: number
    name?: string
    price?: number
    images?: string[]
}

const Basket = () => {
    const isOpen = useSelector((state: RootState) => state.basket.isOpen)
    const dispatch = useDispatch()
    const [products, setProducts] = useState<BasketItem[]>([])
    const userId = decodeToken(localStorage.getItem('token'))?.id
    const [orderMenu, setOrderMenu] = useState(false)
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    // Функція для оновлення кошика
    const refreshBasket = async () => {
        if (!userId) return
        try {
            const basketItems = await getBasketProducts(userId)
            const productDetailsPromises = basketItems.map(
                async (item: BasketItem) => {
                    const productDetails = await getProductDetails(
                        item.productId
                    )
                    return { ...item, ...productDetails }
                }
            )

            const fullProductDetails = await Promise.all(productDetailsPromises)
            setProducts(fullProductDetails)
        } catch (error) {
            console.error('Error fetching basket:', error)
        }
    }

    // Оновлюємо кошик при відкритті
    useEffect(() => {
        if (isOpen) {
            refreshBasket()
        }
    }, [isOpen, userId])

    const calculateTotalPrice = (): number => {
        return products.reduce((total, product) => {
            return total + (product.price || 0) * product.quantity
        }, 0)
    }
    const totalPrice = calculateTotalPrice()

    const handleRemoveProduct = async (basketId: number, productId: number) => {
        await removeProductFromBasket(basketId, productId)
        await refreshBasket() // Оновлення кошика після видалення товару
    }

    const handleIncreaseQuantity = async (
        basketId: number,
        productId: number
    ) => {
        await increaseProductQuantity(basketId, productId)
        await refreshBasket() // Оновлення кошика після зміни кількості
    }

    const handleDecreaseQuantity = async (
        basketId: number,
        productId: number
    ) => {
        await decreaseProductQuantity(basketId, productId)
        await refreshBasket() // Оновлення кошика після зміни кількості
    }

    const handleSubmit = async () => {
        if (!userId) {
            alert('User not authenticated')
            return
        }

        try {
            const response = await axios.post(
                `http://localhost:7111/orders/create`,
                {
                    address,
                    phone,
                    name,
                    totalPrice,
                    userId: userId,
                }
            )
            console.log('Order created:', response.data)
            alert('Order created successfully!')
            router.push('/home')
        } catch (error) {
            console.error('Error creating order:', error)
            alert('Failed to create order. Please try again.')
        }
    }

    return (
        <div
            className={c.basket}
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            <div className={c.basket__header}>
                <button
                    className={c.basket__cancel}
                    onClick={() => dispatch({ type: TOGGLE_BASKET })}
                ></button>
            </div>
            <div className={c.basket__items}>
                {products.map((product) => (
                    <div key={product.productId} className={c.basket__item}>
                        <h3 className={c.basket__name}>{product.name}</h3>
                        <p className={c.basket__price}>
                            Price: ${product.price}
                        </p>
                        <p className={c.basket__quantity}>
                            Quantity: {product.quantity}
                        </p>
                        <div className={c.basket__buttons}>
                            <button
                                onClick={() =>
                                    handleIncreaseQuantity(
                                        product.basketId,
                                        product.productId
                                    )
                                }
                                className={c.basket__increase}
                            >
                                +
                            </button>
                            <button
                                onClick={() =>
                                    handleDecreaseQuantity(
                                        product.basketId,
                                        product.productId
                                    )
                                }
                                className={c.basket__decrease}
                            >
                                -
                            </button>
                            <button
                                onClick={() =>
                                    handleRemoveProduct(
                                        product.basketId,
                                        product.productId
                                    )
                                }
                                className={c.basket__remove}
                            >
                                <Image
                                    className={c.basket__img}
                                    src={'/remove.png'}
                                    height={20}
                                    width={15}
                                    alt="remove"
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={c.basket__total}>
                <p>Total Price: ${totalPrice.toString()}</p>
            </div>
            <div className={c.order}>
                {orderMenu ? (
                    <form className={c.form} onSubmit={handleSubmit}>
                        <div className={c.form__item}>
                            <label htmlFor="address">address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className={c.form__item}>
                            <label htmlFor="text">full name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={c.form__item}>
                            <label htmlFor="text">phone</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            className={c.form__button}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'loading...' : 'buy'}
                        </button>
                        <button
                            onClick={() => setOrderMenu(!orderMenu)}
                            className={c.form__button}
                        >
                            cancel
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={() => setOrderMenu(!orderMenu)}
                        className={c.order__button}
                    >
                        move to order
                    </button>
                )}
            </div>
        </div>
    )
}

export default Basket
