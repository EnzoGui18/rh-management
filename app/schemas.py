from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class FuncionarioCreate(BaseModel):
    nome: str
    cargo: str
    salario: float

class FuncionarioResponse(BaseModel):
    id: int
    nome: str
    cargo: str
    salario: float

    class Config:
        from_attributes = True  # Substituindo orm_mode que está deprecado
        # Manter orm_mode para compatibilidade com versões mais antigas do Pydantic
        orm_mode = True  

class PontoCreate(BaseModel):
    funcionario_id: int
    tipo: str  # Entrada ou Saída

class PontoResponse(BaseModel):
    id: int
    funcionario_id: int
    horario: datetime
    tipo: str

    class Config:
        from_attributes = True  # Substituindo orm_mode que está deprecado
        # Manter orm_mode para compatibilidade com versões mais antigas do Pydantic
        orm_mode = True