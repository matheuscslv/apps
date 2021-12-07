export default function soma(bag) {
  let soma = 0;
  for (let i = 0; i < bag.length; i++) {
    soma += bag[i].preco_venda * bag[i].quantity;
  }
  return Number(soma).toFixed(2);
}

export function somaOrder(bag) {
  let soma = 0;
  for (let i = 0; i < bag.length - 1; i++) {
    soma += bag[i].preco_venda * bag[i].quantity;
  }
  return Number(soma).toFixed(2);
}

export function somaUnitaria(bag) {
  let soma = 0;
  soma = bag.preco_venda * bag.quantity;
  return Number(soma).toFixed(2);
}
