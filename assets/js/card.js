
export const createCard = (cards) => {
	let producto  = "";

	producto =	`	<div class="card">
						<div class="card-title">
							<div class="subtitulo" >Id: ${cards.id}</div>							
							<img class="imagen" src="${cards.thumbnail}"> 							
						</div>
						<div class="card-body">
							${cards.title}
						</div>                
						<div class="card-foot">
							Precio: $${cards.price}                    
							Stock: ${cards.available_quantity}    
						</div>                
					</div>
                `               
	return producto;
};

