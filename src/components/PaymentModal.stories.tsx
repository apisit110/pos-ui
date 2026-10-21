import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { PaymentModal } from './PaymentModal'

const meta = {
  component: PaymentModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    isOpen: true,
    totalAmount: 25.5,
    onClose: fn(),
    onPaymentSuccess: fn(),
    onProcessPayment: fn(async (_method: 'CASH', received?: number) => ({
      changeAmount: (received ?? 0) - 25.5,
    })),
  },
} satisfies Meta<typeof PaymentModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Amount Due')).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Confirm Payment' })).toBeDisabled()
  },
}

export const Closed: Story = {
  args: { isOpen: false },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('Payment')).toBeNull()
  },
}

export const InsufficientAmount: Story = {
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByPlaceholderText('0.00'), '10')
    await expect(canvas.getByRole('button', { name: 'Confirm Payment' })).toBeDisabled()
  },
}

export const PaySuccessfully: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.type(canvas.getByPlaceholderText('0.00'), '30')
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm Payment' }))
    await expect(await canvas.findByText('Payment Successful')).toBeVisible()
    await expect(args.onProcessPayment).toHaveBeenCalledWith('CASH', 30)
  },
}

export const PaymentFailed: Story = {
  args: {
    onProcessPayment: fn(async (_method: 'CASH', _received?: number): Promise<{ changeAmount: number }> => {
      throw new Error('Drawer offline')
    }),
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByPlaceholderText('0.00'), '30')
    await userEvent.click(canvas.getByRole('button', { name: 'Confirm Payment' }))
    await expect(await canvas.findByText('Drawer offline')).toBeVisible()
  },
}

export const CloseButton: Story = {
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: '×' }))
    await expect(args.onClose).toHaveBeenCalledOnce()
  },
}

const Controlled = (args: React.ComponentProps<typeof PaymentModal>) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Open payment</button>
      <PaymentModal {...args} isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}

export const Interactive: Story = {
  render: (args) => <Controlled {...args} />,
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByText('Open payment'))
    await expect(await canvas.findByText('Amount Due')).toBeVisible()
  },
}
