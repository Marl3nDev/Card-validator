export function getPaymentSystem(cardNumber) {
  let cleanedNumber = '';
  for (let i = 0; i < cardNumber.length; i++) {
    const char = cardNumber[i];
    if (char >= '0' && char <= '9') {
      cleanedNumber += char;
    }
  }
  if (cleanedNumber.length === 0) {
    return null;
  }
  const firstDigit = cleanedNumber[0];
  const firstTwoDigits = cleanedNumber.substring(0, 2);
  const firstThreeDigits = cleanedNumber.substring(0, 3);
  const firstFourDigits = cleanedNumber.substring(0, 4);
    
  if (firstDigit === '4') {
    return 'visa';
  }
  if ((firstTwoDigits >= '51' && firstTwoDigits <= '55') || 
        (firstFourDigits >= '2221' && firstFourDigits <= '2720')) {
    return 'mastercard';
  }
  if (firstFourDigits >= '2200' && firstFourDigits <= '2204') {
    return 'mir';
  }
  if (firstTwoDigits === '34' || firstTwoDigits === '37') {
    return 'amex';
  }
  if (firstFourDigits === '6011' || 
        firstTwoDigits === '65' || 
        (firstThreeDigits >= '644' && firstThreeDigits <= '649')) {
    return 'discover';
  }
  if ((firstThreeDigits >= '300' && firstThreeDigits <= '305') || 
        firstTwoDigits === '36' || 
        firstTwoDigits === '38') {
    return 'diners';
  }
  if (firstTwoDigits === '35') {
    return 'jcb';
  }
  return null;
}