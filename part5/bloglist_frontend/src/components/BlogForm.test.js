import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()
    
    render(<BlogForm   
      titleChange={(e) => setTitle(e.target.value)}
      authorChange={(e) => setAuthor(e.target.value)}
      urlChange={(e) => setUrl(e.target.value)}
      addBlog={(e) => addBlog(e)}  />)
    
      const inputs = screen.getAllByRole('textbox')
      const sendButton = screen.getByText('Create')
    
      await user.type(inputs[0], 'testing a form...' )
      await user.click(sendButton)
    
      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0].content).toBe('testing a form...' )
    })