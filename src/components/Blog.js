import React from 'react'
import blogService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsVisible: false,
      blog: props.blog,
      userId: props.userId
    }
  }

  toggleDetails = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible })
  }

  addLike = async () => {
    const updatedBlog = {
      ...this.state.blog,
      likes: this.state.blog.likes ? this.state.blog.likes + 1 : 1
    }
    this.setState({ blog: updatedBlog })
    await blogService.update(updatedBlog)
  }

  delete = async () => {
    if (window.confirm(`delete '${this.state.blog.title}'?`)) {
      await blogService.deleteBlog(this.state.blog)
    }
  }

  render() {
    const showWhenVisible = { display: this.state.detailsVisible ? '' : 'none' }
    const showWhenMatchingUser = { display: this.state.blog.user._id === this.state.userId ? '' : 'none' }
    return (
      <div style={blogStyle} >
        <div className="titleAndAuthor" onClick={this.toggleDetails}>
          {this.state.blog.title} {this.state.blog.author}
        </div>
0
        <div className="details" style={showWhenVisible}>
          <div>
            <a href={this.state.blog.url}>{this.state.blog.url}</a>
          </div>
          <div>
            {this.state.blog.likes} likes <button onClick={this.addLike}>like</button>
          </div>
          <div>
            added by {this.state.blog.user.username}
          </div>
          <div style={showWhenMatchingUser}>
            <button onClick={this.delete}>delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog