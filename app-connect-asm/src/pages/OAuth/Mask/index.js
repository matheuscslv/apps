const Mask = (email, senha) => {
  let regex = /(.+)[@](.+)[.](.+)/;

  if (email.trim() === '') {
    return 'E-mail não preenchido';
  }
  if (!regex.test(email) || email.split(' ').length > 1) {
    return 'E-mail não é válido';
  }
  if (senha.trim() === '') {
    return 'Senha não preenchida';
  }
  return '';
};

export default Mask;
