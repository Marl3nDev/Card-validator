import { isValidCardNumber, formatCardNumber } from './validator.js';
import { getPaymentSystem } from './paymentSystems.js';

const PAYMENT_SYSTEMS = [
  { name: 'visa', icon: 'visa_icon.svg', alt: 'Visa' },
  { name: 'mastercard', icon: 'mastercard_icon.svg', alt: 'Mastercard' },
  { name: 'mir', icon: 'mir_icon.svg', alt: 'Mir' },
  { name: 'amex', icon: 'amex_icon.svg', alt: 'American Express' },
  { name: 'discover', icon: 'discover_icon.svg', alt: 'Discover' },
];

function createPaymentIcons() {
  const container = document.querySelector('.icons-img');
  if (!container) return;
  container.innerHTML = '';
  PAYMENT_SYSTEMS.forEach(system => {
    const img = document.createElement('img');
    img.src = `img/${system.icon}`;
    img.alt = system.alt;
    img.className = `payment-icon ${system.name}`;
    img.style.filter = 'brightness(0.3)';
    container.appendChild(img);
  });
}

export function validateCard(cardNumber) {
  const isValid = isValidCardNumber(cardNumber);
  const paymentSystem = getPaymentSystem(cardNumber);
  return {
    isValid: isValid,
    paymentSystem: paymentSystem,
    formattedNumber: formatCardNumber(cardNumber)
  };
}

export function initializeCardValidator() {
  createPaymentIcons();
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
      const char = value[i];
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