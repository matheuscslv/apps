import moment from 'moment';

function formatString(string) {
  try {
    return string.replace(/[^\d]+/g, '');
  } catch (e) {
    return '';
  }
}

function formatDateToBr(string) {
  try {
    return moment(string).format('DD/MM/YYYY');
  } catch (e) {
    return '';
  }
}

export { formatString, formatDateToBr };
