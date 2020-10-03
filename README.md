# FORMER.JS Form Validator
[![npm version](https://badge.fury.io/js/%40devardha%2Fformer.js.svg)](https://badge.fury.io/js/%40devardha%2Fformer.js) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

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

## Example

```js
const former = require('@devardha/former.js');

const validEmail = former.check.string('test@email.com', { type: 'email' });
console.log(validEmail) // it will return the email

const invalidEmail = former.check.string('invalidemail', { type: 'email' });
console.log(invalidEmail) // it will return a string of invalid email code (EMAIL_ERROR)
```

Full form validation example
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

    console.log(err) // catch validation errors
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
