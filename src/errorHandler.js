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

function errorHandler(errorCode, customInput) {
    const customError = {
        emailError: 'Email is invalid',
        stringError: 'Input is not a string',
        maxError: 'Input is too long',
        minError: 'Input is too short',
        whitespaceError: "Input can't contain spaces",
        numberError: 'Input is not a number',
        booleanError: 'Input is not a boolean',
        imageError: 'Invalid image or unsupported image format',
    };

    if (customInput) {
        if (customInput.emailError) customError.emailError = customInput.emailError;
        if (customInput.stringError) customError.stringError = customInput.stringError;
        if (customInput.maxError) customError.maxError = customInput.maxError;
        if (customInput.minError) customError.minError = customInput.minError;
        if (customInput.whitespaceError) customError.whitespaceError = customInput.whitespaceError;
        if (customInput.numberError) customError.numberError = customInput.numberError;
        if (customInput.booleanError) customError.booleanError = customInput.booleanError;
        if (customInput.imageError) customError.imageError = customInput.imageError;
    }

    switch (errorCode) {
    case emailError:
        return customError.emailError;
    case stringError:
        return customError.stringError;
    case maxError:
        return customError.maxError;
    case minError:
        return customError.minError;
    case whitespaceError:
        return customError.whitespaceError;
    case numberError:
        return customError.numberError;
    case booleanError:
        return customError.booleanError;
    case imageError:
        return customError.imageError;
    default:
        return errorCode;
    }
}

module.exports = errorHandler;
