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

export const WithUser: Story = {
  args: {
    title: 'Dashboard',
    userName: 'John Doe',
    userRole: 'Cashier',
  },
}

export const WithThemeToggle: Story = {
  args: {
    title: 'Dashboard',
    themeMode: 'light',
    onThemeToggle: fn(),
    userName: 'John Doe',
    userRole: 'Cashier',
  },
}

export const DarkMode: Story = {
  args: {
    title: 'Orders',
    themeMode: 'dark',
    onThemeToggle: fn(),
    userName: 'Jane Smith',
    userRole: 'Manager',
  },
}

export const WithLanguageToggle: Story = {
  args: {
    title: 'Dashboard',
    language: 'en',
    onLanguageToggle: fn(),
    userName: 'John Doe',
    userRole: 'Cashier',
  },
}

const LanguageToggleExample = () => {
  const [lang, setLang] = useState<'en' | 'th'>('en')
  return (
    <TopBar
      title="Interactive Toggle"
      language={lang}
      onLanguageToggle={() => setLang(l => (l === 'en' ? 'th' : 'en'))}
    />
  )
}

export const InteractiveLanguageToggle: Story = {
  args: { title: 'Interactive Toggle' },
  render: () => <LanguageToggleExample />,
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
