import c from './HomeTop.module.scss'
import Image from 'next/image'

const HomeTop = () => {
    return (
        <div className={c.top}>
            <div className={c.top__left}>
                <p className={c.top__subtitle}>fresh fruit for you</p>
                <h1 className={c.top__title}>Eat as you want</h1>
                <p className={c.top__description}>
                    Fruit and vegetables should be an important part of your
                    daily diet. They are naturally good and contain vitamins and
                    minerals that can help to keep you healthy.
                </p>
            </div>
            <div className={c.top__right}></div>
        </div>
    )
}

export default HomeTop
