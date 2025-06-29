import { supabase } from './supabase'

export const uploadProductImage = async (file: File): Promise<string | null> => {
  const fileName = `product-${Date.now()}`
  const { error } = await supabase.storage.from('licorera').upload(fileName, file)
  if (error) {
    console.error('Error al subir imagen:', error)
    return null
  }
  const { data: publicUrlData } = supabase.storage.from('licorera').getPublicUrl(fileName)
  return publicUrlData?.publicUrl ?? null
}
