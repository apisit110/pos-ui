import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, fn } from 'storybook/test'
import { InputField } from './InputField'

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const meta = {
  component: InputField,
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Enter username')
    await expect(input).toBeVisible()
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    error: 'Email is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Read Only',
    value: 'Cannot edit this',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
}

// Verifies ThemeProvider is wired up — error text color comes from theme.semantics.colors.text.error = #f43f5e
export const CssCheck: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    error: 'Email is required',
  },
  play: async ({ canvas }) => {
    const errorText = canvas.getByText('Email is required')
    await expect(getComputedStyle(errorText).color).toBe('rgb(244, 63, 94)')
  },
}

export const WithDefaultTrailingIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search something...',
    onTailClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(args.onTailClick).toHaveBeenCalledOnce()
  },
}

export const WithCustomTrailingIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    trailingIcon: <EyeIcon />,
    onTailClick: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button')
    await expect(button).toBeVisible()
    await userEvent.click(button)
    await expect(args.onTailClick).toHaveBeenCalledOnce()
  },
}

const PasswordToggle = () => {
  const [visible, setVisible] = useState(false)
  return (
    <InputField
      label="Password"
      placeholder="Enter password"
      type={visible ? 'text' : 'password'}
      trailingIcon={<EyeIcon />}
      onTailClick={() => setVisible(v => !v)}
    />
  )
}

export const PasswordVisibilityToggle: Story = {
  args: { label: 'Password' },
  render: () => <PasswordToggle />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Enter password')
    await expect(input).toHaveAttribute('type', 'password')
    await userEvent.click(canvas.getByRole('button'))
    await expect(input).toHaveAttribute('type', 'text')
  },
}
