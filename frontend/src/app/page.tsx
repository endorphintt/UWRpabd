import HomeTop from '@/components/homeTop/HomeTop'
import styles from './page.module.css'
import Banana from '@/components/banana/Banana'

export default function Home() {
    return (
        <div className={styles.page}>
            <HomeTop />
            <Banana />
        </div>
    )
}
