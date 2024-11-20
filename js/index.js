const emailForm = document.getElementById('emailForm');
const loginForm = document.getElementById('loginForm');

const emailInput = document.getElementById('email');
const codigoInput = document.getElementById('codigo');

// Validar el correo y enviar el código
emailForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value;

    fetch('http://localhost:3000/send-code', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert(data.error); // Muestra el error si no se pudo enviar el correo
      } else {
          alert(data.message); // Mensaje de éxito
  
          // Ocultar el formulario de correo y mostrar el formulario de código
          emailForm.style.display = 'none';
          loginForm.style.display = 'block';
      }
  })
  .catch(error => {
      console.error('Error al enviar el correo:', error);
  });
  
});

// Validar el código ingresado
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = emailInput.value;
    const code = codigoInput.value;

    // Hacer una validación del código ingresado en el backend aquí si lo deseas
    // Para este ejemplo, asumimos que la validación se realiza de manera similar a lo mostrado anteriormente
});
