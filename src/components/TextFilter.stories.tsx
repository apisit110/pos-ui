import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { TextFilter } from './TextFilter'

const meta = {
  component: TextFilter,
  tags: ['autodocs'],
  args: { label: 'Customer', placeholder: 'Search customer', value: '', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <TextFilter {...args} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof TextFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Search customer')
    await userEvent.type(input, 'John')
    await expect(input).toHaveValue('John')
  },
}

export const WithValue: Story = {
  args: { value: 'Jane' },
}

export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('*')).toBeVisible()
  },
}
