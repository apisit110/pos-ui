import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'
import { SelectFilter } from './SelectFilter'

const options = [
  { label: 'Cash', value: 'cash' },
  { label: 'Card', value: 'card' },
]

const meta = {
  component: SelectFilter,
  tags: ['autodocs'],
  args: { label: 'Payment', options, placeholder: 'All', value: '', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState('')
    return <SelectFilter {...args} multiple={false} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof SelectFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('*')).toBeNull()
  },
}

export const Multiple: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>(['cash'])
    return <SelectFilter {...args} multiple value={value} onChange={setValue} />
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Cash')).toBeVisible()
    await expect(canvas.getByLabelText('Clear')).toBeVisible()
  },
}

export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('*')).toBeVisible()
  },
}
