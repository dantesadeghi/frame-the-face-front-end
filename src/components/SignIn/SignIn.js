import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
      constructor(props) {
            super();
            this.state = {
                  signInEmail: '',
                  signInPassword: ''
            }
      }

      onEmailChange = (event) => {
            this.setState({signInEmail: event.target.value});
      }

      onPasswordChange = (event) => {
            this.setState({signInPassword: event.target.value});
      }

      onSubmitSignIn = () => {
            fetch('https://frame-the-face-api.onrender.com/signin', { // By default, fetch() does a GET request.
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                        email: this.state.signInEmail,
                        password: this.state.signInPassword
                  })
            }).then(response => response.json())
            .then(user => {
                  if (user.id){ // Does the user exist? If the id exists, the user exists...
                        this.props.loadUser(user);
                        this.props.onRouteChange('mainpage');
                  } else {
                        // The server will only respond with a user if the password is valid. Otherwisse, if the password
                        // is invalid or blank it will respond with a json string, which will mean that 'user.id' is undefined/falsey.
                        alert("Incorrect Email and Password.");
                  }
            }).catch(err => {
                  console.log('Sign in Error:', err);
            });
      }

      render() {
            const { onRouteChange } = this.props;
            return (
                  <article className='br2 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow-3 center'>
                        <main className="pa4 black-80">
                              <div className="measure">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                          <legend className="f2 ph0 mh0">Sign In</legend>
                                          <div className="mt3">
                                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                                <input 
                                                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                      type="email" 
                                                      name="email-address"  
                                                      id="email-address"
                                                      onChange={this.onEmailChange}
                                                />
                                          </div>
                                          <div className="mv3">
                                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                                <input 
                                                      className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                      type="password" 
                                                      name="password"  
                                                      id="password"
                                                      onChange={this.onPasswordChange}
                                                />
                                          </div>
                                    </fieldset>
                                    <div className="">
                                          <input 
                                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                                type="submit" 
                                                value="Sign in"
                                                onClick={this.onSubmitSignIn}
                                          />
                                    </div>
                                    <div id='register-button' className="lh-copy mt3">
                                          <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                                    </div>
                              </div>
                        </main>
                  </article>
            );
      }
}

export default SignIn;