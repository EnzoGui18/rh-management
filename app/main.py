from fastapi import FastAPI
from .routes import router

app = FastAPI(title="Sistema de RH")

app.include_router(router)

@app.get("/")
def home():
    return {"mensagem": "Bem-vindo ao sistema de RH"}
