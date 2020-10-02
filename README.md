# FORMERJS Form Validator
A simple, flexible, and easy-to-use form validator for javascript

### Install
```bash
$ npm install former.js
```

### former.check.data_type(input, [options])
former.check provides you the easy way to validate an input (string, number, boolean). former.check will return an error code (string) if the given value is invalid.

`options`:
* `type` (string) - only for email validation
* `max` (integer)
* `min` (integer)
* `trim` (boolean)

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
```

### Example
```js
const former = require('former.js');

const validEmail = former.check.string('test@email.com', { type: 'email' });
console.log(validEmail) // it will return the email

const invalidEmail = former.check.string('invalidemail', { type: 'email' });
console.log(invalidEmail) // it will return a string of invalid email code (EMAIL_ERROR)
```

Full form validation example
```js
const former = require('former.js');

// form data must be an object
const formData = {
    email: former.check.string('test@email.com', { type: 'email' }),
    username: former.check.string('myusername', { min: 3, trim: true }),
    password: former.check.string('secretpassword', { min: 8, max: 16 })
}

former.validate(formData, function (err, data) {
    if(data){
        // do something with your data here
    }

    console.log(err) // catch validation errors
})
```

### List of former.js error code
* `EMAIL_ERROR`
* `STRING_ERROR`
* `MAX_ERROR`
* `MIN_ERROR`
* `TRIM_ERROR`
* `NUMBER_ERROR`
* `BOOLEAN_ERROR`