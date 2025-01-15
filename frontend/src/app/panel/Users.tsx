'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './Users.module.scss'

interface User {
    id: number
    email: string
    banned: boolean
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([])
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:7111/users')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const handleBanUnbanUser = async (userId: number, isBanned: boolean) => {
        const action = isBanned ? 'unban' : 'ban'
        const reason = action === 'ban' ? prompt('Enter ban reason:') : null
        if (action === 'ban' && !reason) return

        try {
            await axios.post(`http://localhost:7111/users/${action}`, {
                userId,
                banReason: reason || '',
            })
            fetchUsers()
        } catch (error) {
            console.error(`Error ${action}ing user:`, error)
        }
    }

    return (
        <div className={styles.users}>
            <h2>Users</h2>
            <div className={styles.list}>
                {users.map((user) => (
                    <div key={user.id} className={styles.user}>
                        <p>{user.email}</p>
                        <button
                            className={
                                user.banned
                                    ? styles.unbanButton
                                    : styles.banButton
                            }
                            onClick={() =>
                                handleBanUnbanUser(user.id, user.banned)
                            }
                        >
                            {user.banned ? 'Unban' : 'Ban'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users
