# rehype-element-properties

[![CI](https://github.com/ganta/rehype-element-properties/actions/workflows/ci.yaml/badge.svg)](https://github.com/ganta/rehype-element-properties/actions/workflows/ci.yaml)

[rehype](https://github.com/rehypejs/rehype) plugin to replace element properties.

## What is this?

This package is a [unified](https://github.com/unifiedjs/unified) ([rehype](https://github.com/rehypejs/rehype)) plugin to replace element properties.
You can customize the attributes of HTML elements that cannot be expressed in Markdown notation, and add embedded styles.

## Install

Install with [npm](https://docs.npmjs.com/cli):

```shell
npm install @ganta/rehype-element-properties
```

Install with [Yarn](https://yarnpkg.com/):

```shell
yarn add @ganta/rehype-element-properties
```

Install with [pnpm](https://pnpm.io/):

```shell
pnpm add @ganta/rehype-element-properties
```

## Usage

This package is dual package (CommonJS / ES Modules).

Import as CommonJS:

```javascript
const rehypeElementProperties = require("@ganta/rehype-element-properties");
```

Import as ES Modules:

```javascript
import rehypeElementProperties from "@ganta/rehype-element-properties";
```

This package is fully typed with TypeScript.
It exports `Setting` type, which specifies the interface of the plugin setting. 

```typescript
import rehypeElementProperties, { Setting } from "@ganta/rehype-element-properties";
```

Use as a rehype plugin as follows:

```typescript
const processor = unified()
  .use(parse, { fragment: true })
  .use(rehypeElementProperties, {
    img: [
      {
        name: "alt",
        replacer: (value, properties) => value || properties?.src
      },
    ],
  })
```

## API

This package exports no identifiers.
The default export is `rehypeElementProperties`.

### `unified().use(rehypeElementProperties, setting)`

#### `setting`

Plugin setting.

##### `setting.<tagName>`

Describes the setting for each element that replaces the property.
The tag name of the element is specified as a key.

###### `setting.<tagName>[].name`

Specifies the name of the property to be replaced.

###### `setting.<tagName>[].replacer`

Specifies the function that returns the value of the replaced property.

The value types of a property is as follows:

```typescript
boolean | number | string | null | undefined | Array<string | number>
```

The function takes the value of the current property as an argument.
The first argument is the value of the specified property.
The second argument is the entire property of the specified element.

If you want to remove a property, return `undefined`.

## License

[Apache License 2.0](LICENSE)
