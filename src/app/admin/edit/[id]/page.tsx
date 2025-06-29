'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { uploadProductImage } from '@/lib/uploadImage'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.id as string
  const [loading, setLoading] = useState(true)
  interface FormState {
    name: string
    description: string
    price: string
    stock: string
    available: boolean
  }

  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    price: '',
    stock: '',
    available: true,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', productId).single()
      if (data) {
        setForm({
          name: data.name,
          description: data.description,
          price: String(data.price),
          stock: String(data.stock),
          available: data.available,
        })
      }
      setLoading(false)
    }
    fetchProduct()
  }, [productId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? target.checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

  let imageUrl = ''
  if (imageFile) {
    const uploaded = await uploadProductImage(imageFile)
    if (!uploaded) {
      alert('Error subiendo imagen')
      return
    }
    imageUrl = uploaded
  }

    const { error } = await supabase
      .from('products')
      .update({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        available: form.available,
        ...(imageUrl ? { image_url: imageUrl } : {}),
      })
      .eq('id', productId)

    if (error) {
      alert('Error actualizando producto')
      console.error(error)
    } else {
      router.push('/admin')
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase.from('products').delete().eq('id', productId)
    if (!error) router.push('/admin')
  }

  if (loading) return <p className="text-white p-4">Cargando...</p>

  return (
    <main className="max-w-xl mx-auto mt-10 text-white bg-gradient-to-b from-[#1c1c1c] to-black p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>
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
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} className="text-sm text-gray-300" />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Disponible
        </label>
          <button type="submit" className="bg-gold text-black font-semibold py-2 rounded-md shadow hover:bg-yellow-400 transition">
            Guardar cambios
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-600 text-white py-2 rounded-md shadow hover:bg-red-700 transition">
            Eliminar producto
          </button>
      </form>
    </main>
  )
}
