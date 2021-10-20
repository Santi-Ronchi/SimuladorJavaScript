if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    bienvenida();

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

    var orden = document.getElementsByClassName('btn-ordenar');
    for (var i = 0; i < orden.length; i++){
        var agregado = orden[i];
        agregado.addEventListener('click', mostrarLoPedido);
    }
}


function cambioCantidad(event) {
    var cantidadAComprar = event.target;
    if (isNaN(cantidadAComprar.value) || cantidadAComprar.value <= 0) {
        cantidadAComprar.value = 1;
    }
    actualizarPrecioTotal();
}

