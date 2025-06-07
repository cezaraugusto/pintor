import { Stream } from 'stream'

function shouldEnableColors(stream?: Stream): boolean {
  // Check FORCE_COLOR environment variable
  if ('FORCE_COLOR' in process.env) {
    return (
      process.env.FORCE_COLOR?.length === 0 ||
      parseInt(process.env.FORCE_COLOR || '0', 10) !== 0
    )
  }

  // Check NO_COLOR environment variable
  if ('NO_COLOR' in process.env) {
    return false
  }

  // Check stream TTY
  if (stream && !(stream as any).isTTY) {
    return false
  }

  // Check for dumb terminal
  if (process.env.TERM === 'dumb') {
    return false
  }

  // Check if running in a CI environment
  if (
    'CI' in process.env ||
    'TRAVIS' in process.env ||
    'CIRCLECI' in process.env ||
    'APPVEYOR' in process.env ||
    'GITLAB_CI' in process.env ||
    'GITHUB_ACTIONS' in process.env ||
    'BUILDKITE' in process.env ||
    'DRONE' in process.env ||
    'JENKINS_URL' in process.env
  ) {
    return false
  }

  // Check if running in Windows
  if (process.platform === 'win32') {
    // Check if running in Windows Terminal
    if ('WT_SESSION' in process.env) {
      return true
    }
    // Check if running in ConEmu
    if ('ConEmuANSI' in process.env) {
      return true
    }
    // Check if running in VS Code's integrated terminal
    if (
      'TERM_PROGRAM' in process.env &&
      process.env.TERM_PROGRAM === 'vscode'
    ) {
      return true
    }
  }

  // Check if terminal supports colors
  if ('COLORTERM' in process.env) {
    return true
  }

  // Check TERM environment variable
  const term = process.env.TERM || ''
  return /^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux|konsole|alacritty|kitty|wezterm|foot|contour|terminator|terminology|terminix|tilix|hyper|iterm2|mintty|st|tmux/i.test(
    term,
  )
}

export { shouldEnableColors }
