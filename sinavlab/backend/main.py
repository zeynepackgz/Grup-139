from fastapi import FastAPI

from fastapi import FastAPI

from databse.db_connection import Base,engine
from routers.user_router import router as user_router
from routers.class_router import router as class_router
from routers.teachers import router as teachers

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(user_router)
app.include_router(class_router)
app.include_router(teachers)

@app.get("/")
def home():
    return {"home endpoint"}



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
