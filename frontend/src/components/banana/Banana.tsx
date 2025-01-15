import c from './Banana.module.scss'

const points = [
    {
        num: 1,
        title: '150+',
        subtitle: 'Global Franchises',
    },
    {
        num: 3,
        title: '97%',
        subtitle: 'Happy Customer',
    },
    {
        num: 2,
        title: '100%',
        subtitle: 'Orgnic Product',
    },
    {
        num: 4,
        title: '10M+',
        subtitle: 'Monthly Sales',
    },
]

const Banana = () => {
    return (
        <div className={c.banana}>
            <div className={c.banana__top}>
                <div className={c.banana__img}></div>
                <div className={c.banana__right}>
                    <p className={c.banana__title}>
                        Eat a banana for a healthy snack
                    </p>
                    <p className={c.banana__subtitle}>
                        You should eat at least five serves of vegetables and
                        two serves of fruit each day. Choose different colours
                        and varieties.
                    </p>
                    <div className={c.banana__points}>
                        {points.map((p) => (
                            <div key={p.title} className={c.banana__point}>
                                <p className={c.banana__num}>{p.num}</p>
                                <div className={c.banana__pluses}>
                                    <p className={c.banana__pluses_top}>
                                        {p.title}
                                    </p>
                                    <p className={c.banana__pluses_bottom}>
                                        {p.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banana
