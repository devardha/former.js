# FORMER.JS Form Validator
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/devardha/former.js/issues) ![npm (scoped)](https://img.shields.io/npm/v/@devardha/former.js) ![npm](https://img.shields.io/npm/dw/@devardha/former.js)

Former.js is a simple, flexible, and easy-to-use form validator for javascript.

## Getting started
### Installation
```bash
$ npm install @devardha/former.js
```

### Usage
former.check provides you the easy way to validate an input (string, number, boolean). former.check will return an error code (string) if the given value is invalid.

#### Syntax

```js
former.check.string(input, [options]) // String validation
former.check.boolean(input) // Boolean validation
former.check.number(input) // Number/integer validation
```

- **input**
  - Type: `string`, `boolean`, or `number`
  - The input value you want to validate

- **options** (optional)
  - Type: `Object`
  - The options object to specify the input validation.

#### Options
`options` for string:
* `type` (string) - for now, only support type `'email'` and `'image'`
* `max` (number)
* `min` (number)
* `whitespace` (boolean) - Default: `true`

```js
// String validation
former.check.string('this is a string') // it will return the string if valid

// Number validation
former.check.number(5)

// Boolean validation
former.check.boolean(true)

// Email validation
// To validate an email, you must specify the type
former.check.string('user@email.com', { type: 'email' })

// Image validation
former.check.string('image.jpg', { type: 'image' })
```

### Form validation
You can also validate a form data in object using `validate()` method.

```js
former.validate([formObject], [callback])
```

- **formObject**
  - Type: `Object`
  - The data you want to validate

- **callback**
  - Type: `Function`
  - A callback to be fired once the data has been validated.

### Custom error message
former.js support custom error message for form validation using `former.errorHandler()`.

```js
former.errorHandler(err, [errorMessage]);

// Example
const email = former.check.string('test@email.com', { type: 'email' }
former.errorHandler(email, { emailError: 'Email address is invalid!' })
// => Email address isinvalid!
```

- **err**
  - Type: `String`
  - Error data

- **errorMessage** (optional)
  - Type: `Object`
  - Custom error message

#### Default error message
`former.errorHandler()` return the devault error message by default if you don't specify the custom error message.

* `emailError`: Email is invalid
* `stringError`: Input is not a string
* `maxError`: Input is too long
* `minError`: Input is too short
* `whitespaceError`: Input can't contain spaces
* `numberError`: Input is not a number
* `booleanError`: Input is not a boolean
* `imageError`: Invalid image or unsupported image format


## Example
### Simple input validation
```js
const former = require('@devardha/former.js');

const validEmail = former.check.string('test@email.com', { type: 'email' });
console.log(validEmail)
// => test@email.com

const invalidEmail = former.check.string('invalidemail', { type: 'email' });
console.log(invalidEmail)
// => EMAIL_ERROR
```

### Full form validation
```js
const former = require('@devardha/former.js');

// form data must be an object
const formData = {
    email: former.check.string('test@email.com', { type: 'email' }),
    username: former.check.string('myusername', { min: 3, whitespace: false }), // the username can't contain spaces.
    password: former.check.string('secretpassword', { min: 8, max: 16 }) // password cannot have more than 16 characters
}

former.validate(formData, function (err, data) {
    if(data){
        // do something with your data here
    }

    console.log(formerjs.errorHandler(err, { minError: 'Too short bro!' }));
    // => Too short bro!
})
```

## List of former.js error code
* `EMAIL_ERROR`
* `STRING_ERROR`
* `MAX_ERROR`
* `MIN_ERROR`
* `WHITESPACE_ERROR`
* `NUMBER_ERROR`
* `BOOLEAN_ERROR`
* `IMAGE_ERROR`
