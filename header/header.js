function header() {
    return `
    
        <header class="header">
            <div class="logo">
                <img src="../imgs/logofi.png" >
            </div>
            <ul class="menuu">
                <li>
                    <a href="#"> <img src="../imgs/menuf.png" alt="" class="img5" id="fotito"></a>
                </li>
            </ul> 
        </header>
        <div id="dropdown">
            <ul class="ul1">
                Translator
                <a href="../4pantalla/index.html" class="tr">
                    New Translation
                </a>
            </ul>
            <ul class="ul1">
                
                <a href="../1pantalla/index.html" class="tr">Home</a>
                <a href="../7pantalla/index.html" class="tr">My account</a>
                <a href="" class="tr">Sign-out</a>
            </ul>
            <ul class="ul1">
                Dev´s
                <a href="" class="tr" id="1"> Credits</a>
            </ul>
        </div>`
};

function agregarHeader() {
    document.addEventListener('DOMContentLoaded', () => {
        const body = document.querySelector("body");
        body.innerHTML += header();
        const panelHeader = document.getElementById('fotito');
        const panelContent = document.getElementById('dropdown');

        panelHeader.addEventListener('click', () => {
            // Alternar la clase 'show' para mostrar/ocultar el contenido
            panelContent.classList.toggle('mostrar');
        });

        // Cerrar el panel si se hace clic fuera de él
        document.addEventListener('click', (event) => {
            if (!panelHeader.contains(event.target) && !panelContent.contains(event.target)) {
                panelContent.classList.remove('mostrar');
            }
        });

        body.innerHTML += upload();
        const panelheader = document.getElementById('fot');
        const panelcontent = document.getElementById('drop');

        panelheader.addEventListener('click', () => {
            panelcontent.classList.toggle('mostrar');
        });
        document.addEventListener('click', (event) => {
            if (!panelheader.contains(event.target) && !panelcontent.contains(event.target)) {
                panelcontent.classList.remove('mostrar');
            }
        });

    });
}
