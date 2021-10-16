class Producto {
    constructor(titulo, precio) {
        this.tituloItem = titulo;
        this.precioItem = precio;
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

class Carro {

    constructor() {
        this.listaDeCompras = [];
        this.totalPagar = 0;
    }

    prepararCarro(event) {
        var boton = event.target;
        var itemParaAgregar = boton.parentElement.parentElement;

        const productoCompra = new Producto(itemParaAgregar.getElementsByClassName('tituloItem')[0].innerText, itemParaAgregar.getElementsByClassName('precio-item')[0].innerText);
        this.listaDeCompras.append(productoCompra);
        productoCompra.agregarAlCarro();
        this.actualizarPrecioTotal();
    }

    actualizarPrecioTotal() {
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
        this.totalPagar = total
    /*document.getElementsByClassName('carro-total-precio')[0].innerText = '$' + total*/
    }


    quitarDelCarro(event) {
        var botonClickeado = event.target;
        botonClickeado.parentElement.parentElement.remove();
        this.actualizarPrecioTotal();
    }
}