//Variáveis e seleção de elementos
const apiKey = "Sua chave aqui rs";
const apiPaisUrl = "https://countryflagsapi.com/png/";

const cidadeInput = document.querySelector("#input-cidade");
const searchBtn = document.querySelector("#search");

const cidadeElemento = document.querySelector("#cidade");
const temperaturaEmento = document.querySelector("#temperatura span");
const descricaoElemento = document.querySelector("#descricao");
const iconeMetereologicoElemento = document.querySelector("#icon-metereologico");
const paisElemento = document.querySelector("#pais");
const umidadeElemento = document.querySelector("#umidade span");
const ventoElemento = document.querySelector("#vento span");

const containerMetereologico = document.querySelector("#dados-metereologicos");

//Funções
const buscarDadosMetereologicos = async (cidade) => {
    const apiMetereologicaURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiMetereologicaURL)
    const dados = await res.json()
    return dados;
};

const mostrarDadosMetereologicos = async (cidade) => {
    const dados = await buscarDadosMetereologicos(cidade);

    cidadeElemento.innerText = dados.name;
    temperaturaEmento.innerText = parseInt(dados.main.temp);
    descricaoElemento.innerText = dados.weather[0].description;
    iconeMetereologicoElemento.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`);
    paisElemento.setAttribute("src", apiPaisUrl + dados.sys.country);
    umidadeElemento.innerText = `${dados.main.humidity}%`;
    ventoElemento.innerText = `${dados.wind.speed}km/h`;

    containerMetereologico.classList.remove("hide");
};


//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const cidade = cidadeInput.value;

    mostrarDadosMetereologicos(cidade);
});

cidadeInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const cidade = e.target.value;
        buscarDadosMetereologicos(cidade);
    }
})