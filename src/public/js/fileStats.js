async function showStats(ext,nombre,url){
  ext = ext.toLowerCase();
  var contenido
  if (ext != 'txt' && ext != 'js'){
    var x = await urlToText(url,ext);
    contenido = x;
  }
  else{
    var res = await fetch(url).then(res=>res.text()).then(x=> {
      x = x.toLocaleLowerCase();
      contenido = x
    });
  }

  var f = {
    nombre : nombre,
    ext : ext,
    parrafos : 1,
    lineas : 0,
    palabras : 0,
    palabrasUnicas : 0,
    caracteres : 0,
    frecuencias : [],
    masFrecuentes : [],
  }


  if (['txt','js','docx','doc','pdf','xlsx','xls'].includes(ext)){
    //Se cuentan los caracteres
    f.caracteres = contenido.length;
    //-
    contenido = contenido.replaceAll(/[^A-Za-zÀ-ÿ\n \r123456789]/ig, " ");
    //Se cuentan los parrafos
    try{f.parrafos+= contenido.match(/[\r\n]{2,}[A-Za-zÀ-ÿ_ 123456789]/ig).length;}catch{}
    console.log(contenido.replaceAll(/[\r\n]{2,}[A-Za-zÀ-ÿ_ 123456789]/ig, "\n"));
    //Se cuentan las lineas
    if (ext == 'pdf'){
      f.lineas = contenido.split('  ')
      removeItem(f.lineas, '');
      removeItem(f.lineas, ' ');
      f.lineas = f.lineas.length;
    }
    else{
      f.lineas = contenido.split(/[\r\n]+/).length;
    }
    //Se crea el arreglo de palabras
    contenido = contenido.replaceAll(/[\n\s\r]+/ig,' ');
    contenido = contenido.split(' ');
    contenido = contenido.map(palabra => palabra.toLowerCase());
    removeItem(contenido,'');
    //Se cuentan las palabras
    f.palabras = contenido.length;
    var set = new Set(contenido);
    f.palabrasUnicas = set.size;

    //Se obtienen las palabras más frecuentes
    function Counter(array) {
      array.forEach(val => this[val] = (this[val] || 0) + 1);
    }
    list = new Counter(contenido)
    //https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]})
    keysSorted = keysSorted.reverse().slice(0,15);
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    i = 0;
    keysSorted.forEach((w) => {
      f.frecuencias[i] = countOccurrences(contenido,w);
      i++;
    } )
    f.masFrecuentes = keysSorted;

    console.log('ff', f.frecuencias)
    console.log('car: ',f.caracteres);
    console.log('line: ',f.lineas); 
    console.log('pal: ',f.palabras);
    console.log('paluniq', f.palabrasUnicas);
    console.log('par: ', f.parrafos);
    console.log(contenido); 
    console.log(keysSorted);
  }

  imprimirVentana(f);
  graficarPalabras(f.masFrecuentes,f.frecuencias);

  var parr = document.getElementById('parr');
  var lin = document.getElementById('lin');
    if (['pdf', 'xlsx', 'xls'].includes(ext)){
        parr.remove();  
        if (['xlsx', 'xls'].includes(ext))
          lin.remove();
    }

}

function graficarPalabras(labs, freq){
    datos = freq;
    Chart.defaults.font.size = 12;
    let miCanvas=document.getElementById("miGrafica").getContext("2d");
    var chart = new Chart(miCanvas,{
    type: "bar",
    options: {
      indexAxis: 'y',
      scales: {
        yAxes: {ticks: {mirror: true}}
      },
      plugins: {
        legend: { display: false },
        title: { display: false, text: 'Analisis'}
      }
    },
    data: {
        labels: labs,
        datasets: [
          {
            data:datos,    
            borderWidth: 1,     
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ]
          }
        ]
      }
    });

}

function removeItem(array, item) {
var i = array.length;

while (i--) {
    if (array[i] === item) {
        array.splice(array.indexOf(item), 1);
    }
}
}
