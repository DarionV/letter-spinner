import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <nav className="padding-medium">
        <button>Audio</button>
        <button>Settings</button>
      </nav>
      <main>
        <div className="title-container">
          <h1 className="padding-large">Letter spinner</h1>
        </div>
        <div className="letter-container padding-large flex-center">?</div>
        <div className="timer-container flex-center padding-large">00:00</div>
        <div className="controls-container flex-center padding-medium">
          <button>Play</button>
        </div>
      </main>
      <footer>Credits</footer>
    </>
  );
}

export default App;
