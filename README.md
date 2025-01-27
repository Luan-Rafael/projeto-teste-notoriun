
## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **NestJS**: Framework para desenvolvimento backend em Node.js.
- **Class Validator**: Biblioteca para validação de dados.
- **TypeORM**: Ferramenta para modelagem e execução de queries no banco de dados.
- **Nodemailer**: Ferramenta para envio de emails.
- **PostgreSQL**: Banco de dados relacional.

### Frontend
- **Vue.js**: Framework para construção de interfaces web.
- **PrimeVue**: Biblioteca de componentes prontos para Vue.js.
- **TailwindCSS**: Framework CSS utilitário.
- **Axios**: Biblioteca para requisições HTTP.

### Outros
- **Docker**: Para containerização da aplicação.
- **Docker Compose**: Para orquestração dos serviços.

---

## 🛠️ Configuração do Ambiente

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Arquitetura utilizada

No Backend, foi utilizada a arquitetura modular, utilizando o NestJS, com cada módulo encapsulando suas próprias entidades.
Essa estrutura facilita a manutenção, escalabilidade e reutilização de códigos, promovendo boas práticas de desenvolvimento.

### Passos para Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Luan-Rafael/projeto-teste-notoriun.git
   cd projeto-teste-notoriun
    ```

2. **Instale as dependências**
```bash
npm install
```

3. **Criar arquivo .env para o banco de dados**
```
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=database
```

4.  **Criar arquivo .env na pasta /apps/backend/**
```
EMAIL_USER=
EMAIL_PASSWORD=

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=dbname
```


5. **Subir o banco de dados (Docker)**
```bash
docker-compose up
```

6. **Inicie o backend e frontend**
```bash
npm run dev
```

