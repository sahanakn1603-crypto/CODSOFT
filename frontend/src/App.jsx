import "./App.css";
import { useState } from "react";

function App() {
  const [movieName, setMovieName] = useState("");
  const [year, setYear] = useState("");
  const [duration, setDuration] = useState(120);
  const [votes, setVotes] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [actor1, setActor1] = useState("");
  const [actor2, setActor2] = useState("");
  const [actor3, setActor3] = useState("");
  const [prediction, setPrediction] = useState(null);

  async function handlePredict() {
  try {
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: Number(year),
        duration: Number(duration),
        votes: Number(votes),
        genre: genre,
        director: director,
        actor1: actor1,
        actor2: actor2,
        actor3: actor3,
      }),
    });
    

    const result = await response.json();

    if (response.ok) {
  setPrediction(result["Predicted Rating"]);
} else {
      alert("Error: " + JSON.stringify(result));
    }
  } catch (error) {
    console.error(error);
    alert("Cannot connect to backend!");
  }
}

  return (
    <div className="app">

      <h1>🎬 Movie Rating Prediction</h1>

      <p className="subtitle">
        Predict the expected movie rating by entering the movie details below.
      </p>

      <div className="form">

        {/* Row 1 */}
        <div className="row">

          

          <div className="input-group">
  <label>Year</label>

  <select
    value={year}
    onChange={(e) => setYear(e.target.value)}
  >
    <option value="">Select Year</option>

    {Array.from({ length: 2026 - 1913 + 1 }, (_, i) => {
      const currentYear = 2026 - i;
      return (
        <option key={currentYear} value={currentYear}>
          {currentYear}
        </option>
      );
    })}
  </select>
</div>

          <div className="input-group">
  <label>Duration</label>

  <div className="slider-box">

    <span>{duration} min</span>

    <input
      type="range"
      min="30"
      max="300"
      step="1"
      value={duration}
      onChange={(e) => setDuration(e.target.value)}
    />

  </div>
</div>

        </div>

        {/* Row 2 */}
        <div className="row">

          <div className="input-group">
            <label>Votes</label>
            <input
              type="number"
              placeholder="Number of votes"
              value={votes}
              onChange={(e) => setVotes(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">Select Genre</option>
              <option>Action</option>
              <option>Adventure</option>
              <option>Comedy</option>
              <option>Crime</option>
              <option>Drama</option>
              <option>Family</option>
              <option>Fantasy</option>
              <option>Horror</option>
              <option>Mystery</option>
              <option>Romance</option>
              <option>Sci-Fi</option>
              <option>Thriller</option>
            </select>
          </div>

          <div className="input-group">
            <label>Director</label>
            
            <input
              type="text"
              placeholder="Director name"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
           
          </div>

        </div>

        {/* Row 3 */}
        <div className="row">

          <div className="input-group">
            <label>Actor 1</label>
            <input
              type="text"
              placeholder="First actor"
              value={actor1}
              onChange={(e) => setActor1(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Actor 2</label>
            <input
              type="text"
              placeholder="Second actor"
              value={actor2}
              onChange={(e) => setActor2(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Actor 3</label>
            <input
              type="text"
              placeholder="Third actor"
              value={actor3}
              onChange={(e) => setActor3(e.target.value)}
            />
          </div>

        </div>

        

<button onClick={handlePredict}>
  Predict Rating
</button>

{prediction && (
  <div className="result-card">
    <h2>Prediction Result</h2>

    <h1>⭐ {prediction.toFixed(1)} / 10</h1>

    <p>
      Predicted IMDb Rating for <strong>{movieName}</strong>
    </p>
  </div>
)}

      </div>

    </div>
  );
}

export default App;