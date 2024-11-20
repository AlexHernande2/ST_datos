document.getElementById('emailForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/validate-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        console.log('Estado de respuesta:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error desconocido');
        }

        const data = await response.json();
        alert(data.message);

        if (data.message === 'Código enviado al correo') {
            window.location.href = './html/contrasena.html';
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert(error.message); // Esto mostrará el mensaje claro desde el servidor
    }
});
