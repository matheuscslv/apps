export default function soma(bag) {
  let soma = 0;
  for (let i = 0; i < bag.length; i++) {
    soma += bag[i].produto.preco_venda * bag[i].quantity;
  }
  return Number(soma).toFixed(2);
}

export function somaUnitaria(bag) {
  let soma = 0;
  soma = bag.produto.preco_venda * bag.quantity;
  return Number(soma).toFixed(2);
}
