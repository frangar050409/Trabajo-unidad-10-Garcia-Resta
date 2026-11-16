function triplicador(numero) {
  return numero * 3;
}

function multiplicador(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function resto(a, b) {
  return a % b;
}

let resultadoFinal = resto(division(multiplicador(triplicador(5), 12), 12), 3);
console.log("Matemática simple:", resultadoFinal);

function test1(x, y) {
  return y - x;
}

function test2(x, y) {
  return x * 2;
  console.log(x);
  return x / 2;
}

console.log("test1(10, 40) devuelve", test1(10, 40));
console.log("test2(10) devuelve", test2(10));

function contarDeA_n(contar_de_a, contar_hasta) {
  let numero = contar_de_a;
  while (numero <= contar_hasta) {
    console.log(numero);
    numero += contar_de_a;
  }
}

contarDeA_n(5, 30);

function factorial(numero) {
  if (numero < 0) {
    return undefined;
  }
  let resultado = 1;
  let i = 1;
  while (i <= numero) {
    resultado = resultado * i;
    i++;
  }
  return resultado;
}

console.log("factorial(5) =", factorial(5));
console.log("factorial(0) =", factorial(0));
console.log("factorial(-3) =", factorial(-3));
