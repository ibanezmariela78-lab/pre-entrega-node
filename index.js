const argumentos = process.argv.slice(2);

const [metodo, recurso, ...datos] = argumentos;

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

async function obtenerProductoPorId(id) {
    try {
        const respuesta = await fetch(`https://fakestoreapi.com/products/${id}`);

        if (!respuesta.ok) {
            throw new Error(`Error en la petición: ${respuesta.status}`);
        }

        const producto = await respuesta.json();

        console.log(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error.message);
    }
}

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

        console.log(productoCreado);
    } catch (error) {
        console.error("Error al crear el producto:", error.message);
    }
}

if (metodo === "GET" && recurso === "products") {
    obtenerProductos();

} else if (metodo === "GET" && recurso.startsWith("products/")) {
    const id = recurso.split("/")[1];
    obtenerProductoPorId(id);

} else if (metodo === "POST" && recurso === "products") {
    const [title, price, category] = datos;
    crearProducto(title, price, category);

} else {
    console.log("Comando no reconocido");
}