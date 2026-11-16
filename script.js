const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms));
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;

async function encenderTuberia() {
  const inicial = Number(document.getElementById("numInicial").value) || 0;
  const maquinas = [...document.querySelectorAll(".maquina")];
  const bolita = document.getElementById("bolita");
  const pasos = [
    (n) => triplicador(n),
    (n) => multiplicador(n, 12),
    (n) => division(n, 12),
    (n) => resto(n, 3)
  ];
  maquinas.forEach((m) => {
    m.classList.remove("lista");
    m.querySelector("output").textContent = "?";
  });
  let valorActual = inicial;
  bolita.textContent = valorActual;
  bolita.classList.add("visible");
  for (let i = 0; i < maquinas.length; i++) {
    const maquina = maquinas[i];
    bolita.style.left = `${maquina.offsetLeft + maquina.offsetWidth / 2}px`;
    bolita.style.top = `${maquina.offsetTop + maquina.offsetHeight / 2}px`;
    await esperar(reducido ? 0 : 550);
    maquina.classList.add("trabajando");
    await esperar(reducido ? 0 : 450);
    valorActual = pasos[i](valorActual);
    maquina.classList.remove("trabajando");
    maquina.classList.add("lista");
    maquina.querySelector("output").textContent = Number.isInteger(valorActual) ? valorActual : valorActual.toFixed(2);
    bolita.textContent = maquina.querySelector("output").textContent;
  }
  await esperar(reducido ? 0 : 400);
  bolita.classList.remove("visible");
}

function dibujarContar() {
  const deA = Math.max(1, Number(document.getElementById("deA").value) || 1);
  const hasta = Math.min(500, Number(document.getElementById("hasta").value) || 0);
  const regla = document.getElementById("regla");
  const consola = document.getElementById("consolaContar");
  regla.innerHTML = "";
  const numeros = [];
  let numero = deA;
  while (numero <= hasta) {
    numeros.push(numero);
    numero += deA;
  }
  for (let i = 1; i <= hasta; i++) {
    const marca = document.createElement("span");
    marca.className = numeros.includes(i) ? "marca activa" : "marca";
    if (numeros.includes(i)) {
      marca.dataset.numero = i;
      marca.style.animationDelay = `${numeros.indexOf(i) * 60}ms`;
    }
    regla.appendChild(marca);
  }
  consola.textContent = `> contarDeA_n(${deA}, ${hasta})\n${numeros.join("\n") || "(no imprime nada)"}`;
}

function dibujarFactorial() {
  const n = Math.round(Number(document.getElementById("numFactorial").value));
  const expansion = document.getElementById("expansion");
  const resultado = document.getElementById("resultadoFactorial");
  const barras = document.getElementById("barras");
  barras.innerHTML = "";
  const valor = factorial(n);
  if (valor === undefined) {
    expansion.textContent = `${n}! no existe`;
    resultado.textContent = "El factorial solo está definido para 0 y números positivos, así que la función devuelve undefined.";
    return;
  }
  if (n === 0) {
    expansion.textContent = "0! = 1";
    resultado.textContent = "Por definición, el factorial de 0 es 1: el loop no da ninguna vuelta y el resultado queda en 1.";
    return;
  }
  const factores = [];
  for (let i = n; i >= 1; i--) factores.push(i);
  expansion.textContent = `${n}! = ${factores.join(" × ")}`;
  resultado.textContent = `= ${valor.toLocaleString("es-AR")}`;
  let acumulado = 1;
  for (let i = 1; i <= n; i++) {
    acumulado *= i;
    const barra = document.createElement("div");
    barra.className = "barra";
    barra.style.setProperty("--alto", `${Math.max(4, (Math.log10(acumulado + 1) / Math.log10(valor + 1)) * 100)}%`);
    barra.style.animationDelay = `${i * 70}ms`;
    barra.title = `${i}! = ${acumulado.toLocaleString("es-AR")}`;
    barra.innerHTML = `<span>${i}!</span>`;
    barras.appendChild(barra);
  }
}

document.getElementById("btnTuberia").addEventListener("click", encenderTuberia);
document.querySelectorAll(".carta").forEach((carta) => carta.addEventListener("click", () => carta.classList.toggle("girada")));
document.getElementById("deA").addEventListener("input", dibujarContar);
document.getElementById("hasta").addEventListener("input", dibujarContar);
document.getElementById("numFactorial").addEventListener("input", dibujarFactorial);

dibujarContar();
dibujarFactorial();
