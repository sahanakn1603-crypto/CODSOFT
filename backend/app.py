from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
model = joblib.load("model.pkl")

feature_columns = joblib.load("feature_columns.pkl")
director_encoder = joblib.load("director_encoder.pkl")
actor1_encoder = joblib.load("actor1_encoder.pkl")
actor2_encoder = joblib.load("actor2_encoder.pkl")
actor3_encoder = joblib.load("actor3_encoder.pkl")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model

# Create the request model
class MovieInput(BaseModel):
    year: int
    duration: int
    votes: int
    genre: str
    director: str
    actor1: str
    actor2: str
    actor3: str

# Home API
@app.get("/")
def home():
    return {"message": "Movie Rating Prediction Backend is Running!"}
@app.post("/predict")
def predict(data: MovieInput):

    # Create input with all training columns
    input_data = pd.DataFrame(columns=feature_columns)
    input_data.loc[0] = 0

    # Numeric features
    input_data["Year"] = data.year
    input_data["Duration"] = data.duration
    input_data["Votes"] = data.votes

    # Label Encode
    director = data.director
    actor1 = data.actor1
    actor2 = data.actor2
    actor3 = data.actor3

    input_data["Director"] = director_encoder.transform([director])[0]
    input_data["Actor 1"] = actor1_encoder.transform([actor1])[0]
    input_data["Actor 2"] = actor2_encoder.transform([actor2])[0]
    input_data["Actor 3"] = actor3_encoder.transform([actor3])[0]
    # One-Hot Encode Genre
    genre_column = "Genre_" + data.genre.lower().strip()

    if genre_column in input_data.columns:
      input_data[genre_column] = 1

    # Predict
    prediction = model.predict(input_data)

    return{
        "Predicted Rating": float(prediction[0])
}