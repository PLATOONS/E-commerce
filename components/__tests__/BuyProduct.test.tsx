import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddToCart from '../AddToCart'

describe('AddToCart Button', () => {
  it('renders a button with label "Add to Cart"', () => {
    render(<AddToCart onClick={() => {}} />)

    // Look for the button by its text
    const button = screen.getByRole('button', { name: /add to cart/i })

    // Assert that it exists in the document
    expect(button).toBeInTheDocument()
  })
})
