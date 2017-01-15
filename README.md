# Mangosteen

Mangosteen is a very small symbol mangler.

## Usage:

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
```
