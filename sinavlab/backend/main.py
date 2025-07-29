from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from pathlib import Path
import json

app = FastAPI()

@app.get("/")
def home():
    return {"home endpoint"}


# Pydantic modeli — JSON'daki alanlara göre
class BilgiKart(BaseModel):
    id: int
    title: str
    description: str
    
#bilgi kart endpoint
@app.get("/api/bilgi-kartlari", response_model=List[BilgiKart])
def get_bilgi_kartlari():
    dosya_yolu = Path("data/bilgi-kart.json")
    if dosya_yolu.exists():
        with open(dosya_yolu, "r", encoding="utf-8") as f:
            kartlar = json.load(f)
        return kartlar
    else:
        return []


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

