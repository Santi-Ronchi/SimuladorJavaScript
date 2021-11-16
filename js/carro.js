const carro = [];
let carroID = 1;


function actualizarPrecioTotal() {
    //let itemCarroContainer = document.getElementsByClassName('carro-items')[0];
    let carroFilas = document.getElementsByClassName('carro-items')[0].getElementsByClassName('carro-fila');
    let total = 0;
    for (let i = 0; i < carroFilas.length; i++) {
        let carroFila = carroFilas[i];
        let precioItem = carroFila.getElementsByClassName('carro-precio')[0];
        let precio = parseFloat(precioItem.innerText.replace('$', ''));
        let cantidad = carroFila.getElementsByClassName('carro-cant-input')[0].value;
        total = total + (precio * cantidad);
        carro[i].cant = cantidad;
    }
    document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total
}

function prepararCarro(event) {
    let boton = event.target;
    let itemParaAgregar = boton.parentElement.parentElement;
    let precioItem = itemParaAgregar.getElementsByClassName('precio-item')[0];
    let precio = parseFloat(precioItem.innerText.replace('$', ''));
    let nomItem = itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText
    for (let i = 0; i < carro.length; i++) {
        if(carro[i].titulo == nomItem) {
            alert("El producto ya esta en el carro")
            //carro[i].cant = carro[i].cant++;
            return
        }
    }
    let cant = 1;
    const productoCompra = new Producto(nomItem, precio, cant, carroID);
    carroID++
    carro.push(productoCompra);
    agregarAlCarro(productoCompra.titulo, productoCompra.precio, productoCompra.id);
    guardarProductoEnLS(productoCompra);
    actualizarPrecioTotal();
}

function cambioCantidad(event) {
    let cantidadAComprar = event.target;
    if (isNaN(cantidadAComprar.value) || cantidadAComprar.value <= 0) {
        cantidadAComprar.value = 1;
    }
    actualizarPrecioTotal();
}

function quitarDelCarro(event) {
    let elemento = event.target.parentElement.parentElement;
    let paraSacar = elemento.getElementsByClassName('carro-item-titulo')[0].innerText;
    elemento.remove();
    for(i=0; i < carro.length; i++){
        if(paraSacar == carro[i].titulo){
            carro.splice(i, 1);
        }
    }
    let productos = getProductosDeLS();
    let listaActualizada = productos.filter(producto => {
        return (producto.titulo !== paraSacar);
    });
    localStorage.setItem('productos', JSON.stringify(listaActualizada));
    actualizarPrecioTotal();
}

function guardarProductoEnLS(item){
    let productos = getProductosDeLS();
    productos.push(item);
    localStorage.setItem('productos', JSON.stringify(productos));
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
        agregarAlCarro(producto.titulo, producto.precio)
    });
    actualizarPrecioTotal();
}

function agregarAlCarro(titulo, precio, id) {
    let carroFila = document.createElement('div');
    carroFila.classList.add('carro-fila');
    carroFila.setAttribute('data-id', `${id}`)
    let carroItems = document.getElementsByClassName('carro-items')[0];
    let carroFilaContenido = `
    <span class="carro-item carro-columna carro-item-titulo">${titulo}</span>
    <span class="carro-precio carro-columna">$${precio}</span>
    <div class="carro-cant carro-columna">
      <input class="carro-cant-input" type="number" value="1"></input>
      <button role="button" class="btn btn-block btn-danger rounded py-2 px-4 carro-cant-btn">QUITAR</button>
    </div>`;
    carroFila.innerHTML = carroFilaContenido;
    carroItems.append(carroFila);
    carroFila.getElementsByClassName('btn-danger')[0].addEventListener('click', quitarDelCarro);
    carroFila.getElementsByClassName('carro-cant-input')[0].addEventListener('change', cambioCantidad);
}


class Producto {
    constructor(titulo, precio, cant, id) {
        this.titulo = titulo;
        this.precio = precio;
        this.cant = cant;
        this.id = id;
    }
}