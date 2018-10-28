import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const Statistiikka = () => {
  const stateNow = store.getState();
  const palautteita = Object.entries(stateNow).reduce((total, keyVal) => (total + keyVal[1]), 0)
  const nollaa = () => { store.dispatch({ type: 'ZERO' }) }

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{stateNow.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{stateNow.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{stateNow.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(stateNow.good - stateNow.bad) / (stateNow.good + stateNow.ok + stateNow.bad)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{100 * ((stateNow.good) / (stateNow.good + stateNow.ok + stateNow.bad))}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={nollaa}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)