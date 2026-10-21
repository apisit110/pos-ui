import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { PinInputField } from './PinInputField'

const meta = {
  component: PinInputField,
  tags: ['autodocs'],
  args: { label: 'PIN', value: '', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <PinInputField {...args} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof PinInputField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('PIN')).toBeVisible()
    await expect(canvas.getAllByRole('textbox')).toHaveLength(6)
  },
}

export const WithError: Story = {
  args: { error: 'Invalid PIN' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Invalid PIN')).toBeVisible()
  },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const FourDigits: Story = {
  args: { length: 4 },
}
