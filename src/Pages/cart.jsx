import { Link } from 'react-router-dom'
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '../context/useCart.js'

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

function Cart() {
	const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart()

	if (items.length === 0) {
		return (
			<main className="cart-page mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
				<span className="grid size-16 place-items-center rounded-full bg-[var(--cream-dark)] text-[var(--terracotta)]"><ShoppingBag size={25} /></span>
				<p className="mt-5 text-xs font-bold uppercase text-[var(--green-light)]">Your bag is waiting</p>
				<h1 className="font-display mt-2 text-4xl text-[var(--brown)]">Nothing here just yet.</h1>
				<p className="mt-3 max-w-sm text-sm leading-6 text-[var(--muted)]">Find something useful, beautiful, or a little bit of both.</p>
				<Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--terracotta)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--terracotta-dark)]">
					<ArrowLeft size={16} /> Explore the collection
				</Link>
			</main>
		)
	}

	return (
		<main className="cart-page mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
			<p className="mb-2 text-xs font-bold uppercase text-[var(--green-light)]">Ready when you are</p>
			<h1 className="font-display text-4xl text-[var(--brown)] sm:text-5xl">Your bag <span className="text-lg font-normal text-[var(--muted)]">({itemCount})</span></h1>
			<div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
				<section aria-label="Cart items" className="divide-y divide-[#e2e5df] border-y border-[#e2e5df]">
					{items.map((item) => (
						<article key={item.id} className="grid grid-cols-[76px_1fr_auto] gap-4 py-5 sm:grid-cols-[100px_1fr_auto] sm:gap-6">
							<Link to={`/products/${item.id}`} className="grid aspect-square place-items-center bg-[var(--white)] p-3">
								<img src={item.image} alt={item.title} className="h-full w-full object-contain" />
							</Link>
							<div className="min-w-0 self-center">
								<p className="mb-1 text-[10px] font-bold uppercase text-[var(--green-light)]">{item.brand || item.category}</p>
								<Link to={`/products/${item.id}`} className="line-clamp-2 text-sm font-semibold text-[var(--brown)] hover:text-[var(--terracotta)]">{item.title}</Link>
								<p className="mt-2 text-sm text-[var(--muted)]">{currency.format(item.price)} each</p>
								<div className="mt-4 inline-flex h-8 items-center rounded-full border border-[var(--border)]">
									<button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease quantity of ${item.title}`} className="grid size-8 place-items-center text-[var(--muted)] hover:text-[var(--brown)]"><Minus size={14} /></button>
									<span className="w-7 text-center text-xs font-semibold" aria-live="polite">{item.quantity}</span>
									<button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase quantity of ${item.title}`} className="grid size-8 place-items-center text-[var(--muted)] hover:text-[var(--brown)]"><Plus size={14} /></button>
								</div>
							</div>
							<div className="flex flex-col items-end justify-between self-stretch py-1">
								<span className="text-sm font-semibold text-[var(--brown)]">{currency.format(item.price * item.quantity)}</span>
								<button type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`} title="Remove item" className="grid size-8 place-items-center text-[#8a716b] hover:text-[var(--terracotta-dark)]"><Trash2 size={16} /></button>
							</div>
						</article>
					))}
				</section>
				<aside className="h-fit bg-[var(--white)] p-6 sm:p-7">
					<h2 className="font-display text-2xl text-[var(--brown)]">Order summary</h2>
					<div className="mt-6 flex justify-between border-b border-[var(--border)] pb-4 text-sm text-[var(--muted)]">
						<span>Subtotal</span><span className="font-semibold text-[var(--brown)]">{currency.format(subtotal)}</span>
					</div>
					<div className="flex justify-between py-4 text-sm text-[var(--muted)]">
						<span>Shipping</span><span className="font-semibold text-[var(--terracotta)]">Complimentary</span>
					</div>
					<div className="flex justify-between border-t border-[var(--border)] pt-4 text-base font-semibold text-[var(--brown)]">
						<span>Total</span><span>{currency.format(subtotal)}</span>
					</div>
					<Link to="/" className="continue-shopping mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[var(--terracotta)] text-sm font-semibold text-white transition hover:bg-[var(--terracotta-dark)]">
						Continue shopping
					</Link>
					<p className="mt-3 text-center text-xs text-[var(--muted)]">Taxes calculated at checkout</p>
				</aside>
			</div>
		</main>
	)
}

export default Cart
