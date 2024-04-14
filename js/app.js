//https://www.omdbapi.com/?apikey=690d22ef&t=batman
//https://www.omdbapi.com/?apikey=690d22ef&s=batman
//Selectores
const inputSearch = document.querySelector("#search");
const container = document.querySelector(".cards-container");

let timer;

//Eventos

//24 console.log(btnShowMore);
//25 creo el evento para el boton showmore
function loadEventListenerBtn() {
	const btnShowMore = document.querySelectorAll(".btn-show");
	// console.log(btnShowMore);

	//27.queryselectorall devuelve una lista de nodos por tanto para recorrerla uso foreach

	btnShowMore.forEach((btn) => {
		btn.addEventListener("click", async () => {
			// console.log(btn);

			//28. obtener el id
			const movieId = btn.getAttribute("movie-id");

			//Endpoint
			//https://www.omdbapi.com/?apikey=690d22ef&i=
			const url = `https://www.omdbapi.com/?apikey=690d22ef&i=${movieId}`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);

			// const title = await getMovieTitleById(movieId);

			cleanHTML();

			// getMore(title);

			// container.innerHTML += `
			// <div class="card">
			// <img src=${btn.Poster} alt="Poster">
			// <h2 class="title-card">${btn.Title}</h2>
			// <p>Año<span>${btn.Year}</span></p>
			// <p>ID<span>${movieId}</span></p>
			// <p>Rated<span>${btn.Rated}</span></p>
			// <p>Released<span>${btn.Released}</span></p>
			// <p>Runtime<span>${btn.Runtime}</span></p>
			// <p>Genre<span>${btn.Genre}</span></p>
			// <p>Director<span>${btn.Director}</span></p>
			// <p>Writer<span>${btn.Writer}</span></p>
			// <p>Actors<span>${btn.Actors}</span></p>
			// <p>Plot<span>${btn.Plot}</span></p>
			// <p>Language<span>${btn.Language}</span></p>
			// <p>Country<span>${btn.Country}</span></p>
			// <p>Awards<span>${btn.Awards}</span></p>
			// <p>Tipo<span>${btn.Type}</span></p>
			// </div>
			// `
		});
	});
}

//29. hacer la peticion a la api con fetch y mostrar los

async function getMore(title) {
	// console.log(title);
	//30. crear la variable que obtiene la url
	const URL = `https://www.omdbapi.com/?apikey=690d22ef&t=${title}`;
	//31. crear una constante para hacer await a la url con fetch()
	const response = await fetch(URL);
	//32.verificar con consolelog
	console.log(response);
	//33. hacer await y convertir segun texto o json
	const data = await response.json();
	//34.verificar con log
	console.log(data);
	//35. verificar para acceder a la LISTA de peliculas
	// console.log(data.Search);
	//8. ahora debemos mostrar para esto en HTML usando innerHTML construimos una funcion y en esta parte invoco esta funcion con su parametro

	// printMore(data.Search);
}

//A.para ir guardando lo que el usuario est{a escribiendo
//B.event= es el evento target= la etiqueta value=el valor donde ocurrio el evento
inputSearch.addEventListener("input", (event) => {
	console.log(event.target.value);
	clearTimeout(timer);
	timer = setTimeout(() => {
		getMovies(event.target.value);
		getMore(event.target.value);
	}, 500);
});

//B. crear la API
//1. crear una funcion asincrona
async function getMovies(title) {
	//2. crear la variable que obtiene la url
	const URL = `https://www.omdbapi.com/?apikey=690d22ef&s=${title}`;
	//3. crear una constante para hacer await a la url con fetch()
	const response = await fetch(URL);
	//4.verificar con consolelog
	//console.log(response);
	//5. hacer await y convertir segun texto o json
	const data = await response.json();
	//6.verificar con log
	console.log(data);
	//7. verificar para acceder a la LISTA de peliculas
	console.log(data.Search);
	//8. ahora debemos mostrar para esto en HTML usando innerHTML construimos una funcion y en esta parte invoco esta funcion con su parametro

	printMovies(data.Search);
}

//9. la funcion tendra como parametro al crearla un nombre asociado a data.Search en este caso hace relacion a la lista de movies por tanto el parametro es movies
function printMovies(movies) {
	//10.limpiar creo la funcion que incluya el while y declaro la contante global arriba
	cleanHTML();

	//17. Preguntar si no hay peliculas con ese nombre
	if (!movies) {
		//18.Creo la etiqueta h2 con createElement
		const titleAlert = document.createElement("h2");
		//19. Agrego el contenido con textContent
		titleAlert.textContent = "No se encontraron peliculas con este nombre";
		//agrego emoji
		titleAlert.innerHTML += "&#128532";
		//20. agrego la clase y en css le doy estilo
		titleAlert.classList.add("alert");

		//21.le doy una ubicacion dentro de mi html y agrego el return
		container.appendChild(titleAlert);
		return;
	}

	//14.despues de crear la funcion cleanHTML creo la plantilla con inner html

	movies.forEach((movie) => {
		console.log(movie);
		//15.importante poner += y la plantilla la toma del div card del html
		//16.para las llaves debo verificar bien lo que imprime movie para sacar las propiedades ex movie.Algo
		//MODIFICO LA CLASE Y CREO EL ATRIBURO PARA EL BOTON VER MAS
		container.innerHTML += `
        <div class="card">
        <img src="${movie.Poster}" alt="Poster">
        <h2 class="title-card">${movie.Title}</h2>
        <p>Año<span>${movie.Year}</span></p>
        <p>Tipo<span>${movie.Type}</span></p>
        <button type="submit" class="btn-show" movie-id="${movie.imdbID}">Ver más</button>
        </div>
        `;
	});

	//26. llamo la funcion despues de que ya est{a creado el boton
	loadEventListenerBtn();
}

function cleanHTML() {
	//11.CREAR GLOBAL (container) el selector de la seccion .cards-container
	//12.funcionalidad para limpiar cosas rapidas:
	//13. mientras el contenedor contenga un hijo se remueve ese hijo
	while (container.firstChild) {
		container.removeChild(container.firstChild);
	}
}

//22.ahora para el boton ver mas
//23.Creo seleccionador btnShowMore dentro de una funcion para que toma la info despues de crado el boton
