// Manejo del formulario de código
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const email = document.getElementById('email').value; // Asegúrate de que este email esté disponible
    const code = document.getElementById('codigo').value;

    // Verificar el código ingresado
    fetch('http://localhost:3000/verify-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Muestra mensaje según el resultado
        if (data.message === 'Código verificado con éxito') {
            window.location.href = './datos.html'; // Redirige a la página de datos si el código es correcto
        }
    })
    .catch(error => {
        alert('Error al verificar el código');
        console.error(error);
    });
});
