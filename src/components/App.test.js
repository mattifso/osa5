import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './Blog'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'

describe('<App />', () => {
  let app
  describe('when user is not logged', () => {
    beforeEach(() => {
      window.localStorage.removeItem('loggedBlogappUser')
      app = mount(<App />)
    })

    it('renders login form and nothing else when user is not yet logged in', () => {
      app.update()
      expect(app.find(Blog).length).toEqual(0)
      expect(app.find(LoginForm).length).toEqual(1)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'joe',
        token: '345345345',
        name: 'Joe Q. Public',
        id: 'asdfq234534'
      }

      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders the list of blogs when the user is logged in', () => {
      app.update()
      expect(app.find(Blog).length).toEqual(blogService.mockedBlogs.length)
      expect(app.find(LoginForm).length).toEqual(0)
    })
  })
})