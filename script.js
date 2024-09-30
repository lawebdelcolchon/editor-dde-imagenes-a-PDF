const canvas = new fabric.Canvas('canvas');
const upload = document.getElementById('upload');

upload.addEventListener('change', (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
            img.set({
                left: 100,
                top: 100,
                scaleX: 0.5,
                scaleY: 0.5,
            });
            canvas.add(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('grayscale').addEventListener('click', () => {
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
        if (obj.type === 'image') {
            obj.filters.push(new fabric.Image.filters.Grayscale());
            obj.applyFilters();
        }
    });
    canvas.renderAll();
});

document.getElementById('exportPDF').addEventListener('click', () => {
    html2canvas(document.querySelector('canvas')).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('imagen.pdf');
    });
});
