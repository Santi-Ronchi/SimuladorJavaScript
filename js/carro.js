const carro = [];


function actualizarPrecioTotal() {
    let carroFilas = document.getElementsByClassName('carro-items')[0].getElementsByClassName('carro-fila');
    let total = 0;
    for (let i = 0; i < carroFilas.length; i++) {
        let carroFila = carroFilas[i];
        let precioItem = carroFila.getElementsByClassName('carro-precio')[0];
        let precio = parseFloat(precioItem.innerText.replace('$', ''));
        let cantidad = carroFila.getElementsByClassName('carro-cant-input')[0].value;
        total = total + (precio * cantidad);
        carro[i].cant = cantidad;
        acutalizarLS(carro[i].titulo);
    }
    document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total
    
    if(total === 0){
        $(".carro-con-items").fadeOut("slow", ()=>{$(".carro-vacio").fadeIn("slow")})
    }
}

function prepararCarro(event) {
    //boton = event.target;
    let cant = 1;
    let itemParaAgregar = event.target.parentElement.parentElement;
    let precio = parseFloat(itemParaAgregar.getElementsByClassName('precio-item')[0].innerText.replace('$', ''));
    let nomItem = itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText;
    let itemID = itemParaAgregar.id;

    for (let i = 0; i < carro.length; i++) {
        if(carro[i].titulo == nomItem) {
            carro[i].cant++;
            $("#" + String(carro[i].id) + ".carro-fila").find('.carro-cant-input').val(carro[i].cant);
            let nuevaCant = $("#" + String(carro[i].id) + ".carro-fila").find('.carro-cant-input').val();
            if (nuevaCant > 10) {
                nuevaCant = $("#" + String(carro[i].id) + ".carro-fila").find('.carro-cant-input').val(10);
                carro[i].cant = 10;
            }
            actualizarPrecioTotal();
            return
        }
    }
    const productoCompra = new Producto(nomItem, precio, cant, itemID);
    carro.push(productoCompra);
    agregarAlCarro(productoCompra.titulo, productoCompra.precio, productoCompra.cant, productoCompra.id);
    guardarProductoEnLS(productoCompra);
    actualizarPrecioTotal();

}

function cambioCantidad(event) {
    let modif = event.target.parentElement.parentElement.getElementsByClassName('carro-item-titulo')[0].innerText;
    let cantidadAComprar = event.target;
    if (isNaN(cantidadAComprar.value) || cantidadAComprar.value <= 0) {
        cantidadAComprar.value = 1;
    } else if (cantidadAComprar.value > 10) {
        cantidadAComprar.value = 10;
    }
    for(i=0; i < carro.length; i++){
        if(modif == carro[i].titulo){
            carro[i].cant = cantidadAComprar;
        }
    }
    actualizarPrecioTotal();
}

function quitarDelCarro(event) {
    let elemento = event.target.parentElement.parentElement;
    $(elemento).fadeOut(()=>{
        let paraSacar = elemento.getElementsByClassName('carro-item-titulo')[0].innerText;
    elemento.remove();
    for(i=0; i < carro.length; i++){
        if(paraSacar == carro[i].titulo){
            carro.splice(i, 1);
        }
    }
    sacarDeLS(paraSacar);
    /*let productos = getProductosDeLS();
    let listaActualizada = productos.filter(producto => {
        return (producto.titulo !== paraSacar);
    });
    localStorage.setItem('productos', JSON.stringify(listaActualizada));*/
    actualizarPrecioTotal();
    }); 
}

function sacarDeLS(aBorrar){
    let productos = getProductosDeLS();
    let listaActualizada = productos.filter(producto => {
        return (producto.titulo !== aBorrar);
    });
    localStorage.setItem('productos', JSON.stringify(listaActualizada));
}

function guardarProductoEnLS(item){
    let productos = getProductosDeLS();
    productos.push(item);
    localStorage.setItem('productos', JSON.stringify(productos));
}

function acutalizarLS(nombre){
    sacarDeLS(nombre);
    listaLS = getProductosDeLS();
    for(i=0; i < carro.length; i++){
        if(nombre == carro[i].titulo) {
            guardarProductoEnLS(carro[i])
        }
    }
}

function getProductosDeLS(){
    return localStorage.getItem('productos') ? JSON.parse(localStorage.getItem('productos')) : [];
}

function cargarCarro(){
    let productos = getProductosDeLS();
    if(productos.length < 1){
        cartItemID = 1; 
    } else {
        cartItemID = productos[productos.length - 1].id;
        cartItemID++;
    }
    productos.forEach(producto => {
        const productoCompra = new Producto(producto.titulo, producto.precio, producto.cant, producto.id);
        carro.push(productoCompra);
        agregarAlCarro(producto.titulo, producto.precio, producto.cant, producto.id)
    });
    actualizarPrecioTotal();
}

function agregarAlCarro(titulo, precio, cant, id) {
    $('.carro-items').append(`
    <div class="carro-fila" id="${id}" style="display: none">
        <span class="carro-item carro-columna carro-item-titulo">${titulo}</span>
        <span class="carro-precio carro-columna">$${precio}</span>
        <div class="carro-cant carro-columna">
            <input class="carro-cant-input" type="number" value="${cant}"></input>
            <button role="button" class="btn btn-block btn-danger rounded py-2 px-4 carro-cant-btn">QUITAR</button>
        </div>
    </div>`);
    $(".carro-fila").fadeIn();
    $('.btn-danger').on('click', quitarDelCarro);
    $('.carro-cant-input').on('change', cambioCantidad);
    $(".carro-vacio").fadeOut("slow", ()=>{$(".carro-con-items").fadeIn("slow")});
}


class Producto {
    constructor(titulo, precio, cant, id) {
        this.titulo = titulo;
        this.precio = precio;
        this.cant = cant;
        this.id = id;
    }
}