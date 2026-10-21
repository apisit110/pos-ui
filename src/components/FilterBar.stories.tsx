import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { FilterBar } from './FilterBar'
import { TextFilter } from './TextFilter'
import { DateFilter } from './DateFilter'
import { SelectFilter } from './SelectFilter'
import { ClearFilterButton } from './ClearFilterButton'

const options = [
  { label: 'Cash', value: 'cash' },
  { label: 'Card', value: 'card' },
]

const meta = {
  component: FilterBar,
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [payment, setPayment] = useState('')
    return (
      <FilterBar>
        <TextFilter label="Customer" placeholder="Search customer" value={text} onChange={setText} />
        <DateFilter label="Date" value={date} onChange={setDate} />
        <SelectFilter label="Payment" options={options} placeholder="All" value={payment} onChange={setPayment} />
        <ClearFilterButton onClick={() => { setText(''); setDate(''); setPayment('') }}>Clear</ClearFilterButton>
      </FilterBar>
    )
  },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText('Search customer')
    await userEvent.type(input, 'John')
    await expect(input).toHaveValue('John')
    await userEvent.click(canvas.getByRole('button', { name: 'Clear' }))
    await expect(input).toHaveValue('')
  },
}
