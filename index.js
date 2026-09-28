console.log("Inicio de programa");

const args = process.argv.slice(2);
const API = "https://fakestoreapi.com/";

// Consultar todos los productos o buscar uno por su ID
async function obtenerProductos(url) {
    try {
        const respuesta = await fetch(`${API}${url}`);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        return data;

    } catch (error) {
        console.log("Error al consultar productos:", error.message);
        process.exitCode = 1;
        return null;
    }
}

// Eliminar un producto
async function eliminarProducto(producto) {
    try {
        const respuesta = await fetch(`${API}${producto}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        return data;

    } catch (error) {
        console.log("Error al eliminar el producto:", error.message);
        process.exitCode = 1;
        return null;
    }
}

// Crear un producto con los datos recibidos por la terminal
async function crearProducto(producto) {
    try {
        const respuesta = await fetch(`${API}products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        console.log("Producto creado:", data);
        console.log("ID del producto creado:", data.id);

    } catch (error) {
        console.log("Error al crear el producto:", error.message);
        process.exitCode = 1;
    }
}

// Elegir la operación según el comando ingresado
switch (args[0]?.toUpperCase()) {
    case "GET":
        if (args[1] === "products" || /^products\/[1-9]\d*$/.test(args[1] || "")) {
            const productos = await obtenerProductos(args[1]);
            if (productos === null) {
                if (process.exitCode !== 1) console.log("Producto no encontrado");
            } else {
                console.log(productos);
            }
        } else {
            console.log("Comando GET incompleto o incorrecto");
        }
        break;

    case "POST":
        if (args[1] === "products" && args.length === 5 &&
            args[2].trim() && args[4].trim() && args[3].trim() &&
            Number.isFinite(Number(args[3])) && Number(args[3]) > 0) {
            const producto = {
                title: args[2],
                price: Number(args[3]),
                category: args[4]
            };
            await crearProducto(producto);
        } else {
            console.log("Comando POST incompleto o incorrecto");
        }
        break;

    case "DELETE":
        if (/^products\/[1-9]\d*$/.test(args[1] || "")) {
            const respuesta = await eliminarProducto(args[1]);
            if (respuesta === null) {
                if (process.exitCode !== 1) console.log("Producto no encontrado");
            } else {
                console.log("Respuesta de eliminación:", respuesta);
            }
        } else {
            console.log("Comando DELETE incompleto o incorrecto");
        }
        break;

    default:
        console.log("Comando incorrecto. Usá GET, POST o DELETE.");
}
