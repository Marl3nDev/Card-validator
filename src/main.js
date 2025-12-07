import './style.css';

function isValidCardNumber(cardNumber){
   let cleanedNumber = '';
   for (let i=0; i < cardNumber.length; i++){
    let char = cardNumber[i];
        if(char >= '0' && char <= '9'){
            cleanedNumber += char;
        }
   }

    if (cleanedNumber.length < 13 || cleanedNumber.length > 19){
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

function getPaymentSystem(cardNumber) {
    let cleanedNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
        let char = cardNumber[i];
        if (char >= '0' && char <= '9') {
            cleanedNumber += char;
        }
    }
    
    if (cleanedNumber.length === 0) {
        return null;
    }

    let firstDigit = cleanedNumber[0];
    let firstTwoDigits = cleanedNumber.substring(0, 2);
    let firstThreeDigits = cleanedNumber.substring(0, 3);
    let firstFourDigits = cleanedNumber.substring(0, 4);
    
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

function formatCardNumber(cardNumber) {
    let cleanedNumber = '';
    for (let i = 0; i < cardNumber.length; i++) {
        let char = cardNumber[i];
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

function validateCard(cardNumber) {
    const isValid = isValidCardNumber(cardNumber);
    const paymentSystem = getPaymentSystem(cardNumber);
    
    return {
        isValid: isValid,
        paymentSystem: paymentSystem,
        formattedNumber: formatCardNumber(cardNumber)
    };
}

function initializeCardValidator() {
    const input = document.querySelector('.text-code');
    const button = document.querySelector('.btn');
    const icons = document.querySelectorAll('.payment-icon');
    
    function highlightPaymentSystem(system) {
        for (let i = 0; i < icons.length; i++) {
            icons[i].style.filter = 'brightness(0.3)';
        }
        
        if (system) {
            const activeIcon = document.querySelector('.payment-icon.' + system);
            if (activeIcon) {
                activeIcon.style.filter = 'brightness(1)';
            }
        }
    }
    
    function showValidationResult(isValid) {
        const existingMessage = document.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'validation-message';
        
        if (isValid) {
            message.textContent = 'Карта действительна';
            message.style.color = 'green';
        } else {
            message.textContent = 'Карта недействительна';
            message.style.color = 'red';
        }
        
        message.style.fontSize = '12px';
        message.style.marginTop = '5px';
        
        const card = document.querySelector('.card');
        card.append(message);
        
        setTimeout(function() {
            if (message.parentNode) {
                message.remove();
            }
        }, 3000);
    }
    
    input.addEventListener('input', function(e) {
        const value = e.target.value;
        
        const formatted = formatCardNumber(value);
        if (formatted !== value) {
            e.target.value = formatted;
        }
        
        const paymentSystem = getPaymentSystem(value);
        highlightPaymentSystem(paymentSystem);
        
        let cleanedNumber = '';
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            if (char >= '0' && char <= '9') {
                cleanedNumber += char;
            }
        }
        
        if (cleanedNumber.length >= 13) {
            const isValid = isValidCardNumber(value);
            if (cleanedNumber.length >= 15) {
                showValidationResult(isValid);
            }
        } else {
            const existingMessage = document.querySelector('.validation-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }
    });
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const value = input.value;
        
        if (!value) {
            showValidationResult(false);
            return;
        }
        
        const result = validateCard(value);
        showValidationResult(result.isValid);
    });
}

document.addEventListener('DOMContentLoaded', initializeCardValidator);

window.cardValidator = {
    isValidCardNumber: isValidCardNumber,
    getPaymentSystem: getPaymentSystem,
    formatCardNumber: formatCardNumber,
    validateCard: validateCard
};