import { useState, useEffect } from 'react'

function DataDisplay() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentGreeting, setCurrentGreeting] = useState('Hello World!')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8787/api/data')
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const changeMessage = () => {
    if (!data?.greetings) return;
    const greetings = Object.keys(data.greetings);
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    setCurrentGreeting(randomGreeting);
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data || !data.greetings) return <div>No data available</div>

  return (
    <div className="container">
      <h1 id="greeting">{currentGreeting}</h1>
      <button onClick={changeMessage}>Click me!</button>
      <h5>Countries Where This Greeting Is Used:</h5>
      <ul className="countries-list">
        {data.greetings[currentGreeting]?.map((country, index) => (
          <li key={index}>{country.name}</li>
        ))}
      </ul>

      <style jsx>{`
                .container {
                    text-align: center;
                    padding: 2rem;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                h1 {
                    color: #333;
                    margin-bottom: 1rem;
                }

                button {
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #f6821f;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #e67e22;
                }

                #data-container {
                    margin-top: 20px;
                    padding: 15px;
                    background-color: #f5f5f5;
                    border-radius: 5px;
                }

                #data-container ul {
                    list-style-type: none;
                    padding: 0;
                }

                #data-container li {
                    padding: 8px;
                    margin: 5px 0;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                }

                .countries-list {
                    list-style: none;
                    padding: 0;
                    margin: 10px 0;
                }

                .countries-list li {
                    padding: 5px 0;
                    border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  )
}

export default DataDisplay