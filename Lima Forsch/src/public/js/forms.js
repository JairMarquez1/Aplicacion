function dropMenu(id){
	elemento = document.getElementById(id);
	if (elemento.style.visibility == "hidden"){
		elemento.style.visibility = "visible";
	}
	else{
        elemento.style.visibility = "hidden";
    }
}

function showPass(id){
    var x = document.getElementById("input_contrasena");
    elemento = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
        elemento.name = "eye-outline";
      } else {
        x.type = "password";
        elemento.name = "eye-off-outline";
     }

}


function validateRegisterForm() {
  var x = document.forms["registerForm"];
  if (x['nombre_registro'].value.trim() == "" || x['nombre_registro'].value == null ||  x['nombre_registro'].value.length < 3){
  	alert("El nombre es demasiado corto (mínimo 3 caractéres)");
    document.getElementById("input_nombre").style.backgroundColor = 'rgb(255,180,180)';
    return false;
  }
  else if (x['nivel_registro'].value.trim() == "" || x['nivel_registro'].value == null ||  x['nivel_registro'].value > 3 ||  x['nivel_registro'].value < 1){
  	alert("El nivel de usuario no es válido");
    document.getElementById("input_nivel").style.backgroundColor = 'rgb(255,180,180)';
    return false;
  }
  else if (x['contrasena_registro'].value.trim() == "" || x['contrasena_registro'].value == null ||  x['contrasena_registro'].value.length < 4){
  	alert("La contraseña es demasiado corta (mínimo 4 caractéres)");
    document.getElementById("input_contrasena").style.backgroundColor = 'rgb(255,180,180)';
    return false;
  }
  else{
  	return true;
  }
}


function color(element){
  element.style.backgroundColor = "";
}