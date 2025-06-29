'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { uploadProductImage } from '@/lib/uploadImage';

export default function CreateProductPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        available: true,
        image_url: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? target.checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        let imageUrl = form.image_url;

        if (imageFile) {
            const uploaded = await uploadProductImage(imageFile);
            if (!uploaded) {
                alert('Error subiendo imagen');
                setUploading(false);
                return;
            }
            imageUrl = uploaded;
        }

        const { error } = await supabase.from('products').insert({
            name: form.name,
            description: form.description,
            price: Number(form.price),
            stock: Number(form.stock),
            image_url: imageUrl,
            available: form.available,
        });

        setUploading(false);

        if (error) {
            alert('Error al crear producto');
            console.error(error);
        } else {
            router.push('/admin');
        }
    };

    return (
        <main className="max-w-xl mx-auto mt-10 text-white bg-gradient-to-b from-[#1c1c1c] to-black p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Agregar Producto</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#2e2e2e] p-6 rounded-lg border border-gold shadow-lg">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="p-2 rounded bg-black text-white border border-gray-600"
                />
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="p-2 rounded bg-black text-white border border-gray-600"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="p-2 rounded bg-black text-white border border-gray-600"
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    className="p-2 rounded bg-black text-white border border-gray-600"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                    className="text-sm text-gray-300"
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder="URL de la imagen"
                    value={form.image_url}
                    onChange={handleChange}
                    className="p-2 rounded bg-black text-white border border-gray-600"
                />
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="available"
                        checked={form.available}
                        onChange={handleChange}
                    />
                    Disponible
                </label>
                <button
                    type="submit"
                    disabled={uploading}
                    className="bg-gold text-black font-semibold py-2 rounded-md shadow hover:bg-yellow-400 transition"
                >
                    {uploading ? 'Guardando...' : 'Guardar producto'}
                </button>
            </form>
        </main>
    );
}
