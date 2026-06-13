import React from 'react'
import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { darkTheme, lightTheme } from '../src/theme'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === 'light' ? lightTheme : darkTheme
      const bg = context.globals.theme === 'light'
        ? lightTheme.semantics.colors.bg.main
        : darkTheme.semantics.colors.bg.main
      return (
        <ThemeProvider theme={theme}>
          <div style={{ padding: '2rem', background: bg, minHeight: '100vh' }}>
            <Story />
          </div>
        </ThemeProvider>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview