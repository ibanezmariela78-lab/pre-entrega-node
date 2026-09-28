
const argumentos = process.argv.slice(2);

const [metodo, recurso, ...datos] = argumentos;

// Consultar todos los productos o uno en particular
async function obtenerProductos(url) {
    try {
        const respuesta = await fetch(`https://fakestoreapi.com/${url}`);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        if (!productos) {
            console.log("No se encontró el producto");
            return;
        }

        console.log(productos);

    } catch (error) {
        console.error("Error al obtener productos:", error.message);
        process.exitCode = 1;
    }
}

// Crear un producto nuevo
async function crearProducto(title, price, category) {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                price: Number(price),
                category: category
            })
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const productoCreado = await respuesta.json();

        console.log("Producto creado correctamente:");
        console.log(productoCreado);
        console.log("ID del producto creado:", productoCreado.id);

    } catch (error) {
        console.error("Error al crear el producto:", error.message);
        process.exitCode = 1;
    }
}

// Eliminar un producto mediante su ID
async function eliminarProducto(url) {
    try {
        const respuesta = await fetch(`https://fakestoreapi.com/${url}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const productoEliminado = await respuesta.json();

        if (!productoEliminado) {
            console.log("No se encontró el producto");
            return;
        }

        console.log("Respuesta de eliminación:");
        console.log(productoEliminado);

    } catch (error) {
        console.error("Error al eliminar el producto:", error.message);
        process.exitCode = 1;
    }
}

// Procesar los comandos ingresados desde la terminal
switch (metodo) {

    case "GET":

        if (recurso === "products") {
            obtenerProductos(recurso);

        } else if (/^products\/[1-9]\d*$/.test(recurso || "")) {
            obtenerProductos(recurso);

        } else {
            console.log("Comando GET incompleto o incorrecto");
        }

        break;

    case "POST":

        if (recurso === "products" && datos.length === 3) {

            const [title, price, category] = datos;

            if (title.trim() !== "" &&
                category.trim() !== "" &&
                price.trim() !== "" &&
                Number.isFinite(Number(price)) &&
                Number(price) > 0) {

                crearProducto(title, price, category);

            } else {
                console.log("Los datos del producto no son válidos");
            }

        } else {
            console.log("Comando POST incompleto o incorrecto");
        }

        break;

    case "DELETE":

        if (/^products\/[1-9]\d*$/.test(recurso || "")) {
            eliminarProducto(recurso);

        } else {
            console.log("Comando DELETE incompleto o incorrecto");
        }

        break;

    default:
        console.log("Comando no reconocido");
        console.log("Utilizá GET, POST o DELETE");
}
