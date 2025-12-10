import { isValidCardNumber, formatCardNumber } from '../src/validator.js';
import { getPaymentSystem } from '../src/paymentSystems.js';

describe('Card Validator', () => {
    describe('isValidCardNumber', () => {
        test('valid Visa card number', () => {
            expect(isValidCardNumber('4111111111111111')).toBe(true);
        });
        test('invalid card number', () => {
            expect(isValidCardNumber('1234567812345678')).toBe(false);
        });
    });

    describe('getPaymentSystem', () => {
        test('detect Visa', () => {
            expect(getPaymentSystem('4111111111111111')).toBe('visa');
        });
        test('detect Mastercard', () => {
            expect(getPaymentSystem('5555555555554444')).toBe('mastercard');
        });
        test('detect Mir', () => {
            expect(getPaymentSystem('2200123456789012')).toBe('mir');
        });
    });

    describe('formatCardNumber', () => {
        test('format 16 digit card number', () => {
            expect(formatCardNumber('1234567812345678')).toBe('1234 5678 1234 5678');
        });
    });
});