import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it.only('renders details only after clicking', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'John Smith',
      likes: 42,
      user: { _id : 'f00' }
    }

    const blogComponent = shallow(<Blog blog={blog} userId='f00' />)
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    let detailsDiv = blogComponent.find('.details')

    expect(detailsDiv.html()).toContain('style="display:none"')
    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)

    const button = blogComponent.find('.titleAndAuthor')
    button.simulate('click')
    detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.html()).toContain('style="display:"')

  })

})