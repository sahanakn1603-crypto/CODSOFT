Movie_Rating_project
Implementation Steps:
1. **Import Libraries**
   - Imported required Python libraries such as pandas, numpy, matplotlib, seaborn, and scikit-learn.

2. **Load Dataset**
   - Loaded the movie dataset using pandas.
   - The dataset contains information like movie name, genre, votes, and ratings.

3. **Data Understanding**
   - Displayed first few rows using `head()`.
   - Checked dataset structure using `shape()` and `info()`.

4. **Data Cleaning**
   - Handled missing values (removed or filled missing data).
   - Removed unnecessary columns if present.
   - Ensured correct data types for numerical and categorical columns.

5. **Data Preprocessing**
   - Converted categorical columns (like genre, director, etc.) into numerical format using encoding techniques.

6. **Feature Selection**
   - Selected important features such as:
     - Genre
     - Votes
     - Budget (if available)
     - Other relevant attributes
   - Target variable:
     - Movie Rating

7. **Train-Test Split**
   - Split the dataset into training and testing sets using `train_test_split`.

8. **Model Training**
   - Applied Machine Learning algorithm (Linear Regression / Random Forest / etc.) to train the model.

9. **Prediction**
   - Used the trained model to predict movie ratings based on input features.

10. **Model Evaluation**
    - Evaluated model performance using metrics such as:
      - Mean Absolute Error (MAE)
      - Mean Squared Error (MSE)
      - R² Score

11. **Visualization**
    - Plotted graphs to understand relationships:
      - Ratings vs Votes
      - Genre distribution
      - Correlation heatmap

12. **Manual Testing**
    - Provided custom inputs (like movie year, time, genre, votes, etc.)
    - Model predicts the expected movie rating.
