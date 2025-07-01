const imageInput = document.getElementById('imageInput');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

let image = new Image();

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    image = new Image();
    image.onload = () => {
      // Ajustar tamaño del canvas al de la imagen (limitado a 500x500)
      const maxSize = 500;
      let width = image.width;
      let height = image.height;
      
      if (width > maxSize || height > maxSize) {
        const scale = Math.min(maxSize / width, maxSize / height);
        width = width * scale;
        height = height * scale;
      }
      canvas.width = width;
      canvas.height = height;
      drawMeme();
      downloadBtn.disabled = false;
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  const fontSize = Math.floor(canvas.height / 10);
  ctx.font = `bold ${fontSize}px Impact`;
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = fontSize / 10;
  ctx.textAlign = 'center';

  // Texto superior
  ctx.textBaseline = 'top';
  drawText(topTextInput.value.toUpperCase(), canvas.width / 2, 10);

  // Texto inferior
  ctx.textBaseline = 'bottom';
  drawText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
}

function drawText(text, x, y) {
  ctx.fillText(text, x, y);
  ctx.strokeText(text, x, y);
}

generateBtn.addEventListener('click', () => {
  if (!image.src) return alert('Subí una imagen primero');
  drawMeme();
});

downloadBtn.addEventListener('click', () => {
  if (!image.src) return alert('Generá un meme primero');
  const link = document.createElement('a');
  link.download = 'meme.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
