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
/*
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

  */
/*

add item pero apra el json local 
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
*/

// Función para agregar un nuevo item a la tabla y subirlo a MongoDB
function addItem() {
  const itemId = document.getElementById('itemId').value;
  const itemAsunto = document.getElementById('itemAsunto').value;
  

// Verificar si el id es válido (número)
if (isNaN(itemId) || itemId === '') {
  alert('Por favor, ingrese un ID válido.');
  return;
}
 // Convertir el itemId a número
 const numericItemId = parseInt(itemId);
  // Crear el objeto con los datos del nuevo item
  const newItem = {
    id: itemId,
    asunto: itemAsunto
  };

  // Enviar los datos al servidor para que se guarde en Mongo
  fetch('http://localhost:3000/items', {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)  // Convertir el objeto a formato JSON
  })
  .then(response => response.json())
  .then(data => {
    // Si el item se ha guardado correctamente en Mongo, agregarlo a la tabla
    const tableBody = document.getElementById('tableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
      <th scope="row">${data.id}</th>
      <td>${data.asunto}</td>
      <td>${data.estado}</td>
      <td class="text-center"><button type="button" class="btn btn-success w-50">Agregar</button></td>
    `;
    tableBody.appendChild(newRow);

    // Limpiar los campos del formulario
    document.getElementById('newItemForm').reset();

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('newItemModal'));
    modal.hide();
  })
  .catch(error => console.error('Error al guardar el item en MongoDB:', error));
}

// Cargar datos desde MongoDB al cargar la página
fetch('http://localhost:3000/items')  
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('tableBody');

    // Iterar sobre los datos y agregar filas a la tabla
    data.forEach(item => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.asunto}</td>
        <td>${item.estado}</td>
        <td class="text-center"><button type="button" class="btn btn-success w-50">Agregar</button></td>
      `;
      tableBody.appendChild(newRow);
    });
  })
  .catch(error => console.error('Error al cargar los datos desde MongoDB:', error));


