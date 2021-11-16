$(document).ready(ready());

function ready() {
    loadJSON();
    cargarCarro();
    bienvenida();
}

function loadJSON(){
    fetch('./stock.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(producto => {
            html += `
            <div class="item">
                <p class="tituloItem">${producto.nombre}</p>
                <picture><a href="proximamente.html"><img class="bordesRedondeados" src=${producto.imagen} alt="Maceta para plantas de  interior" height="216" width="216"></a></picture>
                <div class="precioProd">
                    <span class="precio-item">$${producto.precio}</span>
                    <button role="button" class="btn btn-block btn-secondary rounded py-2 px-4 btn-agregar-carro">AL CARRO</button>
                </div>
            </div>
            `;});
        $('.itemsTotal').append(html);


        $('.btn-danger').on('click', quitarDelCarro);
        /*let botonesQuitarDelCarro = $('.btn-danger');
        for (let i = 0; i < botonesQuitarDelCarro.length; i++) {
            let boton = botonesQuitarDelCarro[i];
            boton.on('click', quitarDelCarro);
        }*/

        $('.carro-cant-input').on('change', cambioCantidad);
        /*let cantInputs = $('.carro-cant-input');
        for (let i = 0; i < cantInputs.length; i++) {
            let cantidadAComprar = cantInputs[i];
            cantidadAComprar.on('change', cambioCantidad);
        }*/

        $('.btn-agregar-carro').on('click', prepararCarro);
        //let agregarAlCarro = $('.btn-agregar-carro');
        /*for (let i = 0; i < agregarAlCarro.length; i++){
            let agregado = agregarAlCarro[i];
            console.log(agregado);
            agregado.on('click', prepararCarro);
        }*/
    })
}

function bienvenida(){
    let cliente = localStorage.getItem('nombreCliente');
    let nombreCarrito

    if (cliente !== null){
        alert("Bienvenido de nuevo, " + cliente);
        nombreCarrito = cliente;
    }
    else{
        let nombreCliente = prompt("Ingrese su nombre.");
        alert("Hola, " + nombreCliente + "!");
        localStorage.setItem('nombreCliente', nombreCliente);
        nombreCarrito = nombreCliente;
    }
    $('.carro-nombre').append(`<h4 class="banner">Carrito de ${nombreCarrito}</h4>`);
    
    
}