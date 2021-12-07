export default function baskets(bag) {

  let empresas = [];

  let baskets = [];
  for (let i = 0; i < bag.length; i++) {
    baskets.push(bag[i].fornecedor.id);
  }

  empresas.push(baskets[0]);

  for (let i = 1; i < baskets.length; i++) {
    if (!empresas.includes(baskets[i])) {
      empresas.push(baskets[i]);
    }
  }

  let final = [];

  for (let i = 0; i < empresas.length; i++) {
    const aux = bag.filter(item => (item.fornecedor.id == empresas[i]));
    final.push(aux);
  }

  return final;
}
