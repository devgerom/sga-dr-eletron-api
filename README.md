# SGA - Dr. Eletron: API de Gestão de Atendimentos

API REST para o sistema de gestão da assistência técnica Dr. Eletron Refrigeração, desenvolvida como projeto da disciplina de Programação para Web II.

**Instituição Parceira:** Dr. Eletron Refrigeração

## 👥 Integrantes e Responsabilidades

*   **Gerónimo Martín Campanello** - CRUD de Categoria
*   **Eliseu Tavares Lima** - CRUD de Cliente
*   **Fernando Silva Macedo** - CRUD de Ordem de Serviço

## 🛠 Tecnologias Utilizadas

*   **Node.js** (versão v24.x)
*   **Express**
*   **Prisma ORM**
*   **SQLite** (Banco de dados para testes)
*   **JWT** (Autenticação)
*   **Bcrypt** (Criptografia de senhas)

## 🚀 Instalação e Execução

1.  Clone o repositório:
    git clone https://github.com/devgerom/sga-dr-eletron-api.git
    cd sga-backend

2.  Instale as dependências:
    npm install

3.  Crie o arquivo .env a partir do exemplo:
    cp .env.example .env
    (Edite o .env se necessário, mas as configurações padrão para SQLite já funcionam).

4.  Rode as migrações do banco de dados:
    npx prisma migrate dev

5.  Inicie o servidor:
    npm run dev
    A API estará rodando em http://localhost:3000.

## 🛣 Rotas da API

A documentação completa das rotas e exemplos de requisição está no arquivo JSON localizado em: docs/test-CRUD-categoria.json.

| Método | Rota | Descrição | Requer Token? |
| :--- | :--- | :--- | :--- |
| POST | /auth/register | Cadastro de usuário | Não |
| POST | /auth/login | Login e geração de JWT | Não |
| POST | /auth/forgot-password | Solicita token de recuperação | Não |
| POST | /auth/reset-password | Redefine a senha com token | Não |
| GET | /perfil | Exemplo de rota protegida | Sim |
| POST | /categorias | Cria uma nova categoria | Sim |
| GET | /categorias | Lista todas as categorias | Sim |
| GET | /categorias/:id | Busca categoria por ID | Sim |
| PUT | /categorias/:id | Atualiza categoria por ID | Sim |
| DELETE | /categorias/:id | Exclui categoria por ID | Sim |

## 🧪 Roteiro de Testes para o Tutor

1.  Importe o arquivo docs/test-CRUD-categoria.json no Insomnia ou Postman.
2.  Execute a rota POST /auth/register para criar um usuário (ex: teste@teste.com / 123456).
3.  Execute a rota POST /auth/login e copie o token retornado.
4.  Nas rotas protegidas, adicione o token no Header Authorization: Bearer <SEU_TOKEN>.
5.  Para testar a recuperação de senha: execute POST /auth/forgot-password com o e-mail cadastrado e verifique o terminal onde a API está rodando para encontrar o token de recuperação.
6.  **Teste do CRUD de Categoria (Gerónimo):** Com o token configurado, execute POST /categorias com o body `{"nome": "Veículo"}`. Em seguida, teste o GET, GET /:id, PUT e DELETE nas rotas de categorias.