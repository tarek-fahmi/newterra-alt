import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './lib/supabaseClient'
import { DataItem } from './types'

function App() {
  const [data, setData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        // Replace 'your_table_name' with your actual table name
        const { data, error } = await supabase
          .from('your_table_name')
          .select('*')

        if (error) throw error

        setData(data || [])
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app">
      <h1>My Supabase App</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <h2>Data from Supabase:</h2>
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p>No data found</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App