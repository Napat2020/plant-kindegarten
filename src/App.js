import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Routing from './routes'

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <nav className="navbar is-orange-invert" role="navigation" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={process.env.PUBLIC_URL + '/images/Logo.png'} alt="LOGO"/>
                
              </a>
            </div>
            <div className="navbar-menu is-active">
              <div className="navbar-end">
                <NavLink exact to="/" activeClassName="is-active" className="navbar-item"><i class="fas fa-home"></i>Home</NavLink>
                <NavLink to="/marketplace" activeClassName="is-active" className="navbar-item"><i class="fas fa-shopping-cart"></i>Marketplace</NavLink>
                <NavLink to="/about" activeClassName="is-active" className="navbar-item"><i class="fas fa-info-circle"></i>About</NavLink>
                <NavLink to="/login" activeClassName="is-active" className="navbar-item"><i class="fas fa-sign-in-alt"></i>Login</NavLink>
              </div>
            </div>
          </div>
        </nav>

        <Routing />
      </div>
    )
  }
}

export default App
