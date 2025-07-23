import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import numpy as np # NumPy ekledik

class PerformanceAnalyzer:
    def __init__(self):
        self.model = None
        self.le = None # LabelEncoder için
        self.features = ['zorluk_kolay', 'zorluk_orta', 'zorluk_zor', 'konu_fen-fizik', 'konu_matematik-cebir', 'konu_matematik-geometri', 'konu_turkce-dilbilgisi']
        self.target = 'cevap_dogru_mu'

    def train_model(self, df):
        # One-hot encoding for categorical features
        df_encoded = pd.get_dummies(df, columns=['konu', 'zorluk'], drop_first=False)

        # Ensure all expected feature columns are present, fill missing with 0
        for col in self.features:
            if col not in df_encoded.columns:
                df_encoded[col] = 0

        # Select only the features we are interested in for training
        X = df_encoded[self.features]
        y = df_encoded[self.target]

        # Convert boolean target to int (0 or 1) if not already
        y = y.astype(int)

        # Split data for training (optional for this simple case, but good practice)
        # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Train a simple Decision Tree Classifier
        self.model = DecisionTreeClassifier(random_state=42)
        self.model.fit(X, y)
        print("Model trained successfully.")

    def predict_performance(self, df):
        # Apply the same encoding as used during training
        df_encoded = pd.get_dummies(df, columns=['konu', 'zorluk'], drop_first=False)

        # Ensure all expected features are present, fill missing with 0
        for col in self.features:
            if col not in df_encoded.columns:
                df_encoded[col] = 0

        # Predict only for existing data or new data structured similarly
        X_predict = df_encoded[self.features]

        if self.model:
            predictions = self.model.predict(X_predict)
            return predictions
        else:
            raise Exception("Model not trained. Please train the model first.")

    def analyze_results(self, exam_results):
        df = pd.DataFrame(exam_results)

        # Ensure 'cevap_dogru_mu' is boolean and handle potential missing values for analysis
        if 'cevap_dogru_mu' in df.columns:
            df['cevap_dogru_mu'] = df['cevap_dogru_mu'].astype(bool)
        else:
            # If 'cevap_dogru_mu' is missing, we can't do accuracy analysis
            return {"error": "Missing 'cevap_dogru_mu' in results for analysis.", "weak_topics": [], "suggestions": []}


        # --- Yanlış Soru Analizi ve Zayıf Konu Tespiti (Mevcut mantık) ---
        wrong_answers = df[df['cevap_dogru_mu'] == False]
        weak_topics = []
        if not wrong_answers.empty:
            weak_topics = wrong_answers['konu'].unique().tolist()

        suggestions = []
        if not weak_topics:
            suggestions.append("Harika! Henüz belirgin bir zayıf konunuz yok. Genel tekrar yapabilirsiniz.")
        else:
            for topic in weak_topics:
                suggestions.append(f"{topic} konusunda ek çalışma yapmanız faydalı olacaktır.")
                if topic == "matematik-geometri":
                    suggestions.append("Geometri formüllerini tekrar gözden geçirin.")
                elif topic == "turkce-dilbilgisi":
                    suggestions.append("Dilbilgisi kurallarına ve yazım/noktalama işaretlerine odaklanın.")

   
        return {
            "weak_topics": weak_topics,
            "suggestions": suggestions,
            "wrong_answer_count": len(wrong_answers)
        }
