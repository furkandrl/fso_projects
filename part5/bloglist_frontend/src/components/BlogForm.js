import React from 'react'

const BlogForm = ({ titleChange, authorChange, urlChange, addBlog }) => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            onChange={titleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            onChange={authorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            onChange={urlChange}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm;