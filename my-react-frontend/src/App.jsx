import DataDisplay from './components/DataDisplay'

function App() {
  return (
    <>
      <div className="app">
        <DataDisplay />
      </div>

      <style jsx global>{`
        /* Reset margin and padding for html and body to avoid spaces */
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%; /* Ensures body covers the full screen height */
        }

        /* Ensures the app component fills the entire viewport */
        .app {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh; /* Fill the viewport height */
        }
      `}</style>
    </>
  );
}

export default App;
