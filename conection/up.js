document.addEventListener('DOMContentLoaded', function() {
    const btnUpload = document.getElementById('btn1');
    const fileInput = document.getElementById('file');

    // Escucha el clic en el botón de subida
    btnUpload.addEventListener('click', function() {
        console.log("Botón de subir clickeado. Abriendo el selector de archivos...");
        fileInput.click(); // Simula un clic en el input de archivo
    });

    // Escucha el cambio en el input de archivo
    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        if (file) {
            console.log('Video seleccionado:', file.name);
            console.log('Tamaño del archivo:', file.size, 'bytes');
            console.log('Tipo de archivo:', file.type);
            // Llama a la función para enviar el archivo al back-end
            uploadVideo(file);
        } else {
            console.log('No se ha seleccionado ningún archivo.');
        }
    });

    function uploadVideo(file) {
        const formData = new FormData();
        formData.append('file', file); 
        formData.append('upload_preset', 'signai');

        console.log("Preparando para subir el video a Cloudinary...");

        // Step 1: Upload to Cloudinary
        fetch('https://api.cloudinary.com/v1_1/dzonya1wx/video/upload', { 
            method: 'POST',
            headers: {
                'Authorization': 'Basic MTI5NTU3OTQzNzU1NzQyOk9rWFZPQzkwWVJJNWxTbWowZklTOEVmTzZ6cw=='
            },
            body: formData
        })
        .then(response => {
            console.log('Respuesta de Cloudinary recibida:', response); 
            return response.json();
        })
        .then(data => {
            console.log('Datos devueltos por Cloudinary:', data);
            if (data && data.secure_url) {
                console.log("Video subido exitosamente a Cloudinary:", data.secure_url);

                // Step 2: Get translation from SignAI API
                return fetch(`https://signai.fdiaznem.com.ar/predict_gemini?video_url=${encodeURIComponent(data.secure_url)}`)
                    .then(response => response.json())
                    .then(translationData => {
                        console.log('Traducción recibida:', translationData);

                        // Display the translation to the user
                        alert("Traducción: " + translationData.translation);

                        return translationData;
                    });
            } else {
                throw new Error("No se recibió la URL segura del video");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error en el proceso: " + error.message);
        });

    }

});
