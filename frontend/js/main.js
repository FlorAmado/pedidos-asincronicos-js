window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch

try {
let response = await fetch('http://localhost:3031/api/movies')
let peliculas = await response.json();
let data = peliculas.data;


    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);

      const a = document.createElement("a");

      a.setAttribute('href','formulario.html?id=' + movie.id)
      a.setAttribute('class','botonAgregar')
      a.textContent = 'ver mas';
      card.appendChild(a);

      const buttonFav = document.createElement("button");
      buttonFav.setAttribute("class","botonAgregar");
      buttonFav.textContent = "☆";
      card.appendChild(buttonFav);

      updateButton(buttonFav,movie.id)

      buttonFav.addEventListener('click', () => {
        toggleFavorite(movie.id);
        updateButton(buttonFav,movie.id)      
      });
    })
} catch (error) {
  console.log(error);
}

 function toggleFavorite(movieId){
  let favoriteIds = JSON.parse(sessionStorage.getItem('ids')) || [];
  const index = favoriteIds.indexOf(movieId);
  if (index > -1) {
    favoriteIds.splice(index, 1);
    
  }else{
    favoriteIds.push(movieId);
  }
  sessionStorage.setItem('ids', JSON.stringify(favoriteIds));

 }
 function updateButton(button,movieId){
  let favoriteIds = JSON.parse(sessionStorage.getItem('ids')) || [];

  if (favoriteIds.includes(movieId)) {
    button.classList.add("botonAgregar");
    button.textContent = "★";
  } else {
    button.textContent = "☆";
  }
 }
};
