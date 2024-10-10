![First](https://github.com/acrobyte007/Nutrition-and-Meal-Recommendations/blob/main/first.PNG)
![Second](https://github.com/acrobyte007/Nutrition-and-Meal-Recommendations/blob/main/second.PNG)
# Nutrition and Meal Recommendations

This is a Django-based web application that provides personalized meal suggestions and daily nutrition information based on user input, including age, gender, height, weight, fitness goals, and dietary preferences.

## Features

- **Personalized Meal Suggestions**: Users receive meal recommendations based on their individual profiles.
- **Daily Nutrition Targets**: The application provides daily targets for calories, protein, carbohydrates, and fats.
- **User-Friendly Interface**: Easy-to-navigate frontend for seamless user experience.

## Technologies Used

- **Backend**: Django (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite (default)
- **API**: Custom Django REST API for processing user input

## Installation

### Prerequisites

- Python 3.x
- Django 4.x
- Git

### Steps

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/acrobyte007/Nutrition-and-Meal-Recommendations
    cd meal-recommendation-app
    ```

2. **Set Up a Virtual Environment**:

    ```bash
    python -m venv env
    source env/bin/activate  # For Windows: `env\Scripts\activate`
    ```

3. **Install Dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Set Up the Database**:

    ```bash
    python manage.py migrate
    ```

5. **Run the Django Development Server**:

    ```bash
    python manage.py runserver
    ```

6. **Access the Application**:

    Open your web browser and navigate to:

    ```
    http://127.0.0.1:8000/
    ```

## Usage

1. **Input Your Details**: Fill out the form with your personal information (age, gender, height, weight, fitness goal, dietary preference).
2. **Submit the Form**: Click the submit button to send your data to the backend.
3. **View Results**: The application will display personalized meal suggestions and daily nutrition information based on your inputs.

## API Endpoint

- **POST** `/api/get_recommendations/`: Submit user input and receive meal and nutrition recommendations.

  **Example Request**:

  ```json
  {
      "Age": 25,
      "Gender": "Male",
      "Height": 180,
      "Weight": 75,
      "Fitness_Goal": "Weight Loss",
      "Dietary_Preference": "Vegetarian"
  }
