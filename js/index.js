const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    // Call the GitHub User Search Endpoint
    searchUsers(searchTerm);
  }
});

function searchUsers(username) {
  const endpoint = `https://api.github.com/search/users?q=${username}`;

  fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => displayUsers(data.items))
    .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
  resultsContainer.innerHTML = '';

  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" />
      <p>${user.login}</p>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    `;
    userDiv.addEventListener('click', () => searchUserRepos(user.login));
    resultsContainer.appendChild(userDiv);
  });
}

function searchUserRepos(username) {
  const endpoint = `https://api.github.com/users/${username}/repos`;

  fetch(endpoint, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
    .then(response => response.json())
    .then(data => displayRepos(data))
    .catch(error => console.error('Error:', error));
}

function displayRepos(repos) {
  resultsContainer.innerHTML = '';

  repos.forEach(repo => {
    const repoDiv = document.createElement('div');
    repoDiv.innerHTML = `
      <h3>${repo.name}</h3>
      <p>${repo.description || 'No description available'}</p>
      <a href="${repo.html_url}" target="_blank">View Repo</a>
    `;
    resultsContainer.appendChild(repoDiv);
  });
}
