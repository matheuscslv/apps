import moment from 'moment';

function formatString(string) {
  return string.replace(/[^\d]+/g, '');
}

function formatDateToBr(string) {
  try {
    return moment(string).format('DD/MM/YYYY');
  } catch (e) {
    return '';
  }
}

export { formatString, formatDateToBr };
