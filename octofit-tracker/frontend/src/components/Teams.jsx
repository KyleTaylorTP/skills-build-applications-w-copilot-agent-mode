import { useEffect, useState } from 'react'

const resourcePath = 'teams'
const title = 'Teams'

function normalizeItems(data) {
  if (!data) return []
  if (Array.isArray(data)) return data
  if (Array.isArray(data.items)) return data.items
  if (Array.isArray(data.results)) return data.results
  if (Array.isArray(data.data)) return data.data
  return []
}

function Teams({ apiBase }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const base = apiBase ?? (import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api` : 'http://localhost:8000/api')
        const response = await fetch(`${base}/${resourcePath}/`)
        if (!response.ok) {
          throw new Error(`Failed to load ${title}: ${response.status} ${response.statusText}`)
        }

        const result = await response.json()
        if (!active) return

        setItems(normalizeItems(result))
      } catch (caught) {
        if (!active) return
        setError(caught instanceof Error ? caught.message : String(caught))
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [apiBase])

  return (
    <section>
      <h2>{title}</h2>
      {loading && <p>Loading {title}...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && items.length === 0 && <p>No teams found.</p>}
      {items.length > 0 && (
        <div className="list-group">
          {items.map((item, index) => (
            <div key={item._id ?? item.id ?? index} className="list-group-item">
              <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
