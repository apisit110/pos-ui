import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { PinInput } from './PinInput'

const meta = {
  component: PinInput,
  tags: ['autodocs'],
  args: { value: '', onChange: () => {} },
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return <PinInput {...args} value={value} onChange={setValue} />
  },
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox')
    await expect(inputs).toHaveLength(6)
    await userEvent.type(inputs[0], '123')
    await expect(inputs[0]).toHaveValue('1')
    await expect(inputs[2]).toHaveValue('3')
    await expect(inputs[3]).toHaveFocus()
  },
}

export const TabLeavesGroup: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value)
    return (
      <>
        <PinInput {...args} value={value} onChange={setValue} />
        <button>Next</button>
      </>
    )
  },
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox')
    await userEvent.tab()
    await expect(inputs[0]).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Next' })).toHaveFocus()
    await userEvent.tab({ shift: true })
    await expect(inputs[0]).toHaveFocus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(inputs[1]).toHaveFocus()
  },
}

export const BackspaceRemovesLastDigit: Story = {
  args: { value: '123' },
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox')
    await userEvent.click(inputs[0])
    await userEvent.keyboard('{Backspace}')
    await expect(inputs[0]).toHaveValue('1')
    await expect(inputs[2]).toHaveValue('')
    await expect(inputs[2]).toHaveFocus()
    await userEvent.keyboard('{Backspace}{Backspace}')
    await expect(inputs[0]).toHaveValue('')
    await expect(inputs[0]).toHaveFocus()
  },
}

export const TypingAppendsAfterLastDigit: Story = {
  args: { value: '12' },
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox')
    await userEvent.click(inputs[4])
    await userEvent.keyboard('3')
    await expect(inputs[2]).toHaveValue('3')
    await expect(inputs[4]).toHaveValue('')
    await expect(inputs[3]).toHaveFocus()
  },
}

export const FourDigits: Story = {
  args: { length: 4 },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('textbox')).toHaveLength(4)
  },
}

export const Prefilled: Story = {
  args: { value: '123456' },
}

export const Disabled: Story = {
  args: { value: '12', disabled: true },
  play: async ({ canvas }) => {
    for (const input of canvas.getAllByRole('textbox')) await expect(input).toBeDisabled()
  },
}

export const CustomSize: Story = {
  args: { boxSize: '5rem' },
}

export const RejectsNonDigits: Story = {
  play: async ({ canvas }) => {
    const inputs = canvas.getAllByRole('textbox')
    await userEvent.type(inputs[0], 'a')
    await expect(inputs[0]).toHaveValue('')
  },
}

export const Masked: Story = {
  args: { masked: true },
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll<HTMLInputElement>('input')
    await expect(inputs).toHaveLength(6)
    for (const input of inputs) await expect(input).toHaveAttribute('type', 'password')
    await userEvent.type(inputs[0], '12')
    await expect(inputs[0]).toHaveValue('1')
    await expect(inputs[1]).toHaveValue('2')
    await expect(inputs[2]).toHaveFocus()
  },
}
