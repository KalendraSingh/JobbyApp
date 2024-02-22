import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

const websiteLogoInForm =
  'https://assets.ccbp.in/frontend/react-js/logo-img.png'

class LoginForm extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onGetUsername = event => this.setState({username: event.target.value})

  onGetEmail = event => this.setState({email: event.target.value})

  onGetPassword = event => this.setState({password: event.target.value})

  //   onSubmitSuccess = jwtToken => {
  //     const {history} = this.props

  //     Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

  //     history.replace('/')
  //   }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, email, password} = this.state
    const userDetails = {username, email, password}
    const loginApiUrl = 'https://users-7c43.onrender.com/users'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      history.replace('/login')
    } else {
      this.onSubmitFailure(data.error)
    }
  }

  render() {
    const {username, email, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form
          className="login-form-container"
          onSubmit={this.onSubmitLoginForm}
        >
          <div className="form-logo-container">
            <img src={websiteLogoInForm} alt="website logo" />
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={this.onGetUsername}
            placeholder="username"
            id="username"
          />
          <br />
          <label className="form-label" htmlFor="email">
            EMAIL
          </label>
          <br />
          <input
            className="form-input"
            type="text"
            value={email}
            onChange={this.onGetEmail}
            placeholder="email"
            id="email"
          />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={this.onGetPassword}
            placeholder="password"
            id="password"
          />
          <br />
          <br />
          <button className="form-submit-button" type="submit">
            Register
          </button>
          <p style={{textAlign: 'center'}}>
            <Link to="/login" style={{textDecoration: 'none', color: 'white'}}>
              Already have account?
            </Link>
          </p>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
