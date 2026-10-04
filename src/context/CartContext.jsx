import { useEffect, useState } from 'react'
import { CartContext } from './cartContext.js'

const CART_STORAGE_KEY = 'forma-cart'

function readStoredCart() {
	try {
		const storedCart = localStorage.getItem(CART_STORAGE_KEY)
		return storedCart ? JSON.parse(storedCart) : []
	} catch {
		return []
	}
}

export function CartProvider({ children }) {
	const [items, setItems] = useState(readStoredCart)

	useEffect(() => {
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
	}, [items])

	function addToCart(product) {
		setItems((currentItems) => {
			const existingItem = currentItems.find((item) => item.id === product.id)
			if (existingItem) {
				return currentItems.map((item) =>
					item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
				)
			}
			return [...currentItems, { ...product, quantity: 1 }]
		})
	}

	function updateQuantity(productId, change) {
		setItems((currentItems) =>
			currentItems
				.map((item) =>
					item.id === productId ? { ...item, quantity: item.quantity + change } : item,
				)
				.filter((item) => item.quantity > 0),
		)
	}

	function removeFromCart(productId) {
		setItems((currentItems) => currentItems.filter((item) => item.id !== productId))
	}

	const itemCount = items.reduce((total, item) => total + item.quantity, 0)
	const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

	return (
		<CartContext.Provider
			value={{ items, itemCount, subtotal, addToCart, updateQuantity, removeFromCart }}
		>
			{children}
		</CartContext.Provider>
	)
}
