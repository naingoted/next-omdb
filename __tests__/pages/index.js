import { render } from '@testing-library/react'
import Index from '../../pages/old'

test('App renders without error', () => {
    const { getByTestId } = render(<Index />)
    const element = getByTestId('app-wrapper')
    expect(element).toBeTruthy()
})

