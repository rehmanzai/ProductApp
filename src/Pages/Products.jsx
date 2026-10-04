import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, RotateCw, Search } from 'lucide-react'
import Loader from '../components/Loader/Loader.jsx'
import ProductCard from '../components/ProductCard/ProductCard.jsx'
import { BOUQUET_PRODUCT, FEATURED_PRODUCT_IDS, getProductImage } from '../productImages.js'

const PRODUCTS_URL = 'https://dummyjson.com/products?limit=194&select=id,title,price,category,brand,description,thumbnail,images,rating,reviews,discountPercentage,stock'
const MASCARA_URL = 'https://makeup-api.herokuapp.com/api/v1/products/42.json'

function Products() {
	const [attempt, setAttempt] = useState(0)
	const [search, setSearch] = useState('')
	const [category, setCategory] = useState('All')
	const [request, setRequest] = useState({ attempt: -1, status: 'loading', products: [], error: '' })

	useEffect(() => {
		const controller = new AbortController()

		async function fetchProducts() {
			try {
				const [response, mascaraResponse] = await Promise.all([
					fetch(PRODUCTS_URL, { signal: controller.signal }),
					fetch(MASCARA_URL, { signal: controller.signal }),
				])
				if (!response.ok || !mascaraResponse.ok) {
					throw new Error(`The store responded with status ${response.status} or ${mascaraResponse.status}.`)
				}
				const [data, mascara] = await Promise.all([response.json(), mascaraResponse.json()])
				const products = (data.products ?? [])
					.filter((product) => FEATURED_PRODUCT_IDS.includes(product.id))
					.map((product) => product.id === 1
						? {
							...product,
							title: mascara.name,
							brand: 'Maybelline',
							price: Number(mascara.price),
							description: mascara.description,
							image: getProductImage(product),
						}
						: { ...product, image: getProductImage(product) })
				products.push({ ...BOUQUET_PRODUCT, image: getProductImage(BOUQUET_PRODUCT) })
				setRequest({ attempt, status: 'success', products, error: '' })
			} catch (error) {
				if (error.name !== 'AbortError') {
					setRequest({ attempt, status: 'error', products: [], error: error.message })
				}
			}
		}

		fetchProducts()
		return () => controller.abort()
	}, [attempt])

	const isLoading = request.attempt !== attempt || request.status === 'loading'
	const categories = useMemo(
		() => ['All', ...new Set(request.products.map((product) => product.category))],
		[request.products],
	)
	const filteredProducts = useMemo(() => {
		const query = search.trim().toLowerCase()
		return request.products.filter((product) => {
			const matchesCategory = category === 'All' || product.category === category
			const matchesSearch = !query || product.title.toLowerCase().includes(query)
			return matchesCategory && matchesSearch
		})
	}, [category, request.products, search])

	function retryRequest() {
		setRequest((current) => ({ ...current, status: 'loading' }))
		setAttempt((current) => current + 1)
	}

	return (
		<main className="storefront-main">
			<section className="hero" aria-label="Featured collection">
				<div className="hero-content">
					<p className="hero-label">A considered collection / 01</p>
					<h1 className="hero-title">
							Good things, made for everyday.
					</h1>
					<p>
							Useful objects, thoughtful details, and pieces you will be glad to keep around.
						</p>
						<a href="#collection" className="hero-button">
							Browse the collection <ArrowRight size={17} />
						</a>
				</div>
				<div className="hero-image" role="img" aria-label="Warm, thoughtfully styled home decor" />
			</section>

			<section id="collection" className="collection">
					<div className="collection-top">
						<div>
							<p className="collection-label">The edit</p>
							<h2 className="collection-title">Shop the collection</h2>
						</div>
						<label className="search-box">
							<Search size={18} />
							<span className="sr-only">Search products</span>
							<input
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search products"
							/>
						</label>
					</div>

					{!isLoading && request.status === 'success' && (
						<div className="categories" aria-label="Filter by category">
							{categories.map((item) => (
								<button
									key={item}
									type="button"
									onClick={() => setCategory(item)}
									className={`category-btn ${category === item ? 'active' : ''}`}
								>
									{item === 'All' ? item : item.replaceAll('-', ' ')}
								</button>
							))}
						</div>
					)}

					{isLoading && <Loader />}

					{!isLoading && request.status === 'error' && (
						<div className="request-error" role="alert">
							<p className="request-error-title">We could not load the collection.</p>
							<p>{request.error || 'Check your connection and try again.'}</p>
							<button type="button" onClick={retryRequest} className="retry-button">
								<RotateCw size={15} /> Try again
							</button>
						</div>
					)}

					{!isLoading && request.status === 'success' && filteredProducts.length > 0 && (
						<div className="products-grid">
							{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
						</div>
					)}

					{!isLoading && request.status === 'success' && filteredProducts.length === 0 && (
						<p className="empty-state">No products match that search. Try another term.</p>
					)}
			</section>
		</main>
	)
}

export default Products
