from fastapi import FastAPI
from pathlib import Path
import json

app = FastAPI()

@app.get("/")
def home():
    return {"home endpoint"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)

