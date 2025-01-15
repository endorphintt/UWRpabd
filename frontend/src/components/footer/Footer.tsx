import Image from 'next/image'
import c from './Footer.module.scss'
import { useRouter } from 'next/navigation'

const Footer = () => {
    return (
        <div className={c.footer}>
            <Image src={'/logo.png'} width={164} height={65} alt="logo" />
        </div>
    )
}

export default Footer
