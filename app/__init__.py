from .database import Base, engine, SessionLocal
from .models import Funcionario, Ponto
from app.database import Base

# Criar tabelas automaticamente (se necessário)
Base.metadata.create_all(bind=engine)
