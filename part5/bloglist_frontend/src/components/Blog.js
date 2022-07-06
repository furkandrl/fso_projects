import React, { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog }) => {
	const [visible, setVisible] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleVisibility = () => setVisible(!visible)




	return (
		<div className='Blog' style={blogStyle}>
		{visible ? (
		  <div className='BlogDetail'>
			<table>
			  <tbody>
				<tr>
				  <td>Title</td>
				  <td>{blog.title}</td>
				</tr>
				<tr>
				  <td>Author</td>
				  <td>{blog.author}</td>
				</tr>
				<tr>
				  <td>URL</td>
				  <td>
					<a href={blog.url}>{blog.url}</a>
				  </td>
				</tr>
				<tr>
				  <td>Likes</td>
				  <td>{blog.likes}</td>
				</tr>
				<tr>
				  <td>added by {blog.user.name}</td>
				  
				</tr>
			  </tbody>
			</table>
			<button value={blog.id} onClick={() => handleLike({blog})}>like</button>		
			<button value={blog.id} onClick={deleteBlog}>delete</button>			
		  </div>
		) : (
		  <div className='BlogSummary'>
			<p>
			  {blog.title} - {blog.author}
			</p>
		  </div>
		)}
		<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
	  </div>
	)
  }
	

export default Blog