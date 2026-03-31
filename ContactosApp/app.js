function mostrarContactos() {
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";
            const contactos = data.data || data;

            contactos.forEach((contacto) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td>
                        <button class="btn btn-sm btn-danger delete-btn">Eliminar</button>
                    </td>
                `;

                const botonEliminar = tr.querySelector(".delete-btn");
                botonEliminar.addEventListener("click", () => {
                    if (confirm(`¿Estás seguro de que deseas eliminar a ${contacto.nombre}?`)) {
                        eliminarContacto(contacto.id);
                    }
                });

                tbody.appendChild(tr);
            });
        })
        .catch((error) => console.error("Error al obtener los contactos:", error));
}
function eliminarContacto(id) {
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((response) => {
            if (response.ok) {
                mostrarContactos();
            } else {
                console.error("Error al eliminar.");
            }
        })
        .catch((error) => console.error("Error de red:", error));
}
const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    if (nombre.trim() === "" || telefono.trim() === "") {
        alert("⚠️ Por favor, llena todos los campos antes de enviar.");
    }

    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombre,
            telefono: telefono
        })
    })
        .then((response) => response.json())
        .then(() => {
            alert("✅ ¡Contacto agregado exitosamente!");

            mostrarContactos();
            form.reset();
        })
        .catch((error) => console.error("Error al crear el contacto:", error));
});
const btnRefrescar = document.getElementById("btnRefrescar");
if (btnRefrescar) {
    btnRefrescar.addEventListener("click", mostrarContactos);
}
mostrarContactos();