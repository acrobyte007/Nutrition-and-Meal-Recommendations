document.getElementById('recommendationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather input values
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const fitnessGoal = document.getElementById('fitnessGoal').value;
    const dietaryPreference = document.getElementById('dietaryPreference').value;

    // Prepare the data to be sent to the API
    const data = {
        Age: age,
        Gender: gender,
        Height: height,
        Weight: weight,
        Fitness_Goal: fitnessGoal,
        Dietary_Preference: dietaryPreference
    };

    // Make a POST request to the API
    fetch('http://127.0.0.1:8000/api/get_recommendations/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Display the results
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (data.recommendations) {
            data.recommendations.forEach(rec => {
                // Wrap the results in a container for two-column display
                resultsDiv.innerHTML += `
                    <div class="row">
                        <div class="column">
                            <h3>Daily Nutrition Information</h3>
                            <table border="1" cellpadding="10" cellspacing="0">
                                <tr>
                                    <td><strong>Daily Calorie Target:</strong></td>
                                    <td>${rec.details['Daily Calorie Target']} kcal</td>
                                </tr>
                                <tr>
                                    <td><strong>Protein:</strong></td>
                                    <td>${rec.details.Protein} g</td>
                                </tr>
                                <tr>
                                    <td><strong>Carbohydrates:</strong></td>
                                    <td>${rec.details.Carbohydrates} g</td>
                                </tr>
                                <tr>
                                    <td><strong>Fat:</strong></td>
                                    <td>${rec.details.Fat} g</td>
                                </tr>
                            </table>
                        </div>
                        
                        <div class="column">
                            <h3>Meal Suggestions</h3>
                            <table border="1" cellpadding="10" cellspacing="0">
                                <tr>
                                    <td><strong>Breakfast:</strong></td>
                                    <td>${rec.details['Breakfast Suggestion']}</td>
                                </tr>
                                <tr>
                                    <td><strong>Lunch:</strong></td>
                                    <td>${rec.details['Lunch Suggestion']}</td>
                                </tr>
                                <tr>
                                    <td><strong>Dinner:</strong></td>
                                    <td>${rec.details['Dinner Suggestion']}</td>
                                </tr>
                                <tr>
                                    <td><strong>Snack:</strong></td>
                                    <td>${rec.details['Snack Suggestion']}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                `;
            });
        } else {
            resultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
