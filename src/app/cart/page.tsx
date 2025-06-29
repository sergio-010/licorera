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
    <main className="p-6 text-white bg-[#1c1c1c] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-[#2e2e2e] p-4 rounded-lg border border-gold">
              <div className="relative w-16 h-16">
                <Image src={item.image_url} alt={item.name} fill className="object-contain rounded" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-400">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-bold text-gold">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <p className="text-right font-bold text-xl">Total: ${total.toLocaleString()}</p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(message)}`}
            className="block text-center bg-gold text-black py-2 rounded hover:bg-yellow-400 transition"
            onClick={clearCart}
          >
            Enviar pedido por WhatsApp
          </a>
        </div>
      )}
      <Link href="/" className="block mt-6 underline text-gray-300">Seguir comprando</Link>
    </main>
  )
}
