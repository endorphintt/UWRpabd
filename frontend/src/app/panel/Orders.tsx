'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Orders.module.scss'

interface Order {
    id: number
    userId: number
    totalPrice: number
    status: string
    address: string
    phone: string
    name: string
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [newStatuses, setNewStatuses] = useState<{ [key: number]: string }>(
        {}
    ) // New state to store status for each order

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:7111/orders')
            setOrders(response.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handleDeleteOrder = async (orderId: number) => {
        if (!confirm('Are you sure you want to delete this order?')) return

        try {
            await axios.delete(`http://localhost:7111/orders/${orderId}`)
            fetchOrders()
        } catch (error) {
            console.error('Error deleting order:', error)
        }
    }

    const handleChangeStatus = async (orderId: number) => {
        const newStatus = newStatuses[orderId]

        if (!newStatus) {
            alert('Please enter a new status')
            return
        }

        try {
            await axios.post(`http://localhost:7111/orders/status/${orderId}`, {
                status: newStatus,
            })
            fetchOrders()
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    const handleStatusInputChange = (orderId: number, value: string) => {
        setNewStatuses((prevStatuses) => ({
            ...prevStatuses,
            [orderId]: value,
        }))
    }

    return (
        <div className={styles.orders}>
            <h2>Orders</h2>
            <div className={styles.list}>
                {orders.map((order) => (
                    <div key={order.id} className={styles.order}>
                        <p>
                            {order.name} - ${order.totalPrice}
                        </p>
                        <p>Status: {order.status}</p>

                        {/* Input for changing status */}
                        <input
                            type="text"
                            placeholder="Enter new status"
                            value={newStatuses[order.id] || ''}
                            onChange={(e) =>
                                handleStatusInputChange(
                                    order.id,
                                    e.target.value
                                )
                            }
                        />
                        <button onClick={() => handleChangeStatus(order.id)}>
                            Change Status
                        </button>

                        {/* Button to delete the order */}
                        <button onClick={() => handleDeleteOrder(order.id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
