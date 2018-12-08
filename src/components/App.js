import React from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import AddBlogForm from './AddBlogForm'
import LoginForm from './LoginForm'
import Notification from './Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      userData: null,
      user: null,
      notification: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON)
      this.setState({
        userData: userData,
        user: userData.token  // koska tehtävänannossa käskettiin laittaa token useriin
      })
      blogService.setToken(userData.token)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', userData: user, user: user.token }) // koska tehtävänannossa käskettiin laittaa token useriin
    } catch (exception) {
      this.setNotification(true, 'invalid username or password')
    }
  }

  logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ userData: null, user: null })
    this.setNotification(false, 'Logged out')
  }

  addToBlogList = (newBlog) => {
    this.setState((prevState) => {
      return { blogs: prevState.blogs.concat(newBlog) }
    })
    this.setNotification(false, `Added blog ${newBlog.title}`)
  }

  setNotification = (isError, msg) => {
    this.setState((prevState) => ({ notification: { isError: isError, msg: msg } }))
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  render() {
    const loginForm = () => {
      const hideWhenVisible = { display: this.state.loginVisible ? 'none' : '' }
      const showWhenVisible = { display: this.state.loginVisible ? '' : 'none' }

      return (
        <div>
          <div style={hideWhenVisible}>
            <button onClick={e => this.setState({ loginVisible: true })}>log in</button>
          </div>
          <div style={showWhenVisible}>
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleLoginFieldChange}
              handleSubmit={this.login}
            />
            <button onClick={e => this.setState({ loginVisible: false })}>cancel</button>
          </div>
        </div>
      )
    }

    const blogForm = () => (
      <div>
        <h2>blogs</h2>
        <p>
          {this.state.userData.name} logged in <button onClick={this.logoutHandler}>logout</button>
        </p>
        <AddBlogForm addToBlogList={this.addToBlogList} />

        {this.state.blogs
          .sort((a, b) => (b.likes - a.likes))
          .map(blog => (
            <Blog key={blog._id} blog={blog} userId={this.state.userData.id}/>
          ))}
      </div>
    )

    return (
      <div>
        <Notification notification={this.state.notification} />
        {this.state.user && blogForm()}
        {!this.state.user && loginForm()}
      </div>
    )
  }
}

export default App
