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
      className="mt-4 w-full bg-gold text-black text-lg px-4 py-2 rounded-md font-medium border border-black/20 shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold"
    >
      Agregar al carrito
    </button>
  )
}
