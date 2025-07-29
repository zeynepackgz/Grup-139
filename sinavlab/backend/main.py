from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

@app.get("/")
def home():
    return {"home endpoint"}

# Yeni: Bilgi kartları endpoint’i
@app.get("/api/bilgi-kartlari")
def get_bilgi_kartlari():
    dosya_yolu = Path("data/bilgi_kartlari.json")
    if dosya_yolu.exists():
        with open(dosya_yolu, "r", encoding="utf-8") as f:
            kartlar = json.load(f)
        return {"data": kartlar}
    else:
        return {"data": [], "message": "Bilgi kartı dosyası bulunamadı"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

