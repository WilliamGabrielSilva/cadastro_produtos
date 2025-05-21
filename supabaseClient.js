
//Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://pgqrjtglzibalkjlkrxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncXJqdGdsemliYWxramxrcnh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2OTQ2NjEsImV4cCI6MjA2MzI3MDY2MX0.0ryT_WIlWOBREOetGVCJBu0hCb2TttkDGXpim4o_-C4'
)