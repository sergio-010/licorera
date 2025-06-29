'use client'

import { useCartStore, Product } from '@/store/cart'

interface Props {
  product: Product
}

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <button
      onClick={() => addToCart(product)}
      className="mt-4 bg-gold text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
    >
      Agregar al carrito
    </button>
  )
}
