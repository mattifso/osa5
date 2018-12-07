import React from 'react'
const Notification = ({ notification }) => (
  notification ?
    notification.isError ?
      <div style={{ border: 1, borderStyle: 'solid', borderColor: 'red', padding: 15, width: '25em' }}>
        {notification.msg}
      </div> :
      <div style={{ border: 1, borderStyle: 'solid', borderColor: 'green', padding: 15, width: '25em' }}>
        {notification.msg}
      </div>
    : null
)

export default Notification