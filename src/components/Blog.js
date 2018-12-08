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
      blog: props.blog
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
    const result = await blogService.update(updatedBlog)
  }

  render() {
    const showWhenVisible = { display: this.state.detailsVisible ? '' : 'none' }
    return (
      <div style={blogStyle} >
        <div onClick={this.toggleDetails}>
          {this.state.blog.title} {this.state.blog.author}
        </div>

        <div style={showWhenVisible}>
          <p>
            <a href={this.state.blog.url}>{this.state.blog.url}</a>
          </p>
          <p>
            {this.state.blog.likes} likes <button onClick={this.addLike}>like</button>
          </p>
          <p>
            added by {this.state.blog.user.username}
          </p>
        </div>
      </div>
    )
  }
}

export default Blog