'use client'

import { useState } from 'react'
import { decodeToken } from '@/app/functions'
import Products from './Products'
import Orders from './Orders'
import Users from './Users'
import styles from './Panel.module.scss'

const Panel = () => {
    const isAdmin =
        decodeToken(localStorage.getItem('token'))?.roles[0].value === 'admin'

    if (!isAdmin) {
        return <h1>No access</h1>
    }

    const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'users'>(
        'products'
    )

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <button onClick={() => setActiveTab('products')}>
                    Products
                </button>
                <button onClick={() => setActiveTab('orders')}>Orders</button>
                <button onClick={() => setActiveTab('users')}>Users</button>
            </div>
            <div className={styles.content}>
                {activeTab === 'products' && <Products />}
                {activeTab === 'orders' && <Orders />}
                {activeTab === 'users' && <Users />}
            </div>
        </div>
    )
}

export default Panel
