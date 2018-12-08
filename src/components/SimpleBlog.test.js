import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'John Smith',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('calls like handler twice if like button is clicked twice', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'John Smith',
      likes: 42
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)

  })

})