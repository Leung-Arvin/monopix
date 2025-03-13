import init, { apply_grayscale } from './pkg/monopix.js';

let imageElement = document.getElementById('image');
let applyGrayscaleBtn = document.getElementById('applyGrayscaleBtn');
let fileInput = document.getElementById('fileInput');

let canvas = document.createElement('canvas'); 
let ctx = canvas.getContext('2d');

init().then(() => {
    console.log('WebAssembly initialized successfully');
    
    fileInput.addEventListener('change', handleFileUpload);
    
    applyGrayscaleBtn.addEventListener('click', applyGrayscaleFilter);
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imageElement.src = e.target.result;
            imageElement.onload = function() {
                canvas.width = imageElement.width;
                canvas.height = imageElement.height;
                ctx.drawImage(imageElement, 0, 0);
                applyGrayscaleBtn.disabled = false;
            };
        };
        
        reader.readAsDataURL(file);
    }
}

function applyGrayscaleFilter() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;

    apply_grayscale(pixelData, imageData.width, imageData.height);
    
    ctx.putImageData(imageData, 0, 0);

    imageElement.src = canvas.toDataURL(); 
}
