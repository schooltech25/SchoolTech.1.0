import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('billing')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data) setData(data)
        setLoading(false)
      })
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Billing</h1>
      {loading ? <p>Loading...</p> : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>{data[0] && Object.keys(data[0]).map(k => <th key={k} style={{ border: '1px solid #ccc', padding: '4px' }}>{k}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((v, i) => <td key={i} style={{ border: '1px solid #ccc', padding: '4px' }}>{v?.toString()}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}