import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Dashboard() {
  const router = useRouter()
  const { role } = router.query
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  if (!user) {
    return <p className="p-6 text-gray-600">Loading...</p>
  }

  return (
    <div className="p-6 font-sans min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 capitalize">{role} Dashboard</h1>
        <p className="mb-4">Welcome, {user.email}</p>

        {role === 'admin' && (
          <div className="grid grid-cols-2 gap-4">
            <Card title="Students" />
            <Card title="Teachers" />
            <Card title="Classes" />
            <Card title="Billing Overview" />
            <Card title="Library Inventory" />
          </div>
        )}

        {role === 'teacher' && (
          <div className="grid grid-cols-2 gap-4">
            <Card title="My Classes" />
            <Card title="Assigned Students" />
            <Card title="Library" />
          </div>
        )}

        {role === 'student' && (
          <div className="grid grid-cols-2 gap-4">
            <Card title="My Schedule" />
            <Card title="Library Borrowed Items" />
            <Card title="My Billing" />
          </div>
        )}
      </div>
    </div>
  )
}


function Card({ title }: { title: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let table = '';
    switch (title.toLowerCase()) {
      case 'students': table = 'students'; break;
      case 'teachers': table = 'teachers'; break;
      case 'classes': table = 'classes'; break;
      case 'library inventory': table = 'library_items'; break;
      case 'billing overview': table = 'billing'; break;
      default: return;
    }

    import('../../utils/fetchData').then(({ countTableRows }) => {
      countTableRows(table).then(setCount).catch(console.error);
    });
  }, [title]);


  return (
    <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
      <h2 className="font-semibold">{title}</h2>
      {count !== null ? <p className="text-sm text-gray-500">Total: {count}</p> : <p className="text-sm text-gray-400">Loading...</p>}
    </div>
  )
}