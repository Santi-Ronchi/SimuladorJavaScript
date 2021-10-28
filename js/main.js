if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    bienvenida();

    let botonesQuitarDelCarro = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < botonesQuitarDelCarro.length; i++) {
        let boton = botonesQuitarDelCarro[i];
        boton.addEventListener('click', quitarDelCarro);
    }

    let cantInputs = document.getElementsByClassName('carro-cant-input');
    for (let i = 0; i < cantInputs.length; i++) {
        let cantidadAComprar = cantInputs[i];
        cantidadAComprar.addEventListener('change', cambioCantidad);
    }

    let agregarAlCarro = document.getElementsByClassName('btn-agregar-carro');
    for (let i = 0; i < agregarAlCarro.length; i++){
        let agregado = agregarAlCarro[i];
        agregado.addEventListener('click', prepararCarro);
    }

    let orden = document.getElementsByClassName('btn-ordenar');
    for (let i = 0; i < orden.length; i++){
        let agregado = orden[i];
        agregado.addEventListener('click', mostrarLoPedido);
    }
}

