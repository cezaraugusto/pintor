import { expect, test, vi, beforeEach } from 'vitest'
import colors from '../src/index'
import type { WriteStream } from 'node:tty'

const str = 'string'

// Mock process.env and process.stdout
const originalEnv = process.env
const originalStdout = process.stdout

beforeEach(() => {
  // Reset environment variables
  process.env = { ...originalEnv }
  // Force colors in tests
  process.env.FORCE_COLOR = '1'
  // Mock stdout as TTY
  vi.stubGlobal('process', {
    ...process,
    stdout: {
      ...originalStdout,
      isTTY: true,
    },
  })
})

// Type assertion for colors object
const c = colors as unknown as {
  bold: (str: string) => string
  italic: (str: string) => string
  underline: (str: string) => string
  strikethrough: (str: string) => string
  inverse: (str: string) => string
  white: (str: string) => string
  grey: (str: string) => string
  black: (str: string) => string
  blue: (str: string) => string
  cyan: (str: string) => string
  green: (str: string) => string
  magenta: (str: string) => string
  red: (str: string) => string
  yellow: (str: string) => string
  brightWhite: (str: string) => string
  brightBlue: (str: string) => string
  brightCyan: (str: string) => string
  brightGreen: (str: string) => string
  brightMagenta: (str: string) => string
  brightRed: (str: string) => string
  brightYellow: (str: string) => string
}

test('colors', () => {
  // Test basic styles
  expect(c.bold(str)).toBe('\x1B[1m' + str + '\x1B[22m')
  expect(c.italic(str)).toBe('\x1B[3m' + str + '\x1B[23m')
  expect(c.underline(str)).toBe('\x1B[4m' + str + '\x1B[24m')
  expect(c.strikethrough(str)).toBe('\x1B[9m' + str + '\x1B[29m')
  expect(c.inverse(str)).toBe('\x1B[7m' + str + '\x1B[27m')

  // Test colors
  expect(c.white(str)).toBe('\x1B[37m' + str + '\x1B[39m')
  expect(c.grey(str)).toBe('\x1B[90m' + str + '\x1B[39m')
  expect(c.black(str)).toBe('\x1B[30m' + str + '\x1B[39m')
  expect(c.blue(str)).toBe('\x1B[34m' + str + '\x1B[39m')
  expect(c.cyan(str)).toBe('\x1B[36m' + str + '\x1B[39m')
  expect(c.green(str)).toBe('\x1B[32m' + str + '\x1B[39m')
  expect(c.magenta(str)).toBe('\x1B[35m' + str + '\x1B[39m')
  expect(c.red(str)).toBe('\x1B[31m' + str + '\x1B[39m')
  expect(c.yellow(str)).toBe('\x1B[33m' + str + '\x1B[39m')

  // Test bright colors
  expect(c.brightWhite(str)).toBe('\x1B[97m' + str + '\x1B[39m')
  expect(c.brightBlue(str)).toBe('\x1B[94m' + str + '\x1B[39m')
  expect(c.brightCyan(str)).toBe('\x1B[96m' + str + '\x1B[39m')
  expect(c.brightGreen(str)).toBe('\x1B[92m' + str + '\x1B[39m')
  expect(c.brightMagenta(str)).toBe('\x1B[95m' + str + '\x1B[39m')
  expect(c.brightRed(str)).toBe('\x1B[91m' + str + '\x1B[39m')
  expect(c.brightYellow(str)).toBe('\x1B[93m' + str + '\x1B[39m')

  // Test with newlines
  const testStringWithNewLines = str + '\n' + str
  expect(c.red(testStringWithNewLines)).toBe(
    '\x1b[31m' + str + '\n' + str + '\x1b[39m',
  )

  // Test nested styles
  const testStringWithNewLinesStyled = c.underline(str) + '\n' + c.bold(str)
  expect(c.red(testStringWithNewLinesStyled)).toBe(
    '\x1b[31m' +
      '\x1b[4m' +
      str +
      '\x1b[24m' +
      '\n' +
      '\x1b[1m' +
      str +
      '\x1b[22m' +
      '\x1b[39m',
  )
})

test('non-color environments', () => {
  // Test in CI environment
  process.env.CI = 'true'
  process.env.FORCE_COLOR = undefined
  expect(c.red(str)).toBe(str)
  expect(c.bold(str)).toBe(str)

  // Test with NO_COLOR
  process.env.CI = undefined
  process.env.NO_COLOR = 'true'
  expect(c.red(str)).toBe(str)
  expect(c.bold(str)).toBe(str)

  // Test with dumb terminal
  process.env.NO_COLOR = undefined
  process.env.TERM = 'dumb'
  expect(c.red(str)).toBe(str)
  expect(c.bold(str)).toBe(str)

  // Test with non-TTY
  vi.stubGlobal('process', {
    ...process,
    stdout: {
      ...originalStdout,
      isTTY: false,
    },
  })
  expect(c.red(str)).toBe(str)
  expect(c.bold(str)).toBe(str)
})

test('force color', () => {
  // Test with FORCE_COLOR=1
  process.env.FORCE_COLOR = '1'
  expect(c.red(str)).toBe('\x1B[31m' + str + '\x1B[39m')
  expect(c.bold(str)).toBe('\x1B[1m' + str + '\x1B[22m')

  // Test with FORCE_COLOR=0
  process.env.FORCE_COLOR = '0'
  expect(c.red(str)).toBe(str)
  expect(c.bold(str)).toBe(str)
})
