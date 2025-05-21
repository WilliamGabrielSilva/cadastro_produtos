
//Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://uxwjdjfqhziymxlcwcrc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4d2pkamZxaHppeW14bGN3Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MzU1MjgsImV4cCI6MjA2MjExMTUyOH0.1BgZsOjt4Iz9jbF5D5K1bGX8f9mVn9heWVNLb1oFZHk'
)