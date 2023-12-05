const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'your-supabase-url'
const SUPABASE_ANON_KEY = 'your-anon-key'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function writeData() {
  const { data, error } = await supabase
    .from('your-table')
    .insert([
      { column1: 'value1', column2: 'value2' },
    ])

  if (error) console.log('Error:', error)
  else console.log('Inserted data:', data)
}

writeData()