'use client'

import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const message = `Hola, quiero hacer este pedido:\n${items
    .map((i) => `- ${i.name} x${i.quantity}`)
    .join('\n')}\nTotal: $${total.toLocaleString()}`

  return (
    <main className="p-6 text-white bg-gradient-to-b from-[#1c1c1c] to-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-[#2e2e2e] p-4 rounded-lg border border-gold shadow hover:shadow-lg transition"
            >
              <div className="relative w-full h-32 sm:w-16 sm:h-16">
                <Image src={item.image_url} alt={item.name} fill className="object-contain rounded" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-bold text-gold">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <p className="text-right font-bold text-xl">Total: ${total.toLocaleString()}</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(message)}`}
            className="block w-full text-center bg-gold text-black text-lg py-2 rounded-md font-medium border border-black/20 shadow-lg hover:bg-yellow-400 transition"
            onClick={clearCart}
          >
            Enviar pedido por WhatsApp
          </a>
        </div>
      )}
      <Link href="/" className="block mt-6 text-gray-300 hover:text-gold">Seguir comprando</Link>
    </main>
  )
}
