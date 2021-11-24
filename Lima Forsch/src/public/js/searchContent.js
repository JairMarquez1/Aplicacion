var coincidencias = [];
var docToText = new DocToText();
var err = 0;
var tablaArchivos = document.getElementById('tabla_archivos');

async function filtrarPorContenido(obj,string_search){
    document.getElementById('table-scroll').innerHTML = 
    `<table id="tabla_archivos" width="100%">
      <thead style="text-align:left">
        <tr>
        <th>Nombre</th>
        <th>Fecha</th>
        <th>Tamaño</th>
        <th>Autor</th>
        </tr>
      </thead>
    <tbody>
    </tbody>
  </table>
    `;
    if (err == 0){
      err = 1;
      const array = Object.values(JSON.parse(obj));
      coincidencias = [];
      for (var i = 0 ; i < array.length ; i++) {
        var doc = array[i];
        var url = doc.ubicacion ;
        var ext = doc.extension;
        if (ext != 'txt'){
          await searchContent(url,ext,string_search,doc);
        }
        else{
          await searchContentTxt(url,string_search,doc);
        }
        console.log(coincidencias);
      }
    }
    setTimeout(function(){ err = 0; }, 3000);
    fileTableFormat();
}

async function searchContent(url,ext,str,doc){
  var x = await urlToText(url,ext);
  x = x.toLocaleLowerCase();
  console.log(x);
  if (x.indexOf(str) >= 0){
    console.log('owo', x.indexOf(str));
    coincidencias.push(doc);
    var tablaArchivos = document.getElementById('tabla_archivos');
    tablaArchivos.getElementsByTagName('tbody')[0].innerHTML += 
    `<tr class="${doc.extension}" onclick="preview(this,${doc.nivel})">
      <td class="nombre" title="${doc.nombre}"><i class="${doc.extension}" style="margin-right:5px;"></i>${doc.nombre}</td>
      <td class="fecha" title="${doc.fecha}">${doc.fecha}</td>
      <td class="tamano">${doc.tamano}</td>
      <td class="propietario">${doc.propietario}</td>
    </tr>`;
  }
}

async function searchContentTxt(url,str,doc){
  var res = await fetch(url).then(res=>res.text()).then(x=> {
      x = x.toLocaleLowerCase();
      if (x.indexOf(str) >= 0){
        console.log('owo', x.indexOf(str));
        coincidencias.push(doc);
        var tablaArchivos = document.getElementById('tabla_archivos');
        tablaArchivos.getElementsByTagName('tbody')[0].innerHTML += 
        `<tr class="${doc.extension}" onclick="preview(this,${doc.nivel})">
          <td class="nombre" title="${doc.nombre}"><i class="${doc.extension}" style="margin-right:5px;"></i>${doc.nombre}</td>
          <td class="fecha" title="${doc.fecha}">${doc.fecha}</td>
          <td class="tamano">${doc.tamano}</td>
          <td class="propietario">${doc.propietario}</td>
        </tr>`;
      }
  });
}

function tableReload(){
  try{table.destroy();}catch(e){console.log(e)}
  fileTableFormat();
  table = $('#tabla_archivos').DataTable({
  "bPaginate": false,
  columnDefs: [{ type: 'file-size', targets: 2 }],
  order: [0, 'desc'],
  language: {
      'search': 'Filtrar: ',
      'info': '',
      'lengthMenu': 'Mostrar _MENU_ resultados',
  }
  });

}

//https://www.cssscript.com/extract-text-from-document/
async function urlToText(url,ext){
    console.log(ext);
    text = await docToText.extractToText(url, ext);
    return text.replaceAll(',','');
}
