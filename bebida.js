// Firebase Config
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "cafeteria-96b83.firebaseapp.com",
  projectId: "cafeteria-96b83",
  storageBucket: "cafeteria-96b83.appspot.com",
  messagingSenderId: "1076748169985",
  appId: "1:1076748169985:web:6d8b25fccad7e246756100",
  measurementId: "G-CGX7RXHK1F"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Agregar documentos
function guardar() {
  var bebida = document.getElementById('bebida').value;
  var descripcion = document.getElementById('descripcion').value;
  var tipo = document.getElementById('tipo').value;
  var sabor = document.getElementById('sabor').value;
  var valor = document.getElementById('valor').value;

  db.collection("bebidas").add({
    bebida: bebida,
    descripcion: descripcion,
    tipo: tipo,
    sabor: sabor,
    valor: valor
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    limpiarFormulario();
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

function limpiarFormulario() {
  document.getElementById('bebida').value = '';
  document.getElementById('descripcion').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('sabor').value = '';
  document.getElementById('valor').value = '';
}

// Leer documentos
var tabla = document.getElementById('tabla');
db.collection("bebidas").onSnapshot((querySnapshot) => {
  tabla.innerHTML = ``;
  querySnapshot.forEach((doc) => {
    tabla.innerHTML += `
    <tr>
      <th scope="row">${doc.id}</th>
      <td>${doc.data().bebida}</td>
      <td>${doc.data().descripcion}</td>
      <td>${doc.data().tipo}</td>
      <td>${doc.data().sabor}</td>
      <td>${doc.data().valor}</td>
      <td><button class="btn btn-danger" onclick=eliminar('${doc.id}')>Eliminar</button></td>
      <td><button class="btn btn-warning" onclick=editar('${doc.id}','${doc.data().bebida}','${doc.data().descripcion}','${doc.data().tipo}','${doc.data().sabor}','${doc.data().valor}')>Editar</button></td>
    </tr>`;
  });
});

// Borrar documentos
function eliminar(id) {
  db.collection("bebidas").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

// Editar documentos
function editar(id, bebida, descripcion, tipo, sabor, valor) {
  document.getElementById('bebida').value = bebida;
  document.getElementById('descripcion').value = descripcion;
  document.getElementById('tipo').value = tipo;
  document.getElementById('sabor').value = sabor;
  document.getElementById('valor').value = valor;
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Editar';

  boton.onclick = function() {
    var bebida = document.getElementById('bebida').value;
    var descripcion = document.getElementById('descripcion').value;
    var tipo = document.getElementById('tipo').value;
    var sabor = document.getElementById('sabor').value;
    var valor = document.getElementById('valor').value;

    return db.collection("bebidas").doc(id).update({
      bebida: bebida,
      descripcion: descripcion,
      tipo: tipo,
      sabor: sabor,
      valor: valor
    })
    .then(() => {
      console.log("Document successfully updated!");
      limpiarFormulario();
      boton.innerHTML = 'Guardar';
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
}
