import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { DateRangeFilter } from './DateRangeFilter'

const meta = {
  component: DateRangeFilter,
  tags: ['autodocs'],
  args: { label: 'Date', value: { start: '', end: '' }, onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <DateRangeFilter {...args} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof DateRangeFilter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('*')).toBeNull()
    await userEvent.type(canvas.getByLabelText('Date start'), '2025-03-01')
    await userEvent.type(canvas.getByLabelText('Date end'), '2025-03-31')
    await expect(canvas.getByLabelText('Date start')).toHaveValue('2025-03-01')
    await expect(canvas.getByLabelText('Date end')).toHaveValue('2025-03-31')
  },
}

export const WithValue: Story = {
  args: { value: { start: '2025-01-01', end: '2025-01-31' } },
  play: async ({ canvas }) => {
    // end is bounded by start and vice versa
    await expect(canvas.getByLabelText('Date end')).toHaveAttribute('min', '2025-01-01')
    await expect(canvas.getByLabelText('Date start')).toHaveAttribute('max', '2025-01-31')
  },
}

export const Required: Story = {
  args: { required: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('*')).toBeVisible()
  },
}
