// import 
import { products } from "./products.js";
import { createCard} from "./card.js"

const isOk  		= true;
const title 		= document.getElementById("title"); 
const elMostrarBtn 	= document.getElementById("mostrarBtn");
const elContenedor  = document.getElementById("contenedor"); 
const elMostrarBtn_ML 	= document.getElementById("mostrarBtn-ml");
const elCargando    = document.getElementById("cargando"); 
const elPaginacion  = document.getElementById("paginacion"); 

const customFetch = (time, task) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (isOk) {
				resolve(task);
			} else {
				reject("Error");
			}
		}, time);
	});
};

const mostrarProductos = () => {
	title.innerHTML = "Productos Locales";
	elMostrarBtn.classList.add("active");
	elMostrarBtn_ML.classList.remove("active");
	
	elCargando.innerHTML  	= "<div style='text-align:center;'><img src='./assets/img/spin.gif' width='60'></div>";
	let cards 				= "";
	elContenedor.innerHTML	= "";
	elPaginacion.innerHTML  = "";

	customFetch(1000, products).then((data) => {
		let lista = document.createElement("ul");
		elCargando.innerHTML = "";
		for (let i = 0; i < data.length; i++) {
			cards += createCard(data[i]);			
		}
		elContenedor.innerHTML = cards;
	});	
};

elMostrarBtn.addEventListener("click", mostrarProductos);
