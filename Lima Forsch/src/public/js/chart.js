let miCanvas=document.getElementById("miGrafica").getContext("2d");
var chart = new Chart(miCanvas,{
type: "bar",
data: {
    labels:["y","de","a","es","tal","ese","si","como"],
    datasets: [
        {
            label: "Repeticiones",
            backgroundColor: ["#98bd9d"],
            data:[12,19.5,5,30,4,5,6,7]
        },
    ],
}
});


