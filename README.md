Para iniciar um projeto javascript com Node → cria package.json

```jsx
yarn init -y
```

Instalar Express → Trabalhar com Servidor e Rotas / Requests

```jsx
yarn add express
```

Servidor simples

```jsx
const express = require('express');

const app = express();

app.use(express.json()); // PARA PODER RECEBER JSON no BODY de REQUEST

app.get('/', (request, response) => {
  return response.json({
    message: 'Hello !!!!',
  });
});

app.listen(3333, () => {
  console.log('🚀 Backend started! Port: 3333');
});

// emoji = CTRL + COMMAND + SPACE
```

Instalar Nodemon → Monitorar alterações no servidor sem ter que ficar cancelando

```jsx
yarn add nodemon -D
```

Depois cria-se um script no package.json

```jsx
"main": "src/index.js",
"scripts": {
  "dev": "nodemon"
},
```

MÉTODOS HTTP

- GET : Buscar informações do backend
- POST : Criar uma informação no backend
- PUT : Alterar uma informação no backend
- DELETE : Deletar

TIPOS DE PARÂMETROS NA ROTA

- Query Params : Filtros e paginação

  ```jsx
  //localhost:3333/projects?title=React&owner=Beni

  http: const query = request.query;
  const { title, owner } = request.query;
  ```

- Route params : Identificar recursos na hora de atualizar ou deletar

  ```jsx
  //localhost:3333/projects/:id

  http: const params = request.params;
  ```

- Request Body : Conteúdo na hora de criar ou editar um recurso {JSON}

  ```jsx
  const body = request.body;

  //app.use(express.json()) no início
  ```

Usar IDs com biblioteca:

```jsx
yarn add uuidv4
```

MIDDLEWARE

-Interceptador de requisições

Pode interromper totalmente

Pode alterar dados da requisição

```jsx
function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()} ${url}]`;

  console.log(logLabel);

  return next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Project ID' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);
```
