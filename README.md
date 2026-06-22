[npm-version-image]: https://img.shields.io/npm/v/pintor.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/pintor
[npm-downloads-image]: https://img.shields.io/npm/dm/pintor.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/pintor
[action-image]: https://github.com/cezaraugusto/pintor/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/pintor/actions
[provenance-image]: https://img.shields.io/badge/provenance-verified-0971fe?logo=npm&logoColor=white
[provenance-url]: https://www.npmjs.com/package/pintor

> Zero-dependency library for providing color functions for terminal text

# pintor [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url] [![provenance][provenance-image]][provenance-url]

## Features

- **Zero Dependencies**: Lightweight and fast
- **Rich Color Support**: 16 colors (8 standard + 8 bright)
- **Background Colors**: All colors available as background colors
- **Text Styles**: Bold, italic, underline, and more
- **Auto-Detection**: Automatically detects color support

## Installation

```bash
npm install pintor
```

## Usage

```typescript
import colors from 'pintor'

// Text colors
console.log(colors.red('This is red text'))
console.log(colors.green('This is green text'))
console.log(colors.blue('This is blue text'))

// Bright colors
console.log(colors.brightRed('This is bright red text'))
console.log(colors.brightGreen('This is bright green text'))

// Background colors
console.log(colors.bgRed('This has a red background'))
console.log(colors.bgBlue('This has a blue background'))

// Text styles
console.log(colors.bold('This is bold text'))
console.log(colors.italic('This is italic text'))
console.log(colors.underline('This is underlined text'))
```

## Available Colors

| Category                     | Available Styles                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Foreground Colors**        | `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`, `gray`/`grey`                                                  |
| **Bright Foreground Colors** | `brightBlack`, `brightRed`, `brightGreen`, `brightYellow`, `brightBlue`, `brightMagenta`, `brightCyan`, `brightWhite`                 |
| **Background Colors**        | `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`, `bgGray`/`bgGrey`                              |
| **Bright Background Colors** | `bgBrightBlack`, `bgBrightRed`, `bgBrightGreen`, `bgBrightYellow`, `bgBrightBlue`, `bgBrightMagenta`, `bgBrightCyan`, `bgBrightWhite` |
| **Text Styles**              | `bold`, `dim`, `italic`, `underline`, `overline`, `inverse`, `hidden`, `strikethrough`                                                |

## Related projects

* [log-md](https://github.com/cezaraugusto/log-md)
* [mklicense](https://github.com/cezaraugusto/mklicense)
* [prefers-yarn](https://github.com/cezaraugusto/prefers-yarn)
* [go-git-it](https://github.com/cezaraugusto/go-git-it)
* [git-precision](https://github.com/cezaraugusto/git-precision)
* [isolated-deps](https://github.com/cezaraugusto/isolated-deps)

## License

MIT (c) Cezar Augusto.
