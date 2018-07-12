<div align="center">
  <h1>CO-Validate</h1>
	<a href="https://travis-ci.org/nyze2oo9/co-validate">
		<img src="https://travis-ci.org/nyze2oo9/co-validate.svg?branch=master">
	</a>
	<a href="https://coveralls.io/r/nyze2oo9/co-validate?branch=master">
		<img src="https://coveralls.io/repos/nyze2oo9/co-validate/badge.svg?branch=master">
	</a>
  <br>
  <br>
</div>

A library for validating objects. 

* It has no dependencies (just dev dependencies).
* Validates also deeply nested objects and arrays.
* configurable validation messages
* configurable validation options
* Writen in TypeScript (Types are included)

## Installation

Soon possible via NPM

## Usage

In the following example, you can see a basic example for a login data validation.
Create a Schema instance with the object description.

### JavaScript (Validate)
```js
const coValidate = require('co-validate');

const objectDescription =  {
  username: {
    type: 'string', // username needs to be a string
    min: 4, // username can't be shorter than 4 characters
    max: 64, // username can't be longer than 64 characters
    required: true // username need to be set
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, // this regExp will be used for testing
    required: true // password need to be set
  }
};
const schema = new coValidate.Schema(objectDescription);

const objectToValidate1 = {
  username: 'myUsername',
  password: 'mySecretPassword1'
}
schema.validate(objectToValidate1);
if (schema.validationErrorMessages.length > 0) {
  // will not get called
} else {
  // will get called
  // everything is fine
}

const objectToValidate2 = {
  username: 'myUsername',
  password: 'mySecretPassword'
}
schema.validate(objectToValidate2);
if (schema.validationErrorMessages.length > 0) {
  // will get called
  // [
  // {
  //    fullPath: ['password']
  //    message: 'something went wrong' // this is the fallback message
  // }
  // ]
} else {
  // will not get called
}
```

### TypeScript (Validate)
```ts
import { Schema } from 'co-validate';

const objectDescription : ISchemaConfigEntry =  {
  username: {
    type: 'string', // username needs to be a string
    min: 4, // username can't be shorter than 4 characters
    max: 64, // username can't be longer than 64 characters
    required: true // username need to be set
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, // this regExp will be used for testing
    required: true // password need to be set
  }
};
const schema = new Schema(objectDescription);

const objectToValidate1 = {
  username: 'myUsername',
  password: 'mySecretPassword1'
}
schema.validate(objectToValidate1);
if (schema.validationErrorMessages.length > 0) {
  // will not get called
} else {
  // will get called
  // everything is fine
}

const objectToValidate2 = {
  username: 'myUsername',
  password: 'mySecretPassword'
}
schema.validate(objectToValidate2);
if (schema.validationErrorMessages.length > 0) {
  // will get called
  // [
  // {
  //    fullPath: ['password']
  //    message: 'something went wrong' // this is the fallback message
  // }
  // ]
} else {
  // will not get called
}
```

### JavaScript (Validate & Parse)
```js
const coValidate = require('co-validate');

const objectDescription =  {
  username: {
    type: 'string', // username needs to be a string
    min: 4, // username can't be shorter than 4 characters
    max: 64, // username can't be longer than 64 characters
    required: true // username need to be set
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, // this regExp will be used for testing
    required: true // password need to be set
  }
};
const schema = new coValidate.Schema(objectDescription);

const objectToValidate1 = {
  username: 'myUsername',
  password: 'mySecretPassword1',
  notneeded: 'should not be here' // a property which shouldn't be there
}
schema.validate(objectToValidate1).parse();
if (schema.validationErrorMessages.length > 0) {
  // will not get called
} else {
  // will get called
  // everything is fine
  // from now on use schema.parsedVariable, because it only contains the specified properties and removes everything else.
  // schema.parsedVariable = {
  //  username: 'myUsername',
  //  password: 'mySecretPassword1'
  // }
}
...
```

### TypeScript (Validate & Parse)
```ts
import { Schema } from 'co-validate';

const objectDescription : ISchemaConfigEntry =  { // using the ISchemaConfigEntry interface will help you to define the Schema
  username: {
    type: 'string', // username needs to be a string
    min: 4, // username can't be shorter than 4 characters
    max: 64, // username can't be longer than 64 characters
    required: true // username need to be set
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, // this regExp will be used for testing
    required: true // password need to be set
  }
};
const schema = new Schema(objectDescription);

const objectToValidate1 = {
  username: 'myUsername',
  password: 'mySecretPassword1',
  notneeded: 'should not be here' // a property which shouldn't be there
}
schema.validate(objectToValidate1).parse();
if (schema.validationErrorMessages.length > 0) {
  // will not get called
} else {
  // will get called
  // everything is fine
  // from now on use schema.parsedVariable, because it only contains the specified properties and removes everything else.
  // schema.parsedVariable = {
  //  username: 'myUsername',
  //  password: 'mySecretPassword1'
  // }
}
```

