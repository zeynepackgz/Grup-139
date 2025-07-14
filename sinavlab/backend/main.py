from fastapi import FastAPI

from fastapi import FastAPI
from sinavlab.backend.databse.db_connection import engine,Base
from sinavlab.backend.routers import user_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router.router)

@app.get("/")
def home():
    return {"home endpoint"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
