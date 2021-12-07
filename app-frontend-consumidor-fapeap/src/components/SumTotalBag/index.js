export default function soma(cart) {
  let soma = 0;
  for (let i = 0; i < cart.length; i++) {
    soma += cart[i].preco * cart[i].quantity;
  }
  return Number(soma).toFixed(2);
}

export function somaTaxas(cart) {
  let soma = 0;
  for (let i = 0; i < cart.length; i++) {
    soma += Number(cart[i].fornecedor.taxa_delivery);
  }
  return Number(soma).toFixed(2);
}

export function somaUnitaria(cart) {
  let soma = 0;
  for (let i = 0; i < cart.length; i++) {
    soma += cart[i].quantity;
  }
  return Number(soma);
}

export function somaPedido(produtos) {
  let soma = 0;
  for (let i = 0; i < produtos.length; i++) {
    soma += produtos[i].preco_venda * produtos[i].quantidade;
  }
  return Number(soma).toFixed(2);
}
