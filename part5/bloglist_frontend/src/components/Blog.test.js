import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
	const mockHandler = jest.fn()

	const blog = {
		title: 'Component testing tutorial',
		author: 'John',
    url: 'nkjnkb',
		likes: 0,
		user: ['']
	}

	beforeEach(() => {
		container = render(
			<Blog
				blog={blog}
				handleLike={mockHandler}
				handleRemove={mockHandler} />
		).container
	})

  
  test('at start, details are not displayed', () => {
    const div = container.querySelector('.BlogSummary')
    expect(div).toBeVisible()
  })

  test('after clicking the button, details are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.BlogDetail')
    expect(div).not.toHaveStyle('display: none')
  })
})  


