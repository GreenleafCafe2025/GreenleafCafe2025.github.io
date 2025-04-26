document.addEventListener('DOMContentLoaded', function() {
    const botonesMenu = document.querySelectorAll('.boton-menu');
    const submenus = document.querySelectorAll('.submenu');
    const botonesComprar = document.querySelectorAll('.boton-comprar');
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('total-carrito');
    let totalCarrito = 0;
    const carritoItems = [];

    // Ocultar todos los submenús al inicio
    submenus.forEach(submenu => {
        submenu.style.display = 'none';
    });

    botonesMenu.forEach(boton => {
        boton.addEventListener('click', function() {
            const menuId = this.dataset.menu;
            const submenu = document.getElementById('menu-' + menuId);

            // Ocultar todos los demás submenús
            submenus.forEach(otherSubmenu => {
                if (otherSubmenu !== submenu) {
                    otherSubmenu.style.display = 'none';
                }
            });

            // Mostrar u ocultar el submenú actual
            if (submenu) {
                submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Cerrar los submenús al hacer clic fuera de ellos
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.boton-menu')) {
            submenus.forEach(submenu => {
                submenu.style.display = 'none';
            });
        }
    });

    // Funcionalidad para añadir al carrito
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombreProducto = this.dataset.nombre;
            const precioProducto = parseFloat(this.dataset.precio);

            const nuevoItem = {
                nombre: nombreProducto,
                precio: precioProducto
            };
            carritoItems.push(nuevoItem);

            // Actualizar visual del carrito
            actualizarCarrito();
        });
    });

    function actualizarCarrito() {
        listaCarrito.innerHTML = ''; // Limpiar el carrito visual
        totalCarrito = 0;

        carritoItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - ${item.precio.toFixed(2)}€`;
            listaCarrito.appendChild(li);
            totalCarrito += item.precio;
        });

        totalCarritoElement.textContent = `Total: ${totalCarrito.toFixed(2)}€`;
    }
});