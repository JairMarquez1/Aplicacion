const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector('#btn1');
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener("click", (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    e.preventDefault();
    files = input.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

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
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta los archivos"
});

function showFiles(files){
    if(files.length == undefined){
        processFile(files);
    }else{
        for(const file of files){
            processFile(file);
        }
    }
}

function processFile(file){
    const doctType = file.type;
    
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener("load", (e) => {
        const fileUrl = fileReader.result;
        const image = `
            <div id="${id}" class="file-container">
                <div class="status">
                    <span>${file.name}</span>
                    <!--<span class="status-text">
                        Loading...
                    </span>-->
                </div>
            </div>
        `;
        const html = document.querySelector("#preview").innerHTML;
        document.querySelector("#preview").innerHTML = image + html;
    });

    fileReader.readAsDataURL(file);
    uploadFile(file, id);

}

function uploadFile(file){}