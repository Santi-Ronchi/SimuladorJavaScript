const carro = [];


function bienvenida(){
    var nombreCliente = prompt("Ingrese su nombre.");
    alert("Hola, " + nombreCliente + "!");

    var nombreCarrito = document.createElement('h4');
    nombreCarrito.classList.add('banner');
    var tituloCarro = document.getElementsByClassName('carro-nombre')[0];
    var contenido = `<h4 class="banner">Carrito de ${nombreCliente}</h4>`;
    nombreCarrito.innerHTML = contenido;
    tituloCarro.append(nombreCarrito);
}

function actualizarPrecioTotal() {
    var itemCarroContainer = document.getElementsByClassName('carro-items')[0];
    var carroFilas = itemCarroContainer.getElementsByClassName('carro-fila');
    var total = 0;
    for (var i = 0; i < carroFilas.length; i++) {
        var carroFila = carroFilas[i];
        var precioItem = carroFila.getElementsByClassName('carro-precio')[0];
        var cantidadItem = carroFila.getElementsByClassName('carro-cant-input')[0];
        var precio = parseFloat(precioItem.innerText.replace('$', ''));
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
        carro[i][1] = cantidad;
    }
    document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total
}

function prepararCarro(event) {
    var boton = event.target;
    var itemParaAgregar = boton.parentElement.parentElement;
    var precioItem = itemParaAgregar.getElementsByClassName('precio-item')[0];
    var precio = parseFloat(precioItem.innerText.replace('$', ''));
    const productoCompra = new Producto(itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText, precio);
    var tupla = [productoCompra, 1];
    carro.push(tupla);
    productoCompra.agregarAlCarro();
    actualizarPrecioTotal();
}

function cambioCantidad(event) {
    var cantidadAComprar = event.target;
    if (isNaN(cantidadAComprar.value) || cantidadAComprar.value <= 0) {
        cantidadAComprar.value = 1;
    }
    actualizarPrecioTotal();
}

function quitarDelCarro(event) {
    var boton = event.target;
    var paraSacar = boton.parentElement.parentElement.getElementsByClassName('carro-item-titulo')[0].innerText;
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
            var max = 0;
            for(i=0; i < carro.length; i++){
                if(carro[i][0].precio * carro[i][1] > max){
                    max = carro[i][0].precio * carro[i][1];
                }
            }
            alert("el mas caro vale $" + max);
            break;
        case "el mas barato":
            var min = 999999999;
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
        var carroFila = document.createElement('div');
        carroFila.classList.add('carro-fila');
        var carroItems = document.getElementsByClassName('carro-items')[0];
        
        var verificarDuplicado = carroItems.getElementsByClassName('carro-item-titulo');
        for (var i = 0; i < verificarDuplicado.length; i++) {
            if(verificarDuplicado[i].innerText == this.titulo) {
                alert("Este item ya fue agregado");
                return
            }
        }
        var carroFilaContenido = `
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