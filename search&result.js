// search&result.js

//Oma apikey 
const apiKey = 'dfbed90a';  


const submit = document.getElementById('submit');
const searchResults = document.getElementById('searchResults');

// Lisää tapahtumankuuntelija submit buttoniin 
submit.addEventListener('click', function() {
  //Estä lomakkeen lähetys
    event.preventDefault();  
    
  const searchQuery = document.getElementById('searchQuery').value;

  //Notifivation haun alkamisesta
  toastr.info("Searching for movies...");

  // Kutsu OMDb API:ta elokuvan nimellä
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`)

    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        displayResults(data);

        //Notifivation haun onnistumisesta
        toastr.success("Movies found!");
      } else {
        //Notifivation ettei tuloksia löydy
        toastr.error(`No movies found for "${searchQuery}"`);

        // Tyhjä tulos
        searchResults.innerHTML = `<p>No results found for "${searchQuery}".</p>`;
      }
    })
    .catch(error => {
      //Notifivation errorista
      toastr.error("An error occurred while searching");

      console.error('Error fetching data:', error);
    });
});

// Funktio tulosten näyttämiseen
function displayResults(data) {
    searchResults.innerHTML = '';  // Tyhjennä edelliset tulokset

    data.Search.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="Movie Poster">
        <p>Type: ${movie.Type}</p>
      `;
      searchResults.appendChild(movieElement);
    });
}
