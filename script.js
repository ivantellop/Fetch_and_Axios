const container = document.getElementById('data-container');
const fetchBtn = document.getElementById('fetchBtn');
const axiosBtn = document.getElementById('axiosBtn');
const body = document.body;

const API_URL = 'https://rickandmortyapi.com/api/character';

function mostrarPersonajes(data) {
    container.innerHTML = '';
    data.results.forEach(personaje => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}">
      <h3>${personaje.name}</h3>
      <p>${personaje.species}</p>
    `;
        container.appendChild(card);
    });
}

function cargarConFetch() {
    body.classList.remove('axios-mode');
    body.classList.add('fetch-mode');

    fetch(API_URL)
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener datos con Fetch');
            return response.json();
        })
        .then(data => mostrarPersonajes(data))
        .catch(error => {
            container.innerHTML = `<p style="color: red;">${error.message}</p>`;
            console.error(error);
        });
}

function cargarConAxios() {
    body.classList.remove('fetch-mode');
    body.classList.add('axios-mode');

    axios.get(API_URL)
        .then(response => mostrarPersonajes(response.data))
        .catch(error => {
            let mensaje = 'Error al obtener datos con Axios';
            if (error.response) {
                mensaje += ` - Estado: ${error.response.status}`;
            }
            container.innerHTML = `<p style="color: red;">${mensaje}</p>`;
            console.error(error);
        });
}

fetchBtn.addEventListener('click', cargarConFetch);
axiosBtn.addEventListener('click', cargarConAxios);
