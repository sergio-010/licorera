import { supabase } from './supabase'

export const uploadProductImage = async (file: File): Promise<string | null> => {
  const extension = file.name.split('.').pop() ?? ''
  const fileName = `product-${Date.now()}${extension ? `.${extension}` : ''}`
  const { error } = await supabase.storage
    .from('licorera')
    .upload(fileName, file, { upsert: true })

  if (error) {
    console.error('Error al subir imagen:', error.message)
    return null
  }

  const { data: publicUrlData } = supabase.storage.from('licorera').getPublicUrl(fileName)
  return publicUrlData?.publicUrl ?? null
}