### Schema Properties

| Properties | Description |
|------------|-------------|
| **type** (**Can't** be set in combination with regExp (when `type !== 'string'`), validValues and nested) |
| `type = 'boolean'` | Checks if the value is a boolean |
| `type = 'number'` | Checks if the value is a number |
| `type = 'integer'` | Checks if the value is an integer |
| `type = 'string'` | Checks if the value is a string |
| `type = 'boolean[]'` | Checks if the value is a boolean array |
| `type = 'number[]'` | Checks if the value is a number array |
| `type = 'integer[]'` | Checks if the value is an integer array |
| `type = 'string[]'` | Checks if the value is a string array |
| `type = 'object'` | Checks if the value is a plain object |
| `type = 'array'` | Checks if the value is an array |
| `type = 'mongo_id'` | Checks if the value is a valid MongoDB ID |
| `type = 'mail'` | **No real Mail check** Checks if the value contains an @ between characters that are not whitespaces regExp used: `/\S+@\S+/` For real Mail checking you need to create an account activation system with a activation code in a mail |
| **regExp** (**Can't** be set in combination with type (when `type !== 'string'`), validValues, min, max and nested)  |
| `regExp = ANY VALID JS RegExp` | Checks if the value matches the regExp. |
| **validValues** (**Can't** be set in combination with type, regExp, min, max and nested)  |
| `validValues = [1,2,3]` | Example would check, if the value is 1, 2 or 3. validValues can contains boolean, number or string values. |
| **required** (**Can't** be set in combination with nested) |
| `required = true` | Checks if the value is set |
| **min** (**Can't** be set in combination with type (when `type === 'boolean' || type === 'object' || type === 'mongo_id'`), regExp, validValues and nested) |
| `min = 1` | Checks if the value is higher or equal 1  |
| `min = 1.5236` | Checks if the value is higher or equal 1.5236 **(Float values can only be applied to numbers)** |
| **max** (**Can't** be set in combination with type (when `type === 'boolean' || type === 'object' || type === 'mongo_id'`), regExp, validValues and nested) |
| `max = 1` | Checks if the value is lower or equal 1  |
| `max = 1.5236` | Checks if the value is lower or equal 1.5236 **(Float values can only be applied to numbers)** |
| **message** |
| `message = 'custom validation message'` | This property is for setting the validation messages  |
| `message = {de: 'german validation message' en: 'english validation message'}` | It's possible to set different messages in different languages or for different cases (more about this can be found [here](#multi-language-validation-messsages)) |
| **nested** (**Can't** be set in combination with type, regExp, validValues, required, min and max) |
| `nested = { NESTED OBEJCT}` | This property is for setting the nested object  |
| `nested = [{ NESTED ARRAY OF OBJECTS}]`| It's also possible to set an array of objects for the nested property |

### Validation Messsages
All the API properties can be objects with messages.

```js
...
'type' : {
  value: 'string',
  message: 'value needs to be a string'
}
...
```

### Multi Language Validation Messsages
It's possible to define different error messages for different purposes. This behaviour could be used for different
validation message languages, but it could be also used for different messages in dev and prod enviroment etc.

```js
...
const objectDescription =  {
  username: {
    type : {
      value: 'string', // username needs to be a string
      message: {
        de: 'german error message',
        en: 'english error message'
      }
    },
    min: 4, // username can't be shorter than 4 characters
    max: 64, // username can't be longer than 64 characters
    required: true // username need to be set
  },
  password: {
    regExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ // this regExp will be used for testing
    required: true // password need to be set
  }
};
// would from now on return german error messages
const options = {
  countryCode: 'de'
}
const schema = new Schema(objectDescription, options);
...
```

### Validation Messages
All validation messages will get stored in an Array of Objects. An validation message will get stored in an object. This
object has 2 properties 'fullPath' and 'message'. In the fullPath property you will get the fullPath to the value in form 
of an string array. The message property is for storing the conresponding error message.

```js
const objectToValidate = {
  users: [
    {
      id: 1,
      role: 'admin'
    },
    {
      id: 2,
      role: true // Entry in validationErrorMessages would show that this is the problem
    },
    {
      id: 3,
      role: 'admin'
    },
  ]
};

const validationErrorMessages = [
{
  fullPath: ['users' '1', 'role'],
  message: 'role should be a string'
};
]
```