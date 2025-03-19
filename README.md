# RH Management

## 📌 Descrição
O **RH Management** é um sistema de gestão de recursos humanos projetado para facilitar o controle de funcionários, cargos e departamentos dentro de uma empresa. O sistema inclui funcionalidades como cadastro, edição e remoção de funcionários, alocação de cargos e gestão de departamentos.

Este projeto foi desenvolvido com um back-end em **FastAPI** e um front-end responsivo utilizando **HTML, CSS e JavaScript**.

## 🏗️ Arquitetura do Projeto
O projeto segue uma estrutura modular organizada:

```
RH-Management/
├── backend/         # Código do servidor FastAPI
│   ├── models/      # Modelos do banco de dados
│   ├── routes/      # Rotas e endpoints da API
│   ├── database.py  # Configuração do banco de dados
│   ├── main.py      # Ponto de entrada da API
│   ├── ...
├── frontend/        # Interface do usuário
│   ├── index.html   # Página principal
│   ├── styles.css   # Estilos visuais
│   ├── script.js    # Lógica interativa do front-end
│   ├── ...
├── README.md        # Documentação do projeto
├── requirements.txt # Dependências do projeto
├── .env             # Variáveis de ambiente
└── ...
```

## 🚀 Tecnologias Utilizadas
- **Back-end:** Python, FastAPI, SQLAlchemy, MySQL
- **Front-end:** HTML, CSS, JavaScript
- **Banco de Dados:** MySQL
- **Ferramentas:** DBeaver, Postman, Git/GitHub

## 🔧 Instalação e Configuração

### 1️⃣ Clonar o Repositório
```sh
git clone https://github.com/EnzoGui18/rh-management.git
cd rh-management
```

### 2️⃣ Criar e Ativar um Ambiente Virtual
```sh
python -m venv venv
# Ativar ambiente virtual
# No Windows:
venv\Scripts\activate
# No Linux/Mac:
source venv/bin/activate
```

### 3️⃣ Instalar Dependências
```sh
pip install -r requirements.txt
```

### 4️⃣ Configurar o Banco de Dados
No arquivo `.env`, defina as credenciais do MySQL:
```env
DB_URL=mysql+mysqlconnector://usuario:senha@localhost/rh_db
```
Crie o banco de dados:
```sql
CREATE DATABASE rh_db;
```

### 5️⃣ Rodar a API
```sh
uvicorn backend.main:app --reload
```
A API será acessível em `http://127.0.0.1:8000/docs`.

### 6️⃣ Rodar o Front-end
Abra o arquivo `frontend/index.html` no navegador.

## 📌 Funcionalidades
✅ Cadastro, edição e remoção de funcionários
✅ Gerenciamento de cargos e departamentos
✅ API documentada com Swagger
✅ Interface responsiva
✅ Integração entre back-end e front-end

## 📈 Melhorias Futuras
🔹 Autenticação de usuários
🔹 Relatórios dinâmicos
🔹 Dashboard interativo
🔹 Melhorias na interface

## 🤝 Contribuição
Contribuições são bem-vindas! Siga os passos:
1. Faça um **fork** do repositório
2. Crie um **branch** para sua melhoria: `git checkout -b minha-melhoria`
3. Faça um **commit** das suas mudanças: `git commit -m 'Adicionando nova funcionalidade'`
4. Faça um **push** para o branch: `git push origin minha-melhoria`
5. Abra um **Pull Request**

## 📄 Licença
Este projeto está sob a licença MIT. Sinta-se à vontade para usar e modificar!

---
💡 **Desenvolvido por [EnzoGui18](https://github.com/EnzoGui18)**

