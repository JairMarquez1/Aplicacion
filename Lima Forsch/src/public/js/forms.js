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