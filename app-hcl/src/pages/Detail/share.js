import { Share } from 'react-native';

async function ShareMessage(dentroList = [], foraList = [], matche) {
  let dentro = '';

  dentroList.forEach(user => {
    dentro = `${dentro + String(user.name)}\n`;
  });

  let fora = '';
  foraList.forEach(user => {
    fora = `${fora + String(user.name)}\n`;
  });

  try {
    let dado = `
      https://hclweb.com.br

      PELADA: ${matche.locale}
      ${String(matche.date)}

      *DENTRO - ${dentroList.length}*
      ${dentro}
      *FORA - ${foraList.length}*
      ${fora}
    `;

    dado = dado
      .split('\n')
      .map(item => item.trim())
      .join('\n');

    Share.share({
      message: `${dado}`,
    })
      .then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg));
  } catch (error) {
    console.log(error);
  }
}

export default ShareMessage;
