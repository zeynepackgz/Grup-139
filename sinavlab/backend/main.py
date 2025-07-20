from fastapi import FastAPI

from fastapi import FastAPI

from databse.db_connection import Base,engine
from routers.user_router import router as user_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)

@app.get("/")
def home():
    return {"home endpoint"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
