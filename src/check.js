const { validateEmail } = require('./helpers');
const { errorMessage } = require('./constants');

const {
    stringError,
    emailError,
    minError,
    maxError,
    whitespaceError,
    numberError,
    booleanError,
    imageError,
} = errorMessage;

const check = {
    string(text, options) {
        if (typeof text !== 'string') return stringError;

        // If options is undefined
        if (typeof options === 'undefined') return text;
        if (typeof options !== 'object') throw new Error('Options argument must be an object');

        const {
            max, min, whitespace, type,
        } = options;

        // Type Checker
        if (typeof type !== 'undefined') {
            if (typeof type !== 'string') throw new Error("'type' options must be a string");

            // if Email
            if (type === 'email') {
                if (validateEmail(text)) return text;
                return emailError;
            }

            // If Image
            if (type === 'image') {
                const exp = /\w+\.(jpg|jpeg|gif|png|tiff|bmp|svg)$/gi;

                if (text.match(exp)) {
                    return text;
                }
                return imageError;
            }
        }

        // If Max
        if (
            typeof max !== 'undefined'
            && typeof min === 'undefined'
            && typeof whitespace === 'undefined') {
            if (text.length > max) return maxError;

            return text;
        }

        // If Min
        if (
            typeof min !== 'undefined'
            && typeof max === 'undefined'
            && typeof whitespace === 'undefined'
        ) {
            if (text.length < min) return minError;
            return text;
        }

        // If Whitespace
        if (
            typeof whitespace !== 'undefined'
            && typeof min === 'undefined'
            && typeof max === 'undefined') {
            if (whitespace === false) {
                const exp = /\s/g;
                if (exp.test(text)) return whitespaceError;

                return text;
            }
        }

        // If Max, Whitespace
        if (
            typeof max !== 'undefined'
            && typeof whitespace !== 'undefined'
            && typeof min === 'undefined') {
            if (text.length > max) return maxError;
            if (whitespace === false) {
                const exp = /\s/g;
                if (exp.test(text)) return whitespaceError;

                return text;
            }
        }

        // If Min, Whitespace
        if (
            typeof min !== 'undefined'
            && typeof whitespace !== 'undefined'
            && typeof max === 'undefined') {
            if (text.length < min) return minError;
            if (whitespace === false) {
                const exp = /\s/g;
                if (exp.test(text)) return whitespaceError;

                return text;
            }
        }

        // If Min, Max
        if (
            typeof min !== 'undefined'
            && typeof max !== 'undefined'
            && typeof whitespace === 'undefined') {
            if (text.length < min) return minError;

            if (text.length > max) return maxError;

            return text;
        }

        // If Whitespace, Min, Max
        if (
            typeof min !== 'undefined'
            && typeof max !== 'undefined'
            && typeof whitespace !== 'undefined') {
            if (text.length < min) return minError;
            if (text.length > max) return maxError;
            if (whitespace === false) {
                const exp = /\s/g;
                if (exp.test(text)) return whitespaceError;

                return text;
            }
        }

        return text;
    },
    number(num) {
        if (typeof num !== 'number') return numberError;

        return num;
    },
    boolean(bool) {
        if (typeof bool !== 'boolean') return booleanError;

        return bool;
    },
};

module.exports = check;
