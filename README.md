# Mangosteen

Mangosteen is a very small symbol mangler. It also supports generating unique identifiers.

## Usage:

Install using npm:

```
npm install --save mangosteen
```

```javascript
//Import as Node module
var mangosteen = require('mangosteen');

//Alternatively, using ES6 syntax:
import mangosteen from 'mangosteen';

//After importing:

var mangler = new mangosteen.Mangler();

//will return a single-letter identifier
var mangled = mangler.mangle("ALongIdentifier") 

mangler.unmangle(mangled) == "ALongIdentifier" //true

var unique = new mangosteen.UniqueGen();

//pass in a list of identifiers you want to preserve
unique.registerIdentifiers(["foo", "bar", "baz"]);
var gensym = unique.generate();
//gensym is guaranteed not to collide with registered identifiers
//or generated identifiers

//you can also generate a unique identifier from an existing identifier
//for readability purposes
var gensymReadable = unique.generateFrom("quux");

//gensymReadable will be something similar to "quux_"
```
