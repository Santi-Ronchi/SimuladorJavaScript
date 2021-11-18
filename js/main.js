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
        $('.carro-cant-input').on('change', cambioCantidad);
        $('.btn-agregar-carro').on('click', prepararCarro);
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
    $(".banner").fadeIn("slow");

     
    
}