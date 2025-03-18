from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from .database import get_db
from .models import Funcionario, Ponto
from .schemas import FuncionarioCreate, FuncionarioResponse, PontoCreate, PontoResponse
import os

router = APIRouter()

# Configurar templates (opcional, se quiser usar Jinja2)
templates = Jinja2Templates(directory="app/static")

# Rota para servir o frontend
@router.get("/", response_class=HTMLResponse)
async def get_frontend(request: Request):
    # Verifique se o arquivo index.html existe
    if os.path.exists("app/static/index.html"):
        with open("app/static/index.html", "r", encoding="utf-8") as file:
            html_content = file.read()
        return HTMLResponse(content=html_content)
    else:
        # Caso o arquivo não exista, retorne uma mensagem de erro
        return HTMLResponse(content="<html><body><h1>Página não encontrada</h1></body></html>")

# Restante de suas rotas API
@router.post("/funcionarios/", response_model=FuncionarioResponse)
def criar_funcionario(func: FuncionarioCreate, db: Session = Depends(get_db)):
    novo_funcionario = Funcionario(**func.dict())
    db.add(novo_funcionario)
    db.commit()
    db.refresh(novo_funcionario)
    return novo_funcionario

@router.get("/funcionarios/", response_model=list[FuncionarioResponse])
def listar_funcionarios(db: Session = Depends(get_db)):
    return db.query(Funcionario).all()

@router.get("/funcionarios/{funcionario_id}", response_model=FuncionarioResponse)
def obter_funcionario(funcionario_id: int, db: Session = Depends(get_db)):
    funcionario = db.query(Funcionario).filter(Funcionario.id == funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado")
    return funcionario

@router.delete("/funcionarios/{funcionario_id}", response_model=FuncionarioResponse)
def deletar_funcionario(funcionario_id: int, db: Session = Depends(get_db)):
    funcionario = db.query(Funcionario).filter(Funcionario.id == funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado")
    db.delete(funcionario)
    db.commit()
    return funcionario

@router.post("/ponto/", response_model=PontoResponse)
def registrar_ponto(ponto: PontoCreate, db: Session = Depends(get_db)):
    funcionario = db.query(Funcionario).filter(Funcionario.id == ponto.funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado")
    novo_ponto = Ponto(**ponto.dict())
    db.add(novo_ponto)
    db.commit()
    db.refresh(novo_ponto)
    return novo_ponto

@router.get("/ponto/{funcionario_id}", response_model=list[PontoResponse])
def listar_pontos(funcionario_id: int, db: Session = Depends(get_db)):
    funcionario = db.query(Funcionario).filter(Funcionario.id == funcionario_id).first()
    if not funcionario:
        raise HTTPException(status_code=404, detail="Funcionário não encontrado")
    return db.query(Ponto).filter(Ponto.funcionario_id == funcionario_id).all()