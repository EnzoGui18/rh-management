from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base



class Funcionario(Base):
    __tablename__ = "funcionarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    cargo = Column(String(50), nullable=False)
    salario = Column(Float, nullable=False)
    pontos = relationship("Ponto", back_populates="funcionario", cascade="all, delete")

class Ponto(Base):
    __tablename__ = "pontos"
    
    id = Column(Integer, primary_key=True, index=True)
    funcionario_id = Column(Integer, ForeignKey("funcionarios.id"), nullable=False)
    horario = Column(DateTime, default=datetime.utcnow)
    tipo = Column(String(10), nullable=False)  # Entrada ou Saída
    funcionario = relationship("Funcionario", back_populates="pontos")
