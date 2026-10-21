import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { DateFilter } from './DateFilter'

const meta = {
  component: DateFilter,
  tags: ['autodocs'],
  args: { label: 'From', value: '', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <DateFilter {...args} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof DateFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('*')).toBeNull()
  },
}

export const WithValue: Story = {
  args: { value: '2025-01-15' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('From')).toHaveValue('2025-01-15')
  },
}

export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('*')).toBeVisible()
  },
}

export const Typing: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('From')
    await userEvent.type(input, '2025-03-01')
    await expect(input).toHaveValue('2025-03-01')
  },
}
