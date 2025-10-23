import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductDescription from '../Description'

describe('ProductDescription', () => {
  it('renders the product name', () => {
    const testName = 'Wireless Mouse'
    const testDescription = 'A high-precision ergonomic mouse.'

    render(<ProductDescription name={testName} description={testDescription} />)

    // Check if the product name is displayed
    const nameElement = screen.getByText(testName)
    expect(nameElement).toBeInTheDocument()
  })
})
