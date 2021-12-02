function graficarPalabras(labs, freq){
    datos = []
    labs.forEach((w)=>{
        console.log(freq[w]);
        datos.push(freq[w]);
    })
    
    let miCanvas=document.getElementById("miGrafica").getContext("2d");
    var chart = new Chart(miCanvas,{
    type: "bar",
    data: {
        labels: labs,
        datasets: [
            {
                label: "Repeticiones",
                backgroundColor: ["#98bd9d"],
                data: datos
            },
        ],
    }
    });

}

