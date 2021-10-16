if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    /*const carro = new Carro;*/

    var botonesQuitarDelCarro = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < botonesQuitarDelCarro.length; i++) {
        var boton = botonesQuitarDelCarro[i];
        boton.addEventListener('click', quitarDelCarro);
    }

    var cantInputs = document.getElementsByClassName('carro-cant-input');
    for (var i = 0; i < cantInputs.length; i++) {
        var cantidadAComprar = cantInputs[i];
        cantidadAComprar.addEventListener('change', cambioCantidad);
    }

    var agregarAlCarro = document.getElementsByClassName('btn-agregar-carro');
    for (var i = 0; i < agregarAlCarro.length; i++){
        var agregado = agregarAlCarro[i];
        agregado.addEventListener('click', prepararCarro);
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

function prepararCarro(event) {
    var boton = event.target;
    var itemParaAgregar = boton.parentElement.parentElement;

    const productoCompra = new Producto(itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText, itemParaAgregar.getElementsByClassName('precio-item')[0].innerText);
    /*var titulo = itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText;
    var precio = itemParaAgregar.getElementsByClassName('precio-item')[0].innerText;*/
    productoCompra.agregarAlCarro();
    actualizarPrecioTotal();
}

/*function agregarAlCarro(titulo, precio) {
    var carroFila = document.createElement('div');
    carroFila.classList.add('carro-fila');
    var carroItems = document.getElementsByClassName('carro-items')[0];
    var verificarDuplicado = carroItems.getElementsByClassName('carro-item-titulo')
    
    for (var i = 0; i < verificarDuplicado.length; i++) {
        if(verificarDuplicado[i].innerText == titulo) {
            alert("Este item ya fue agregado");
            return
        }
    }
    var carroFilaContenido = `
    <span class="carro-item carro-columna carro-item-titulo">${titulo}</span>
    <span class="carro-precio carro-columna">${precio}</span>
    <div class="carro-cant carro-columna">
      <input class="carro-cant-input" type="number" value="1"></input>
      <button role="button" class="btn btn-block btn-danger rounded py-2 px-4 carro-cant-btn">QUITAR</button>
    </div>`;
    carroFila.innerHTML = carroFilaContenido;
    carroItems.append(carroFila);
    carroFila.getElementsByClassName('btn-danger')[0].addEventListener('click', quitarDelCarro);
    carroFila.getElementsByClassName('carro-cant-input')[0].addEventListener('change', cambioCantidad)
}*/

function quitarDelCarro(event) {
    var botonClickeado = event.target;
    botonClickeado.parentElement.parentElement.remove();
    actualizarPrecioTotal();
}


function cambioCantidad(event) {
    var cantidadAComprar = event.target;
    if (isNaN(cantidadAComprar.value) || cantidadAComprar.value <= 0) {
        cantidadAComprar.value = 1;
    }
    actualizarPrecioTotal();
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
    }
    document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total
}