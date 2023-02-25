export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = MensajeDeError(tipoDeInput,input)
    }

}


const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",



];
const mesajesError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"

    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Contraseña requerida, agregar minimo 6 caracteres",
        
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18  años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",

    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La Ciudad debe contener entre 10 a 40 caracteres",

    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El Estado debe contener entre 10 a 40 caracteres",

    }

}


const validadores = {
    nacimiento: (input) => validadrNacimiento(input),
};

function MensajeDeError(tipoDeInput,input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(error)
            console.log(input.validity[error]);
            console.log(mesajesError[tipoDeInput][error])
            mensaje =  mesajesError[tipoDeInput][error]
        }
    })

    return mensaje
}

function validadrNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
   if(!mayorEdad(fechaCliente)){
     mensaje = "Debes tener al menos 18  años de edad";
   }
 
    input.setCustomValidity(mensaje);
 };
 
 function mayorEdad(fecha){
     const fechaActual = new Date();
     const diferenciaFechas = new Date(
           fecha.getUTCFullYear() + 18,
           fecha.getUTCMonth(),
           fecha.getUTCDate()
         );
     return diferenciaFechas <= fechaActual;
 
 
 };