const argumentos = process.argv.slice(2);

const [metodo, recurso] = argumentos;

async function obtenerProductos() {
    try {
        const respuesta = await fetch("https://fakestoreapi.com/products");

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const productos = await respuesta.json();

        console.log(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error.message);
    }
}

if (metodo === "GET" && recurso === "products") {
    obtenerProductos();
} else {
    console.log("Comando no reconocido");
}