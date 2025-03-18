from pydantic import BaseModel
from datetime import datetime

class FuncionarioCreate(BaseModel):
    nome: str
    cargo: str
    salario: float

class FuncionarioResponse(FuncionarioCreate):
    id: int

    class Config:
        orm_mode = True

class PontoCreate(BaseModel):
    funcionario_id: int
    tipo: str  # Entrada ou Saída

class PontoResponse(PontoCreate):
    id: int
    horario: datetime

    class Config:
        orm_mode = True
