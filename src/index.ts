import ansiStyles, { AnsiStyle } from './ansi-styles'
import { shouldEnableColors } from './color-support'

// Represents a function that can apply a style to text
type StyleFunction = (...args: (string | number | boolean)[]) => string

// Represents a color function that can be chained
type ColorFunction = StyleFunction & {
  [key: string]: StyleFunction
}

// Create a type that represents the actual colors object structure
type ColorsObject = {
  styles: Record<string, AnsiStyle>
} & {
  [K in keyof typeof ansiStyles]: ColorFunction
}

function createStyleFunction(styleName: string): ColorFunction {
  const fn = ((...args) => {
    const text = args.map(String).join(' ')
    if (!text) return text

    const style = ansiStyles[styleName]
    if (!style) return text

    // Check if colors should be enabled at call time
    if (!shouldEnableColors(process.stdout)) {
      return text
    }

    // Check if the text already has ANSI codes
    const hasAnsiCodes = /\u001b\[[0-9]+m/.test(text)
    if (hasAnsiCodes) {
      // If the text already has ANSI codes, wrap it with our style
      return `${style.open}${text}${style.close}`
    }

    return `${style.open}${text}${style.close}`
  }) as ColorFunction

  // Add all style functions to the returned function for chaining
  for (const name of Object.keys(ansiStyles)) {
    Object.defineProperty(fn, name, {
      get: () => createStyleFunction(name),
    })
  }

  return fn
}

function createColorsObject(): ColorsObject {
  const colors = {
    styles: ansiStyles,
  } as ColorsObject

  // Add style functions to the colors object
  for (const styleName of Object.keys(ansiStyles)) {
    Object.defineProperty(colors, styleName, {
      get: () => createStyleFunction(styleName),
    })
  }

  return colors
}

// Create and export the colors object
const colors = createColorsObject()

// Export color support utilities
export const supportsColor = shouldEnableColors
export const stdout = shouldEnableColors(process.stdout)
export const stderr = shouldEnableColors(process.stderr)

export default colors
