import * as Yup from 'yup';

function CheckDate(pObj) {
  try {
    const expReg = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/(19|20)?\d{2}$/;
    let aRet = true;
    if (pObj && pObj.match(expReg) && pObj.length == 10) {
      const dia = pObj.substring(0, 2);
      const mes = pObj.substring(3, 5);
      const ano = pObj.substring(6, 10);
      if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia > 30) {
        aRet = false;
      } else if (ano % 4 != 0 && mes == 2 && dia > 28) {
        aRet = false;
      } else if (ano % 4 == 0 && mes == 2 && dia > 29) {
        aRet = false;
      }
    } else {
      aRet = false;
    }
    return aRet;
  } catch (e) {
    return false;
  }
}

function TestaCPF(cpf) {
  try {
    const strCPF = cpf.replace(/[^\d]+/g, '');
    if (strCPF.length == 11) {
      let Soma;
      let Resto;
      Soma = 0;
      if (strCPF == '00000000000') {
        return false;
      }

      for (var i = 1; i <= 9; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      }
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) {
        Resto = 0;
      }
      if (Resto != parseInt(strCPF.substring(9, 10))) {
        return false;
      }

      Soma = 0;
      for (var i = 1; i <= 10; i++) {
        Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      }
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) {
        Resto = 0;
      }
      if (Resto != parseInt(strCPF.substring(10, 11))) {
        return false;
      }
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

Yup.addMethod(Yup.string, 'cpf', function (message) {
  return this.test('cpf', message || 'Número de CPF inválido!', (value) =>
    TestaCPF(value),
  );
});

Yup.addMethod(Yup.string, 'datebr', function (message) {
  return this.test('datebr', message || 'Data invalida!', (value) =>
    CheckDate(value),
  );
});
