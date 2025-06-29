
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdminPage() {
    const { data: products } = await supabase.from('products').select('*');

    return (
        <main className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
            <Link
                href="/admin/new"
                className="inline-block mb-6 bg-gold text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
                + Agregar producto
            </Link>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-[#2e2e2e] border border-gold rounded-lg">
                    <thead>
                        <tr>
                            <th className="p-2 text-left border-b border-gold">Nombre</th>
                            <th className="p-2 text-left border-b border-gold">Precio</th>
                            <th className="p-2 text-left border-b border-gold">Stock</th>
                            <th className="p-2 text-left border-b border-gold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id}>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">${product.price.toLocaleString()}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">
                                    <Link
                                        href={`/admin/edit/${product.id}`}
                                        className="text-blue-400 hover:underline"
                                    >
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
