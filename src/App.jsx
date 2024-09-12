import "./App.css";

function App() {
  return (
    <>
      <nav>
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="header-container">
          <h1>Letter spinner</h1>
        </div>
        <div className="letter-container">?</div>
        <div className="timer-container">00:00</div>
        <div className="controls-container">Play</div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;
