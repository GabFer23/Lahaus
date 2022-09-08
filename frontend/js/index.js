
const onContentLoaded = async () => {
    const resp = await fetch('http://localhost:8080/api/v1/categoria');
    const data = await resp.json();
    console.log(data);
};

window.addEventListener('DOMContentLoaded', onContentLoaded);