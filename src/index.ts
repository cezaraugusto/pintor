import ansiStyles, { AnsiStyle } from './ansi-styles'
import { shouldEnableColors } from './color-support'

// Represents a function that can apply a style to text
type StyleFunction = (...args: (string | number | boolean)[]) => string

// Represents a color function that can be chained
type ColorFunction = StyleFunction & {
  [key: string]: StyleFunction
}

// Main interface for the colors object that provides text styling capabilities
interface Colors {
  styles: Record<string, AnsiStyle>
  [key: string]: ColorFunction | unknown
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

function createColorsObject(): Colors {
  const colors: Colors = {
    styles: ansiStyles,
  }

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
