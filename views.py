from django.http import JsonResponse
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from django.views.decorators.csrf import csrf_exempt
import json

# Load Data
df = pd.read_csv('myapp/data.csv')  

# Preprocess Data
label_encoders = {}
categorical_columns = ['Gender', 'Fitness Goal', 'Dietary Preference']

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Define feature columns
feature_columns = ['Age', 'Gender', 'Height', 'Weight', 'Fitness Goal', 'Dietary Preference']
X = df[feature_columns].values  # Convert features into numpy array

# Function to perform similarity search
def get_similar_items(user_input, X, top_n=5):
    dietary_preference = user_input[-1]  # Dietary preference from input
    filtered_df = df[df['Dietary Preference'] == dietary_preference]
    filtered_X = filtered_df[feature_columns].values  # Filtered data for similarity search
    
    similarity_scores = cosine_similarity([user_input], filtered_X).flatten()
    similar_indices = np.argsort(similarity_scores)[::-1][:top_n]
    
    return filtered_df.iloc[similar_indices], similarity_scores[similar_indices]

@csrf_exempt
def get_recommendations(request):
    if request.method == 'POST':
        try:
            # Parse user input from the request body
            data = json.loads(request.body)
            age = data['Age']
            gender = data['Gender']
            height = data['Height']
            weight = data['Weight']
            fitness_goal = data['Fitness_Goal']
            dietary_preference = data['Dietary_Preference']
            
            # Encode categorical inputs
            gender_encoded = label_encoders['Gender'].transform([gender])[0]
            fitness_goal_encoded = label_encoders['Fitness Goal'].transform([fitness_goal])[0]
            dietary_preference_encoded = label_encoders['Dietary Preference'].transform([dietary_preference])[0]
            
            # Prepare user input
            user_input = [age, gender_encoded, height, weight, fitness_goal_encoded, dietary_preference_encoded]
            
            # Get similar items
            similar_items, similarity_scores = get_similar_items(user_input, X, top_n=3)
            
            # Prepare the result
            recommendations = []
            for idx, (item, score) in enumerate(zip(similar_items.iterrows(), similarity_scores)):
                recommendations.append({
                   
                    'details': item[1].to_dict(),  # Convert the row to dictionary
                    
                })
            
            return JsonResponse({'recommendations': recommendations}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method. Use POST.'}, status=400)
