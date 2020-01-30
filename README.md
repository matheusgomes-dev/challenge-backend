Exemplo de API desenvolvida utilizando as tecnologias Node Js + Express Js + Mongoose + Jest **que demonstra entre outras coisas como realizar testes automatizados com Jest e um banco de dados em memória.**

# Dependências
O que você precisa para executar esse projeto:
- Node Js  

(MongoDb não é necessário, pois ele será executado em memória, através do pacote ````mongodb-memory-server````)

# Execução
### 1. Instalar dependências
````yarn install````
### 2. Executar os testes
````yarn test````
### 3. Executar a API
````yarn start````

# Ambiente Real
**Heroku:** é um PaaS (Platform as a service), ou seja, plataforma como serviço. Isso significa que você pode fazer deploy de suas aplicações sem se preocupar com configurações de hardware e sistema operacional, pois o Heroku já possui configurações estabelecidas e suporta várias linguagens de programação, variáveis ambiente, deploy integrado com Github, CLI.

Este projeto está hospedado no Heroku com a seguinte url base: https://challengebossa-backend.herokuapp.com/

# Documentação
A documentação deste projeto foi realizada utilizando o pacote ````swagger-ui-express````.
Para visualizá-la você pode acessar:
- Ambiente local: ````http://localhost:3333/api-docs````
- Ambiente real: ````https://challengebossa-backend.herokuapp.com/api-docs````

# Ferramentas
Principais ferramentas utilizadas no projeto:
- [x] Node Js
- [x] Mongoose
- [x] Express
- [x] JWT
- [x] Swagger
- [x] Jest
- [x] Faker
