import React from 'react';
import '../SignIn/SignIn.css';

class Registration extends React.Component { 
      constructor(props) {
            super();
            this.state = {
                  registerName: '',
                  registerEmail: '',
                  registerPassword: ''
            }
      }

      onNameChange = (event) => {
            this.setState({registerName: event.target.value});
      }

      onEmailChange = (event) => {
            this.setState({registerEmail: event.target.value});
      }

      onPasswordChange = (event) => {
            this.setState({registerPassword: event.target.value});
      }

      onSubmitRegister = () => {
            fetch('https://frame-the-face-api.onrender.com/register', { // By default, fetch() does a get request.
                  method: 'post',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                        name: this.state.registerName,
                        email: this.state.registerEmail,
                        password: this.state.registerPassword
                  })
            }).then(response => response.json())
            .then(user => {
                  // Making sure all fields are filled. This will also handle if the password is blank because the server will respond with a json string,
                  // which means that 'user' will be a string, so user.name and user.email will be falsey/undefined.
                  if (user.name && user.email) { 
                        this.props.loadUser(user);
                        this.props.onRouteChange('mainpage');
                  } else {
                        alert("Not all user information was entered.");
                  }
            }).catch(err => {
                  console.log('Registration Error:', err);
            });
      }

      render() {
            return (
                  <article className='br2 ba dark-gray b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow-3 center'>
                        <main className="pa4 black-80">
                              <div className="measure">
                                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                          <legend className="f2 ph0 mh0">Register</legend>
                                          <div className="mt3">
                                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                                <input 
                                                      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                      type="text" 
                                                      name="name"  
                                                      id="name"
                                                      onChange={this.onNameChange}
                                                />
                                          </div>
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
                                                value="Sign up"
                                                onClick={this.onSubmitRegister}
                                          />
                                    </div>
                              </div>
                        </main>
                  </article>
            );
      }
}

export default Registration;