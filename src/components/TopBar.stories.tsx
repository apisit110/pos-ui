import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { TopBar } from './TopBar'

const meta = {
  component: TopBar,
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Dashboard',
  },
}

export const WithThemeToggle: Story = {
  args: {
    title: 'Dashboard',
    themeMode: 'light',
    onThemeToggle: fn(),
  },
}

export const DarkMode: Story = {
  args: {
    title: 'Orders',
    themeMode: 'dark',
    onThemeToggle: fn(),
  },
}

const ThemeToggleExample = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  return (
    <TopBar
      title="Interactive Toggle"
      themeMode={mode}
      onThemeToggle={() => setMode(m => (m === 'light' ? 'dark' : 'light'))}
    />
  )
}

export const InteractiveThemeToggle: Story = {
  args: { title: 'Interactive Toggle' },
  render: () => <ThemeToggleExample />,
}
