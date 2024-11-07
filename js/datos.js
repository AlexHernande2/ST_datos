//  // Función para  un nuevo item a la tabla
//  function addItem() {
//     const itemId = document.getElementById('itemId').value;
//     const itemAsunto = document.getElementById('itemAsunto').value;
//     const itemEstado = document.getElementById('itemEstado').value;

//     // Crear nueva fila para la tabla
//     const tableBody = document.getElementById('tableBody');
//     const newRow = document.createElement('tr');

//     newRow.innerHTML = `
//       <th scope="row">${itemId}</th>
//       <td>${itemAsunto}</td>
//       <td>${itemEstado}</td>
//       <td class="text-center"><button type="button" class="btn btn-success w-50">Agregar</button></td>
//     `;

//     // Añadir la nueva fila a la tabla
//     tableBody.appendChild(newRow);

//     // Limpiar los campos del formulario
//     document.getElementById('newItemForm').reset();

//     // Cerrar el modal
//     const modal = bootstrap.Modal.getInstance(document.getElementById('newItemModal'));
//     modal.hide();
//   }
//   //validación de formulario 
//   document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('newItemForm').addEventListener('submit', function(event) {
//         event.preventDefault(); // Evita el envío normal del formulario
//         if (this.checkValidity()) {
//             addItem(); 
//         } else {
//             //errores de vali
//             this.classList.add('was-validated');
//         }
//     });
// });
// Cargar datos desde el archivo JSON
fetch('../Registros.Consecutivo.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('tableBody');

    // Iterar sobre los datos y agregar filas a la tabla
    data.forEach(item => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <th scope="row">${item._id}</th>
        <td>${item.asunto}</td>
        <td>${item.estado}</td>
        <td class="text-center"><button type="button" class="btn btn-success w-50">Agregar</button></td>
      `;
      tableBody.appendChild(newRow);
    });
  })
  .catch(error => console.error('Error al cargar los datos:', error));

// Función para agregar un nuevo item a la tabla
function addItem() {
  const itemId = document.getElementById('itemId').value;
  const itemAsunto = document.getElementById('itemAsunto').value;
  const itemEstado = document.getElementById('itemEstado').value;

  // Crear nueva fila para la tabla
  const tableBody = document.getElementById('tableBody');
  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <th scope="row">${itemId}</th>
    <td>${itemAsunto}</td>
    <td>${itemEstado}</td>
    <td class="text-center"><button type="button" class="btn btn-success w-50">Agregar</button></td>
  `;

  // Añadir la nueva fila a la tabla
  tableBody.appendChild(newRow);

  // Limpiar los campos del formulario
  document.getElementById('newItemForm').reset();

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('newItemModal'));
  modal.hide();
}

// Validación de formulario
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('newItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío normal del formulario
    if (this.checkValidity()) {
      addItem(); 
    } else {
      // Errores de validación
      this.classList.add('was-validated');
    }
  });
});
