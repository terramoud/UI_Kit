A very simple wrapper for html2bemjson and bemjson-to-decl modules.

## Usage
Just add a rule to `module`, like this:

 ```javascript
     module: {
        rules: [
            { test: /\.html$/, loader: "html2bemdecl-loader" }
        ]
    }
   ```
Now you dont even need to write bemjson/bemdecl by yourself. For example, this input:

```html
<div class="b-block1">
  <div class="b-block1__elem1">test</div>
</div>
 ```
 
 Will result in DECL format:
 ```javascript
 [
    {
        block: 'b-block1'
    },
    {
        block: 'b-block1',
        elem: 'elem1'
    }
]
```

You can use this DECL to convert it to `require` statements with [bemdecl-to-fs-loader](https://www.npmjs.com/package/bemdecl-to-fs-loader). So you may write only HTML, and all resources will be included automatically based on classes of HTML elements. 

The example project is available [here](https://github.com/ortophius/html-webpack-example).
The more information about BEM naming you may find [here](https://bem.info/methodology/naming-convention/).
