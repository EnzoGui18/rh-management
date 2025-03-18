from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .routes import router

app = FastAPI(title="Sistema de RH")

# Configuração de CORS para permitir acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, defina apenas origens específicas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar os arquivos estáticos
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Incluir rotas da API
app.include_router(router)

@app.get("/")
async def home():
    # Você pode manter isso ou redirecionar para o index.html
    return {"mensagem": "Bem-vindo ao sistema de RH"}