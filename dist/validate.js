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

const validate = (data, callback) => {
    if (typeof data !== 'object') throw new Error('data must be an object');
    if (typeof callback === 'undefined') throw new Error('Missing a callback');

    const values = Object.values(data);

    if (values.includes(stringError)) {
        return callback(stringError);
    }
    if (values.includes(emailError)) {
        return callback(emailError);
    }
    if (values.includes(minError)) {
        return callback(minError);
    }
    if (values.includes(maxError)) {
        return callback(maxError);
    }
    if (values.includes(numberError)) {
        return callback(numberError);
    }
    if (values.includes(trimError)) {
        return callback(trimError);
    }
    if (values.includes(booleanError)) {
        return callback(booleanError);
    }
    return callback(null, data);
};

module.exports = validate;
