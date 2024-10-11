// search&result.js


const apiKey = 'dfbed90a';  // Api-key

// Valitse HTML-elementit
const submit = document.getElementById('submit');
const searchResults = document.getElementById('searchResults');

// Lisää tapahtumankuuntelija hakupainikkeelle
submit.addEventListener('click', function() {
    event.preventDefault();  // Estä lomakkeen oletustoiminto
  const searchQuery = document.getElementById('searchQuery').value;

  // Kutsu OMDb API:ta elokuvan nimellä
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)

    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

// Funktio tulosten näyttämiseen
function displayResults(data) {
    searchResults.innerHTML = '';  // Tyhjennä edelliset tulokset

  if (data.Response === "True") {
    data.Search.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="Movie Poster">
        <p>Type: ${movie.Type}</p>
      `;
      searchResults.appendChild(movieElement);
    });
  } else {
    searchResults.innerHTML = `<p>No results found for "${document.getElementById('searchQuery').value}".</p>`;

  }
}
