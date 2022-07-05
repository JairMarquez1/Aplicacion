const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector('#btn1');
const input = dropArea.querySelector("#input-file");
var files;
var progress = document.querySelector('.percent');

let list = new DataTransfer();

let myFileList = list.files;

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", handleFiles, false);

function handleFiles(e, newFiles = null){
    console.log('inputfiles', this.files);
    console.log('test', this.value);
    //console.log('e',e);
    if (newFiles == null){
        newFiles = this.files;
        console.log('seleccionado');
    }
    else
        console.log('dropeado');
    console.log('newFiles:',newFiles);
    for (var i =  0; i < newFiles.length ; i++)
        list.items.add(newFiles[i]);
    console.log('Lista:',list.files);
    showFiles(newFiles);
}

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos"
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta los archivos"
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    handleFiles(null,files);

    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta los archivos"
});

function showFiles(files){
    if(files.length == undefined){
        processFile(files);
    }else{
        for(file of files){
            processFile(file);
        }
    }
}

function processFile(file){
    const doctType = file.type;
    
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.onprogress = updateProgress;
    fileReader.onloadstart = function(e) {document.getElementById('progress_bar').className = 'loading';};
    fileReader.onload = function(e){
        //Se actualiza la barra de progreso y desaparece después de 2 segundos
        progress.style.width = '100%';
        progress.textContent = '100%';
        setTimeout(() => {document.getElementById('progress_bar').className=''}, 1000);

        //Se añade el archivo a la lista
        const fileUrl = fileReader.result;
        const image = `
            <div id="${id}" class="file-container">
                <div class="status">
                    <span>${file.name}</span>
                </div>
            </div>
        `;
        const html = document.querySelector("#preview").innerHTML;
        document.querySelector("#preview").innerHTML = image + html;  
    }

    console.log('insertedFile:',file);
    fileReader.readAsDataURL(file);
    uploadFile(file, id);

}

function updateProgress(evt) {
    //evt = ProgressEvent.
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // Incrementa el tamaño de la barra de progreso
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}

function uploadFile(file, id){}