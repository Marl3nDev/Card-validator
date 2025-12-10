export function isValidCardNumber(cardNumber) {
  let cleanedNumber = '';
  for (let i = 0; i < cardNumber.length; i++) {
    const char = cardNumber[i];
    if (char >= '0' && char <= '9') {
      cleanedNumber += char;
    }
  }
  if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
    return false;
  }
  let sum = 0;
  let isEven = false;
  for (let i = cleanedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanedNumber[i]);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

export function formatCardNumber(cardNumber) {
  let cleanedNumber = '';
  for (let i = 0; i < cardNumber.length; i++) {
    const char = cardNumber[i];
    if (char >= '0' && char <= '9') {
      cleanedNumber += char;
    }
  }
  let result = '';
  for (let i = 0; i < cleanedNumber.length; i++) {
    result += cleanedNumber[i];
    if ((i + 1) % 4 === 0 && i < cleanedNumber.length - 1) {
      result += ' ';
    }
  }
  return result;
}