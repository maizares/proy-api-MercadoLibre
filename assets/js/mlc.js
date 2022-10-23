import {createCard} from "./card.js"

let     v_offset = 0;
const   cant     = 20;

const elMostrarBtn_ML 	= document.getElementById("mostrarBtn-ml");
const elContenedor   	= document.getElementById("contenedor"); 
const elCargando        = document.getElementById("cargando"); 
const elMostrarBtn 	    = document.getElementById("mostrarBtn");
const elPaginacion      = document.getElementById("paginacion"); 

const fnSiguiente = () => {
    v_offset +=cant;  
  obtenerProdML();   
};

const fnAnterior = () => {
    //console.log("AAA=>"+v_offset + ">" + cant);
    if(v_offset >= cant){
        v_offset -= cant;
        obtenerProdML();   
    }
}

const obtenerProdML = async() => {
    
    //console.log("AAAA=>" + e.target);

    title.innerHTML = "Productos de Mercado Libre";
    elMostrarBtn.classList.remove("active");
	elMostrarBtn_ML.classList.add("active");
    elCargando.innerHTML = "<div style='text-align:center;'><img src='./assets/img/spin.gif' width='60'></div>";

    try {
        const respuesta = await axios.get(`https://api.mercadolibre.com/sites/MLC/search`,{
                                            params:{                
                                                    q:'licor',
                                                    offset:v_offset,
                                                    limit:cant
                                                }                           
                                        })

        if (respuesta.status === 200){
            const datos   = await respuesta.data;
            
            let productos = '';

            datos.results.forEach(producto => {
                productos += createCard(producto)                                       
            });
            elCargando.innerHTML    = "";
            elContenedor.innerHTML  = productos;
            
            //Botones de paginacion
            let paginacion  = document.createElement("div");
            paginacion.classList.add("paginacion")
            //btn anterior
            let btnAnterior = document.createElement("button");
            btnAnterior.innerHTML="<< Anterior";
            btnAnterior.addEventListener('click',fnAnterior);
            
            //btn siguiente
            let btnSiguiente = document.createElement("button");
            btnSiguiente.innerHTML="Siguiente >>";
            btnSiguiente.addEventListener('click',fnSiguiente);
            paginacion.append(btnAnterior);
            paginacion.append(btnSiguiente);
            
            elPaginacion.innerHTML="";
            elPaginacion.append(paginacion);
        }
    }
    catch(e){
        elCargando.innerHTML="";
        elContenedor.innerHTML = "<div class='card-error'>Error: " + e + "</div>";
    }
}

elMostrarBtn_ML.addEventListener("click", obtenerProdML);
