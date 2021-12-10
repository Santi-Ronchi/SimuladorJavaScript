$(document).ready(ready());

function ready() {
    loadJSON();
    bienvenida();
    cargarCarro();
}

function loadJSON(){
    fetch('./stock.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(producto => {
            html += `
            <div class="item" id="${producto.id}">
                <p class="cantStock">${producto.stock}</p>
                <p class="tituloItem">${producto.nombre}</p>
                <picture><img class="bordesRedondeados" src=${producto.imagen} alt="Maceta para plantas de  interior" height="216" width="216"></picture>
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

    if (cliente !== null){
        $('.galeria').prepend(`<h3 class="banner">Bienvenido de nuevo, ${cliente}</h3>`);
        personalizar(cliente);
    }
    else{
        $(".no-name").fadeIn();
        $('.nombre-ingresado').on('keypress', function (event) {
            if (event.key === 'Enter') {
                let nombre = $(".nombre-ingresado").val();
                localStorage.setItem('nombreCliente', nombre);
                $('.galeria').prepend(`<h3 class="banner">Bienvenido, ${nombre}</h3>`);
                personalizar(nombre);
            }
        });
    }
}

function personalizar(nombre) {
    $('.carro-nombre').append(`<h4 class="banner">Carrito de ${nombre}</h4>`);
    $(".no-name").fadeOut("slow", ()=>{$(".banner").fadeIn("slow")});
}