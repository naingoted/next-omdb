

import { render, screen, waitForElement } from '@testing-library/react'
import Pagination from '../../../components/UI/Pagination'

describe('pagination tests', () => {
    describe('no prev button', () => {
        const { getByText } = render(<Pagination page={1} total={20} />)
        it('renders Next Button', async () => {
            await waitForElement(() => getByText(/Next/i))
        })
        // it('renders Pager', async () => {
        //     await waitForElement(() => getByText(/showing 1 out of 2/i))
        // })
    })

    it('renders Prev and Next Button', async () => {
        const { getByText } = render(<Pagination page={2} total={21} />)
        await waitForElement(() => getByText(/Next/i))
        await waitForElement(() => getByText(/Prev/i))
    })
});
