import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/useCart.js'

function Navbar() {
	const { itemCount } = useCart()

	return (
		<header className="border-b border-[#e2e5df] bg-[#fbfbf8]">
			<div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
				<Link to="/" className="font-display text-xl font-semibold leading-none text-[#202521] sm:text-[25px]">
					Product App
				</Link>
				<nav aria-label="Main navigation" className="flex items-center gap-5 sm:gap-9">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							`text-sm font-semibold transition-colors ${isActive ? 'text-[#315f49]' : 'text-[#606960] hover:text-[#202521]'}`
						}
					>
						Shop
					</NavLink>
					<Link
						to="/cart"
						aria-label={`Shopping bag, ${itemCount} items`}
						className="inline-flex h-10 items-center gap-2 rounded-full border border-[#dfe4dd] px-3 text-sm font-semibold text-[#202521] transition hover:border-[#8b9d8d]"
					>
						<ShoppingBag size={17} strokeWidth={1.8} />
						<span>Bag</span>
						<span className="grid size-5 place-items-center rounded-full bg-[#eaf0e8] text-xs text-[#315f49]">
							{itemCount}
						</span>
					</Link>
					<a
						className="hidden items-center gap-1 text-sm font-semibold text-[#315f49] md:inline-flex"
						href="https://dummyjson.com/products"
						target="_blank"
						rel="noreferrer"
					>
						Source <ArrowUpRight size={15} />
					</a>
				</nav>
			</div>
		</header>
	)
}

export default Navbar
