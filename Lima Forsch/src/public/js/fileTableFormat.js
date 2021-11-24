var contenido = document.getElementById('contenido');
var lateral = document.getElementById('lateral');
var iconoPrev = document.getElementById('file-icon');
var nombrePrev = document.getElementById('nombrePrev');
var tipoPrev = document.getElementById('tipoPrev');
var tamanoPrev = document.getElementById('tamanoPrev');
var fechaPrev = document.getElementById('fechaPrev');
var autorPrev = document.getElementById('autorPrev');
var nivelPrev = document.getElementById('nivelPrev');

function fileTableFormat(){
    fechas = Array.from(document.getElementsByClassName('fecha'));
    fechas.forEach(fecha =>{
        var d = new Date(parseInt(fecha.textContent));
        d = d.toISOString().replace('T',' &nbsp ').replace('Z',' ').replaceAll('-','/').substring(0,25);
        fecha.innerHTML = d;
    });

    iconos = Array.from(document.getElementsByTagName('i'));
    iconos.forEach(icono =>{
        var tipo = getType(icono.className);
        icono.className = 'fa fa-file' + tipo[0]  + '-o';
        icono.style.color = tipo[1];
    })

    pesos = Array.from(document.getElementsByClassName('tamano'));
    pesos.forEach(peso=>{
        var p = formatBytes(parseInt(peso.textContent));
        peso.innerHTML = p;
    })
}

function preview(e, nivel){
     contenido = document.getElementById('contenido');
     lateral = document.getElementById('lateral');
     iconoPrev = document.getElementById('file-icon');
     nombrePrev = document.getElementById('nombrePrev');
     tipoPrev = document.getElementById('tipoPrev');
     tamanoPrev = document.getElementById('tamanoPrev');
     fechaPrev = document.getElementById('fechaPrev');
     autorPrev = document.getElementById('autorPrev');
     nivelPrev = document.getElementById('nivelPrev');

    var icono = e.getElementsByTagName('i')[0].className;
    var color = e.getElementsByTagName('i')[0].style.color;
    var nombre = e.getElementsByClassName('nombre')[0].textContent;
    var autor = e.getElementsByClassName('propietario')[0].textContent;
    var tamano = e.getElementsByClassName('tamano')[0].textContent;
    var fecha = e.getElementsByClassName('fecha')[0].textContent;
    iconoPrev.className = icono;
    iconoPrev.style.color = color;
    nombrePrev.innerHTML = nombre;
    tipoPrev.innerHTML = e.className.toUpperCase();
    tamanoPrev.innerHTML = tamano;
    fechaPrev.innerHTML = fecha;
    autorPrev.innerHTML = autor; 
    nivelPrev.innerHTML = nivel;
    if (lateral.style.visibility == 'hidden'){
      lateral.style.visibility = 'initial';
      lateral.style.position = 'initial';
      contenido.style.width = '70%';
    }
}

function hidePreview(){
    if (lateral.style.visibility == 'initial'){
      contenido.style.width = '100%';
      setTimeout(function(){
      lateral.style.visibility = 'hidden';
      lateral.style.position = 'absolute';
      }, 400);
    }
}

function getType(ext){ 
  ext = ext.toLowerCase(); 
  if (ext == 'pdf')
    return ['-pdf','orangered'];
  else if (ext.match(/(txt|ini|md)$/i))
    return ['-text','black'];
  else if (ext.match(/(doc|docx)$/i))
    return ['-word','dodgerblue'];
  else if (ext.match(/(xls|xlsx)$/i))
    return ['-excel','forestgreen'];
  else if (ext.match(/(zip|rar|tar|gzip|gz|7z)$/i))
    return ['-zip', 'gray'];
  else if (ext.match(/(jpg|jpeg|png)$/i))
    return ['-image','olive'];
  else if (ext.match(/(ppt|pptx)$/i))
    return ['-powerpoint','tomato'];
  else if (ext.match(/(mp3|wav|mp2|m4a|aac)$/i))
    return ['-audio','indigo'];
  else if(ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i))
    return ['-video','mediumpurple'];
  else if(ext.match(/(php|js|css|htm|html)$/i))
    return ['-code','goldenrod'];
  else
    return ['','black'];

}

function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 B';
  /*return Math.floor(bytes/1024);*/  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return  parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


//window.onload = fileTableFormat;