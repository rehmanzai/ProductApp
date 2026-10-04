export const BOUQUET_PRODUCT_ID = 2001

export const BOUQUET_PRODUCT = {
	id: BOUQUET_PRODUCT_ID,
	title: 'Ribbon Rose Bouquet',
	brand: 'Petal & Ribbon',
	category: 'flowers',
	price: 89.99,
	description: 'A hand-tied bouquet of rich red roses, wrapped in clear floral paper and finished with a flowing satin ribbon. A thoughtful gift for anniversaries, celebrations, or simply brightening someone’s day.',
}

export const FEATURED_PRODUCT_IDS = [1, 7, 46, 78, 90, 94, 172]

export function getProductImage(product) {
	if (product.id === BOUQUET_PRODUCT_ID) {
		return '/products/product-2001.png'
	}

	if (FEATURED_PRODUCT_IDS.includes(product.id)) {
		return `/products/product-${product.id}.png`
	}

	return product.thumbnail ?? product.images?.[0] ?? ''
}