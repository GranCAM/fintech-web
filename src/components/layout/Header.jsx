import { Link, NavLink } from 'react-router-dom'
import ConnectLink from '../qubic/connect/ConnectLink'
import logo from '../../assets/logo/HM25.svg'

const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pago QR', path: '/qr' },
    { name: 'Ahorros', path: '/savings' },
    { name: 'Notificaciones', path: '/notifications' },
]

const Header = () => {
    return (
        <div className="fixed h-[78px] flex w-full z-10 top-0 gap-10 items-center justify-between border-b border-solid border-gray-70 bg-gray-90 px-6">
            {/* Logo */}
            <div className="flex items-center gap-6">
                <Link to="/">
                    <img src={logo} alt="smartsave logo" className="h-14 w-auto" />
                </Link>

                {/* Navegación */}
                <nav className="hidden md:flex gap-6 text-white font-medium">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `hover:text-primary-50 transition-colors ${
                                    isActive ? 'text-primary-50 font-semibold' : 'text-gray-300'
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Botón de conexión */}
            <ConnectLink />
        </div>
    )
}

export default Header
