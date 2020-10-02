const { validateEmail } = require('./helpers');
const { errorMessage } = require('./constants');

const {
    stringError,
    emailError,
    minError,
    maxError,
    trimError,
    numberError,
    booleanError,
} = errorMessage;

const check = {
    string(text, options) {
        if (typeof text !== 'string') return stringError;

        // If options is undefined
        if (typeof options === 'undefined') return text;
        if (typeof options !== 'object') throw new Error('Options argument must be an object');

        const {
            max, min, trim, type,
        } = options;

        // if Email
        if (typeof type !== 'undefined') {
            if (typeof type !== 'string') throw new Error("'type' options must be a string");
            if (type === 'email') {
                if (validateEmail(text)) return text;
                return emailError;
            }
        }

        // If Max
        if (
            typeof max !== 'undefined'
            && typeof min === 'undefined'
            && typeof trim === 'undefined') {
            if (text.length > max) return maxError;

            return text;
        }

        // If Min
        if (
            typeof min !== 'undefined'
            && typeof max === 'undefined'
            && typeof trim === 'undefined'
        ) {
            if (text.length < min) return minError;
            return text;
        }

        // If Trim
        if (
            typeof trim !== 'undefined'
            && typeof min === 'undefined'
            && typeof max === 'undefined') {
            const exp = /\s/g;
            if (exp.test(text)) return trimError;

            return text;
        }

        // If Max, Trim
        if (
            typeof max !== 'undefined'
            && typeof trim !== 'undefined'
            && typeof min === 'undefined') {
            if (text.length > max) return maxError;

            const exp = /\s/g;
            if (exp.test(text)) return trimError;

            return text;
        }

        // If Min, Trim
        if (
            typeof min !== 'undefined'
            && typeof trim !== 'undefined'
            && typeof max === 'undefined') {
            if (text.length < min) return minError;

            const exp = /\s/g;
            if (exp.test(text)) return trimError;

            return text;
        }

        // If Min, Max
        if (
            typeof min !== 'undefined'
            && typeof max !== 'undefined'
            && typeof trim === 'undefined') {
            if (text.length < min) return minError;

            if (text.length > max) return maxError;

            return text;
        }

        // If Trim, Min, Max
        if (
            typeof min !== 'undefined'
            && typeof max !== 'undefined'
            && typeof trim !== 'undefined') {
            if (text.length < min) return minError;
            if (text.length > max) return maxError;

            const exp = /\s/g;
            if (exp.test(text)) return trimError;

            return text;
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
