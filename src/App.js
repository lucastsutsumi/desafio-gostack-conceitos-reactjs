import React, { useState } from "react";
import api from './services/api'

import "./styles.css";
import { useEffect } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository, created:${Date.now()}`,
      url: 'http://github.com/lucastsutsumi',
      techs: ['NodeJS', 'ReactJS', 'React Native']
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const noDeletedRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(noDeletedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(project =>
          (<li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>)
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
