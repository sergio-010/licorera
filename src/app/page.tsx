
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import AddToCartButton from '@/components/AddToCartButton';

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('available', true)
    .gt('stock', 0)
    .order('created_at', { ascending: false });

  return (
    <div className="bg-[var(--color-background)] text-[var(--color-foreground)] min-h-screen py-12 px-4 sm:px-6">
      <header className="text-center mb-10 py-6 sm:py-8 bg-gradient-to-r from-gold to-yellow-500 rounded-lg shadow">
        <h1 className="text-3xl sm:text-4xl font-serif text-black drop-shadow-sm">La Licorera</h1>
        <p className="text-black mt-2 text-base sm:text-lg">
          Elige tus licores favoritos y recibe tu pedido por WhatsApp.
        </p>
      </header>

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-b from-[#2e2e2e] to-[#1c1c1c] rounded-xl shadow-lg border border-gold/40 p-3 sm:p-4 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-full h-32 sm:h-40 relative mb-4">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-contain rounded"
              />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-400">{product.description}</p>
            <p className="mt-2 text-gold font-bold text-lg">
              ${product.price.toLocaleString()}
            </p>
            <AddToCartButton product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
