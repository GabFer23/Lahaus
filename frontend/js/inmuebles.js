const getPropiedad = async () => {
    try {
        const res = await axios.get('http://localhost:8080/api/v1/propiedad?page=1&pageSize=10&sortField=fechaCreacion&sortDir=desc&q=&categoria=0&habitaciones=0&wc=0&estrato=0&objetivo=0&estado=0&localidad=0&min=0&max=0');
        if(res.status === 200) {
            console.log(res); 
            let resultado = document.querySelector('#contenedor-casas-id');
            let idVerPropiedad = res.data.content.length;
            for(let i = 0; i < res.data.content.length; i++) {
                let estructura = `
                <li class="contenedor-casas-lista" onclick="mostrarPropiedad(${idVerPropiedad})">
                    <img src="${res.data.content[i].imagenes[0].url}" alt="Vivienda">
                    <p>${res.data.content[i].titulo}</p>
                    <h3>En ${res.data.content[i].objetivo.nombre}</h3>
                    <h3>$${res.data.content[i].precio.toLocaleString('en-US')}</h3>
                    <ul class="specs-casa">
                        <li>
                            <p>Área(m²)</p>
                            <h3>${res.data.content[i].area}</h3>
                        </li>
                        <li>
                            <p>Hab.</p>
                            <h3>${res.data.content[i].habitaciones}</h3>
                        </li>
                        <li>
                            <p>Baño(s)</p>
                            <h3>${res.data.content[i].wc}</h3>
                        </li>
                    </ul>
                </li>
                `;
                resultado.innerHTML += estructura;
                idVerPropiedad--;
            }
        } else if(res.status === 401) {
            console.log(`API Invalida
            ${res}`);
        } else if(res.status === 404) {
            console.log(`La info no existe
            ${res}`);
        } else {
            console.log(`Error con la peticion
            ${res}`);
        }
    } catch (error) {
        console.log(`Error con la peticion
        ${error}`);
    }
}

getPropiedad();

const mostrarPropiedad = (idPropiedad) => { open(`http://127.0.0.1:5500/frontend/propiedad.html?id=${idPropiedad}`); }
