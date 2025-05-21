
//Importa a função de criação do client Supabase via CDN
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// Cria o client com a URL e a chave fornecidas
export const supabase = createClient(
  'https://pgqrjtglzibalkjlkrxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncXJqdGdsemliYWxramxrcnh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY5NDY2MSwiZXhwIjoyMDYzMjcwNjYxfQ.tlYQRgXgxpQ8YrpaP-1_9vOB547K_ZH23HkEr2g92oI'
)

