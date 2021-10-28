const carro = [];


function bienvenida(){
    let nombreCliente = prompt("Ingrese su nombre.");
    alert("Hola, " + nombreCliente + "!");

    let nombreCarrito = document.createElement('h4');
    nombreCarrito.classList.add('banner');
    let tituloCarro = document.getElementsByClassName('carro-nombre')[0];
    let contenido = `<h4 class="banner">Carrito de ${nombreCliente}</h4>`;
    nombreCarrito.innerHTML = contenido;
    tituloCarro.append(nombreCarrito);
}

function actualizarPrecioTotal() {
    let itemCarroContainer = document.getElementsByClassName('carro-items')[0];
    let carroFilas = itemCarroContainer.getElementsByClassName('carro-fila');
    let total = 0;
    for (let i = 0; i < carroFilas.length; i++) {
        let carroFila = carroFilas[i];
        let precioItem = carroFila.getElementsByClassName('carro-precio')[0];
        let cantidadItem = carroFila.getElementsByClassName('carro-cant-input')[0];
        let precio = parseFloat(precioItem.innerText.replace('$', ''));
        let cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
        carro[i][1] = cantidad;
    }
    document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total
}

function prepararCarro(event) {
    let boton = event.target;
    let itemParaAgregar = boton.parentElement.parentElement;
    let precioItem = itemParaAgregar.getElementsByClassName('precio-item')[0];
    let precio = parseFloat(precioItem.innerText.replace('$', ''));
    const productoCompra = new Producto(itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText, precio);
    let tupla = [productoCompra, 1];
    carro.push(tupla);
    productoCompra.agregarAlCarro();
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
    let boton = event.target;
    let paraSacar = boton.parentElement.parentElement.getElementsByClassName('carro-item-titulo')[0].innerText;
    boton.parentElement.parentElement.remove();
    for(i=0; i < carro.length; i++){
        if(paraSacar == carro[i][0].titulo){
            carro.splice(i, 1);
        }
    }
    actualizarPrecioTotal();
}

function mostrarLoPedido(event){
    switch (event.target.innerText){
        case "ordenar por precio item":
            carro.sort((a, b) => {
                return a[0].precio - b[0].precio;
            });
            console.log(carro);
            
            break;

        case "el mas caro":
            let max = 0;
            for(i=0; i < carro.length; i++){
                if(carro[i][0].precio * carro[i][1] > max){
                    max = carro[i][0].precio * carro[i][1];
                }
            }
            alert("el mas caro vale $" + max);
            break;
        case "el mas barato":
            let min = 999999999;
            for(i=0; i < carro.length; i++){
                if(carro[i][0].precio * carro[i][1] < min){
                    min = carro[i][0].precio * carro[i][1];
                }
            }
            alert("el mas barato vale $" + min);
            break;
        default:
            return 0;
    }
}

class Producto {
    constructor(titulo, precio) {
        this.titulo = titulo;
        this.precio = precio;
    }

    agregarAlCarro() {
        let carroFila = document.createElement('div');
        carroFila.classList.add('carro-fila');
        let carroItems = document.getElementsByClassName('carro-items')[0];
        
        let verificarDuplicado = carroItems.getElementsByClassName('carro-item-titulo');
        for (let i = 0; i < verificarDuplicado.length; i++) {
            if(verificarDuplicado[i].innerText == this.titulo) {
                alert("Este item ya fue agregado");
                return
            }
        }
        let carroFilaContenido = `
        <span class="carro-item carro-columna carro-item-titulo">${this.titulo}</span>
        <span class="carro-precio carro-columna">${this.precio}</span>
        <div class="carro-cant carro-columna">
          <input class="carro-cant-input" type="number" value="1"></input>
          <button role="button" class="btn btn-block btn-danger rounded py-2 px-4 carro-cant-btn">QUITAR</button>
        </div>`;
        carroFila.innerHTML = carroFilaContenido;
        carroItems.append(carroFila);
        carroFila.getElementsByClassName('btn-danger')[0].addEventListener('click', quitarDelCarro);
        carroFila.getElementsByClassName('carro-cant-input')[0].addEventListener('change', cambioCantidad);
    }
}