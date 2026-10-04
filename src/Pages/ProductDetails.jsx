import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, RotateCw, ShoppingBag, Star } from 'lucide-react'
import Loader from '../components/Loader/Loader.jsx'
import { useCart } from '../context/useCart.js'
import { BOUQUET_PRODUCT, BOUQUET_PRODUCT_ID, getProductImage } from '../productImages.js'

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})
const MASCARA_DETAILS_URL = 'https://makeup-api.herokuapp.com/api/v1/products/42.json'

function ProductDetails() {
	const { productId } = useParams()
	const { addToCart } = useCart()
	const [attempt, setAttempt] = useState(0)
	const [request, setRequest] = useState({ id: '', attempt: -1, status: 'loading', product: null, error: '' })

	useEffect(() => {
		const controller = new AbortController()

		async function fetchProduct() {
			try {
				if (productId === String(BOUQUET_PRODUCT_ID)) {
					setRequest({ id: productId, attempt, status: 'success', product: BOUQUET_PRODUCT, error: '' })
					return
				}

				const productUrl = productId === '1'
					? MASCARA_DETAILS_URL
					: `https://dummyjson.com/products/${productId}`
				const response = await fetch(productUrl, {
					signal: controller.signal,
				})
				if (!response.ok) {
					throw new Error(`The store responded with status ${response.status}.`)
				}
				const data = await response.json()
				const product = productId === '1'
					? {
						...data,
						id: 1,
						title: data.name,
						brand: 'Maybelline',
						category: 'beauty',
						price: Number(data.price),
						rating: null,
						reviews: [],
					}
					: data
				setRequest({ id: productId, attempt, status: 'success', product, error: '' })
			} catch (error) {
				if (error.name !== 'AbortError') {
					setRequest({ id: productId, attempt, status: 'error', product: null, error: error.message })
				}
			}
		}

		fetchProduct()
		return () => controller.abort()
	}, [attempt, productId])

	const isLoading = request.id !== productId || request.attempt !== attempt || request.status === 'loading'

	if (isLoading) return <Loader label="Loading product details" />

	if (request.status === 'error') {
		return (
			<main className="product-details-page mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-5 sm:px-8">
				<p className="text-lg font-semibold text-[var(--terracotta-dark)]" role="alert">We could not load this product.</p>
				<p className="mt-2 text-sm text-[#68716a]">{request.error || 'Check your connection and try again.'}</p>
				<button type="button" onClick={() => setAttempt((current) => current + 1)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--terracotta)] px-4 py-2.5 text-sm font-semibold text-white">
					<RotateCw size={15} /> Try again
				</button>
			</main>
		)
	}

	const product = request.product
	if (!product || !product.id) {
		return (
			<main className="product-details-page mx-auto flex min-h-[60vh] max-w-7xl flex-col items-start justify-center px-5 sm:px-8">
				<p className="font-display text-3xl">Product not found.</p>
				<Link to="/" className="mt-5 text-sm font-semibold text-[var(--terracotta)]">Back to the collection</Link>
			</main>
		)
	}

	return (
		<main className="product-details-page mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
			<Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--terracotta)]">
				<ArrowLeft size={16} /> Back to collection
			</Link>
			<div className="grid gap-8 md:grid-cols-2 md:gap-14">
				<div className="detail-image grid min-h-[330px] place-items-center bg-[var(--white)] p-10 sm:min-h-[520px] sm:p-16">
					  <img src={getProductImage(product)} alt={product.title} className="max-h-[440px] w-full object-contain" />
				</div>
				<section className="flex flex-col items-start justify-center py-2">
					<p className="text-xs font-bold uppercase text-[var(--green-light)]">
						{product.brand ? `${product.brand} / ${product.category}` : product.category}
					</p>
					<h1 className="font-display mt-3 text-3xl leading-tight text-[var(--brown)] sm:text-5xl">{product.title}</h1>
					<div className="mt-5 flex items-center gap-2 text-sm text-[var(--muted)]">
						<Star size={16} fill="#d7a64a" stroke="#d7a64a" />
						<span className="font-semibold text-[var(--brown)]">{product.rating ?? 'New'}</span>
						{product.reviews?.length > 0 && <span>({product.reviews.length} reviews)</span>}
					</div>
					<p className="mt-6 text-xl font-semibold text-[var(--terracotta)]">{currency.format(product.price)}</p>
					<p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">{product.description}</p>
					<button
						type="button"
						onClick={() => addToCart({ ...product, image: getProductImage(product) })}
						className="mt-8 inline-flex h-12 w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[var(--terracotta)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--terracotta-dark)]"
					>
						<ShoppingBag size={17} /> Add to bag <Plus size={16} />
					</button>
					<div className="mt-7 grid w-full max-w-sm grid-cols-2 divide-x divide-[var(--border)] border-y border-[var(--border)] py-4 text-xs text-[var(--muted)]">
						<span className="pr-4">Complimentary delivery</span>
						<span className="pl-4">Easy 30-day returns</span>
					</div>
				</section>
			</div>
		</main>
	)
}

export default ProductDetails
