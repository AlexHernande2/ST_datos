  const passwordXdef = "contraseña123";

  // Evento para validar el formulario al enviarlo
  document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Evita el envío automático del formulario
        //los dat del formula
      const password = document.getElementById("password").value;

      // Verifica si las credenciales son correctas
      if ( password === passwordXdef) {
         //lo envia a la tabla de datos
          window.location.href = "datos.html";
      } else {
          // alerta es como un aviso en la parte superior
          alert("Usuario o contraseña incorrectos.");
      }
  });