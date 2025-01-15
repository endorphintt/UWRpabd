'use client'

import c from './Auth.module.scss'
import { useState } from 'react'
import { server } from '../../consts'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const chooseFormButtons = [
    {
        name: 'login',
        backgroundColor: 'transparent',
    },
    {
        name: 'register',
        backgroundColor: '#59BE29',
    },
]

const Auth = () => {
    const [formName, setFormName] = useState<string>('login')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const url =
            formName === 'login'
                ? `${server}auth/login`
                : `${server}auth/registration`

        const requestData =
            formName === 'login'
                ? { email, password }
                : { name, email, password }

        try {
            const response = await axios.post(url, requestData)
            const { token } = response.data
            localStorage.setItem('token', token)
            router.push('/')
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'server error')
            } else {
                setError('something went wrong!')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={c.auth__container}>
            <div className={c.auth}>
                <div className={c.auth__header}>
                    {chooseFormButtons.map((b) => (
                        <button
                            key={b.name}
                            style={{ backgroundColor: b.backgroundColor }}
                            onClick={() => setFormName(b.name)}
                            className={c.auth__button}
                        >
                            {b.name}
                        </button>
                    ))}
                </div>
                <div className={c.form__container}>
                    <h1 className={c.form__title}>
                        {formName === 'login'
                            ? 'Enter your account'
                            : 'Create an account'}
                    </h1>
                    <form className={c.form} onSubmit={handleSubmit}>
                        {formName !== 'login' ? (
                            <div className={c.form__item}>
                                <label htmlFor="password">full name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        ) : (
                            <span></span>
                        )}
                        <div className={c.form__item}>
                            <label htmlFor="email">email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={c.form__item}>
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            className={c.form__button}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? 'loading...'
                                : formName === 'login'
                                ? 'login'
                                : 'register'}
                        </button>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
