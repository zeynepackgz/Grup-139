from flask import Flask, request, jsonify
import pandas as pd
from analysis_models import PerformanceAnalyzer # Bu satırı ekleyin veya yorumdan çıkarın

app = Flask(__name__)

# PerformanceAnalyzer sınıfının bir örneğini oluştur
analyzer = PerformanceAnalyzer()

# Model eğitimi için basit bir başlangıç verisi veya yükleme mantığı
# Genellikle bu adımda, önceden eğitilmiş bir modeli yüklersiniz veya
# çok daha büyük bir veri seti üzerinde modeli eğitirsiniz.
# Şimdilik, mock_exam_results'ı kullanarak basit bir eğitim yapalım:
import json
with open('mock_exam_results.json', 'r') as f:
    mock_data_for_training = json.load(f).get('results')
if mock_data_for_training:
    analyzer.train_model(pd.DataFrame(mock_data_for_training))


# Basit bir test endpoint'i (isteğe bağlı, API'nin çalışıp çalışmadığını görmek için)
@app.route('/', methods=['GET'])
def home():
    return "Yapay Zeka Performans Analizi Modülü Çalışıyor!"

# Bu kısım çok önemli: 'analyze_performance' rotası ve 'POST' metodu
@app.route('/analyze_performance', methods=['POST'])
def analyze_performance():
    try:
        data = request.get_json()
        exam_results = data.get('results')

        if not exam_results:
            return jsonify({"error": "exam_results verisi eksik veya boş!"}), 400

        # Analizi PerformanceAnalyzer sınıfı ile yap
        analysis_output = analyzer.analyze_results(exam_results)

        # Modelden tahmin almak isterseniz:
        # predictions = analyzer.predict_performance(pd.DataFrame(exam_results))
        # analysis_output["model_predictions"] = predictions.tolist()


        return jsonify(analysis_output), 200

    except Exception as e:
        print(f"Hata oluştu: {e}") 
        return jsonify({"error": f"Bir hata oluştu: {str(e)}", "detail": "Veri formatını veya işlem hatasını kontrol edin."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)