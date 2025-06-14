// Represents an ANSI style with its opening sequence, closing sequence,
// and a regular expression to match the closing sequence.
export interface AnsiStyle {
  open: string
  close: string
  closeRe: RegExp
}

// ANSI escape codes for text styling
// Format: [openCode, closeCode]
const ansiEscapeCodes: Record<string, [number, number]> = {
  // Text styles
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  overline: [53, 55],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  // Foreground colors
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39], // Alias for gray (British English)

  // Bright foreground colors
  brightBlack: [90, 39],
  brightRed: [91, 39],
  brightGreen: [92, 39],
  brightYellow: [93, 39],
  brightBlue: [94, 39],
  brightMagenta: [95, 39],
  brightCyan: [96, 39],
  brightWhite: [97, 39],

  // Background colors
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  bgGray: [100, 49],
  bgGrey: [100, 49], // Alias for bgGray (British English)

  // Bright background colors
  bgBrightBlack: [100, 49],
  bgBrightRed: [101, 49],
  bgBrightGreen: [102, 49],
  bgBrightYellow: [103, 49],
  bgBrightBlue: [104, 49],
  bgBrightMagenta: [105, 49],
  bgBrightCyan: [106, 49],
  bgBrightWhite: [107, 49],
}

// Map of style names to their ANSI style objects.
// Generated from ansiEscapeCodes.
const ansiStyles: Record<string, AnsiStyle> = {}

// Convert ANSI codes to style objects with open/close sequences
const escapeCodes = Object.entries(ansiEscapeCodes)

for (const [styleName, [openCode, closeCode]] of escapeCodes) {
  const openSequence = `\u001b[${openCode}m`
  const closeSequence = `\u001b[${closeCode}m`

  ansiStyles[styleName] = {
    open: openSequence,
    close: closeSequence,
    closeRe: new RegExp(
      // Replace all special characters with their escaped version
      closeSequence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g',
    ),
  }
}

export default ansiStyles
