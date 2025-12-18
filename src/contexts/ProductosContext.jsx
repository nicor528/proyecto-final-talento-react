import React, { createContext, useState, useContext } from 'react';
import { useAuthContext } from './AuthContext';
// Crear el contexto de de los productos
const ProductosContext = createContext();

export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState([])
    const [token, setToken] = useState("")

    function obtenerProductos() {
        return(
            new Promise((res, rej) => {
                fetch(`${import.meta.env.VITE_url_back}api/products`)
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        console.log(datos)
                        setProductos(datos)
                        setProductosOriginales(datos)
                        res(datos)
                    })
                    .catch((error) => {
                        console.log("Error", error)
                        rej(error)
                    })
                ;
            })
        )
    }

    const agregarProducto = (producto) => {
        const adminToken = localStorage.getItem("adminToken")
        console.log(adminToken)
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch(`${import.meta.env.VITE_url_back}api/products/create`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${adminToken}`,
                        },
                        body: JSON.stringify(producto),
                    });

                    if (!respuesta.ok) {
                            throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                            console.log('Producto agregado:', data);
                            res(data)
                            //alert('Producto agregado correctamente');
                    } catch (error) {
                        console.error(error.message);
                        //alert('Hubo un problema al agregar el producto.');
                        rej(error.message)
                    }
            })
        )
    };

    function obtenerProducto(id){
        return(
            new Promise((res, rej) => {
               fetch(`${import.meta.env.VITE_url_back}api/products/${id}`)
                .then((res) => res.json())
                .then((datos) => {
                    if (datos) {
                    setProductoEncontrado({...datos, id: id});
                    console.log("datos desde el back: ",{...datos, id: id})
                    res({...datos, id: id})
                    } else {
                        rej("Producto no encontrado")
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
            })
        )
    }

    function editarProducto(producto){
        const adminToken = localStorage.getItem("adminToken")
        console.log(adminToken)
        return(
            new Promise(async(res, rej) => {
            try {
                const respuesta = await fetch(`${import.meta.env.VITE_url_back}api/products/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${adminToken}`,
                    },
                    body: JSON.stringify(producto),
                });
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el producto.');
                }
                const data = await respuesta.json();
                res(data)
            } catch (error) {
                console.error(error.message);
                rej(error)
            }
            })
        )
    }

    const eliminarProducto = (id) => {
        const adminToken = localStorage.getItem("adminToken")
        console.log(adminToken)
        const confirmar = window.confirm('¿Estás seguro de eliminar?');
        if (confirmar) {
            return(
                new Promise(async (res, rej) => {
                    try {
                        const respuesta = await fetch(`${import.meta.env.VITE_url_back}api/products/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization' : `Bearer ${adminToken}`,
                            },
                        });
                        if (!respuesta.ok) throw new Error('Error al eliminar');
                        alert('Producto eliminado correctamente.');
                        res()
                    } catch (error) {
                        console.error(error.message);
                        alert('Hubo un problema al eliminar el producto.');
                        rej(error)
                    }
                })
            )
        }
    }

    function filtrarProductos(filtro){
        if(filtro.length < 0){
            setProductos(productosOriginales)
            return;
        }

        const productosFiltrados = productosOriginales.filter((producto) =>
            producto.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        setProductos(productosFiltrados)
    }

    return (
        <ProductosContext.Provider value={{ filtrarProductos, obtenerProductos, productos, agregarProducto, obtenerProducto, productoEncontrado, editarProducto, eliminarProducto }}>
        {children}
        </ProductosContext.Provider> 
    );
}
export const useProductosContext = () => useContext(ProductosContext);