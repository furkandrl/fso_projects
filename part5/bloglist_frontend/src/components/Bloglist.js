import React from 'react'
import Blog from './Blog'


const Bloglist = ({ handleLike, blogs, deleteBlog, user }) => {
	const view_blogs = blogs.sort((a, b) => b.likes - a.likes).map(blog => {
		return (
			<Blog key={blog.id}
				blog={blog}
				handleLike={handleLike}
				deleteBlog={deleteBlog}
			/>
		)
	})

	return (
		<div className='view_blogs'>
			{view_blogs}
		</div>
	)
}

export default Bloglist