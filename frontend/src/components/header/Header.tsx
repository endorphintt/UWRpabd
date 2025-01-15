'use client'

import Image from 'next/image'
import c from './Header.module.scss'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { decodeToken } from '@/app/functions'
import { useDispatch } from 'react-redux'
import { TOGGLE_BASKET } from '@/app/redux/consts'

const buttons = [
    {
        name: 'Home',
        route: '/',
    },
    {
        name: 'Fruits',
        route: '/products',
    },
]

const Header = () => {
    const [activeRoute, setActiveRoute] = useState<string>('/')
    const dispatch = useDispatch()

    const isAdmin =
        decodeToken(localStorage.getItem('token'))?.roles[0].value === 'admin'
    const isAuthentificated = localStorage.getItem('token')

    const router = useRouter()
    const changePage = (route: string) => {
        setActiveRoute(route)
        router.push(route)
    }
    return (
        <div className={c.header}>
            <Image src={'/logo.png'} width={124} height={50} alt="logo" />

            <div className={c.header__links}>
                {buttons.map((b) => (
                    <button
                        style={{
                            borderBottom:
                                activeRoute === b.route
                                    ? `2px solid green`
                                    : 'none',
                            fontWeight: activeRoute === b.route ? `700` : '400',
                        }}
                        key={b.name}
                        onClick={() => changePage(b.route)}
                    >
                        {b.name}
                    </button>
                ))}
            </div>
            <div className={c.header__right}>
                <div className={c.header__basket}>
                    {isAuthentificated ? (
                        <button
                            onClick={() => dispatch({ type: TOGGLE_BASKET })}
                        >
                            <Image
                                src={'/basket.png'}
                                width={25}
                                height={25}
                                alt="basket"
                            />
                        </button>
                    ) : (
                        <button className={c.header__login}>login</button>
                    )}
                </div>
                <div className={c.header__panel}>
                    {isAdmin ? (
                        <button onClick={() => changePage('/panel')}>
                            panel
                        </button>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
