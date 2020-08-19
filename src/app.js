const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid Project ID' });
  }

  return next();
}

app.use('/repositories/:id', validateProjectId);

app.get('/repositories', (request, response) => {
  return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.status(200).json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  let likes = 0;

  const repositotyIndex = repositories.findIndex((repo, index) => {
    if (repo.id === id) {
      likes = repo.likes;
      return index;
    }
  });

  if (repositotyIndex.length < 0) {
    return response.status(400).json({ error: 'Repository ID not valid' });
  }

  const updatedRepository = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositotyIndex] = updatedRepository;

  return response.status(200).json(updatedRepository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex.length < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex.length < 0) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = repositories.find((repo) => repo.id === id);

  const updatedRepository = {
    ...repository,
    likes: repository.likes + 1,
  };

  repositories[repositoryIndex] = updatedRepository;

  return response.status(200).json(updatedRepository);
});

module.exports = app;
