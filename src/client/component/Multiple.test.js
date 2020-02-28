import React from 'react'
import { render } from '@testing-library/react'
import Multiple from './Multiple'

it('should render the multiple component', () => {
  const { debug } = render(<Multiple />)

  expect(true).toBeTruthy()
})
