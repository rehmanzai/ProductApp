import { Link } from 'react-router-dom'
import { ArrowUpRight, Plus } from 'lucide-react'
import { useCart } from '../../context/useCart.js'

const currency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

function ProductCard({ product }) {
	const { addToCart } = useCart()

	return (
		<article className="product-card">
			<Link
				to={`/products/${product.id}`}
				className="product-card-image"
				aria-label={`View ${product.title}`}
			>
				<img
					src={product.image}
					alt={product.title}
					loading="lazy"
					className="product-photo"
				/>
				<span className="product-card-arrow">
					<ArrowUpRight size={17} />
				</span>
			</Link>
			<div className="product-card-content">
				<div className="product-card-copy">
					<p className="product-category">
						{product.brand || product.category}
					</p>
					<Link to={`/products/${product.id}`} className="product-card-title">
						{product.title}
					</Link>
					<p className="product-price">{currency.format(product.price)}</p>
				</div>
				<button
					type="button"
					onClick={() => addToCart(product)}
					aria-label={`Add ${product.title} to bag`}
					title="Add to bag"
					className="add-to-bag"
				>
					<Plus size={18} />
				</button>
			</div>
		</article>
	)
}

export default ProductCard
