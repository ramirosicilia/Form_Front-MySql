
import { validarFormularioIngreso } from "./validaciones/ValidacionesIngreso.js"; 
import { urlBackend } from "./variablesEntorno.js"


const formularioIngreso = document.getElementById("formulario"); 
console.log(formularioIngreso) 



formularioIngreso.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  let inputNombre = document.querySelector(".nombre").value;
  let inputApellido = document.querySelector(".apellido").value;
  let emailEmpleado = document.querySelector(".email__empleado").value;
  let usuarioEmpleado = document.querySelector(".usuario__empleados").value; 
  let usuarioContraseña = document.querySelector(".usuario__contraseña").value; 
  let inputImagen = document.querySelector(".imagen").files[0];


  localStorage.setItem("email",JSON.stringify(emailEmpleado)) 

  // Llamar a la función de validación
  if (!validarFormularioIngreso()) {
    return; // Si hay errores, no continuar
  } 

 

  try {  

    let formData=new FormData()  

    formData.append("nombre",inputNombre) 
    formData.append("apellido",inputApellido)
    formData.append("email",emailEmpleado)
    formData.append("usuario",usuarioEmpleado)
    formData.append("contrasena",usuarioContraseña)
    formData.append("imagen",inputImagen)

    
    const response = await fetch(`${urlBackend}/formulario`, {
      method: "POST",
      body:formData
    }); 
    console.log(response)


    

    // Asegúrate de que la respuesta es correcta antes de procesar 
   
    if (!response.ok) {
      console.log(await response.json())
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response)
    let data = await response.json(); 
    console.log(data)

    // Manejar la respuesta del servidor
    if (!data) {
      alert(data.error);
    } 

      alert(`Por favor, ${data.nombre} verifique su email para continuar`); 

      // Detectar el dominio del correo
      const emailDomain = emailEmpleado.split('@')[1]; 
      console.log(emailDomain)
      let redirectUrl;

      // Redirigir según el dominio
      if (emailDomain === 'gmail.com') {
        redirectUrl = 'https://mail.google.com/';
      } else if (emailDomain === 'hotmail.com' || emailDomain === 'live.com') {
        redirectUrl = 'https://outlook.live.com/'; 
      } else if (emailDomain === 'yahoo.com') {
        redirectUrl = 'https://mail.yahoo.com/';
      } else {
        alert("Dominio de correo no soportado. Por favor, accede a tu proveedor de correo directamente.");
        return; // Si no es un dominio soportado, salir de la función
      }

      // Redirigir al usuario al home del correo
      window.location.href = redirectUrl;
      
    }
      
    

    
   catch (err) {
    console.log("Error al enviar los datos:", err);
    alert("hubo un error en la conexion, vamos no te desanimes!!!");
  }

  e.target.reset(); // Resetea el formulario después de enviar
});
