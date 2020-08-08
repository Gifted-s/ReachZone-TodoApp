import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import { ThemeContextProvider } from '../ThemeContext/ThemeContext';
export default class SignUp extends Component {
    static contextType = ThemeContextProvider
    constructor(props) {
        super(props);
        this.state = {

            name: '',
            errorArray: [],
            loginErrorIndex: [],
            password: '',
            password2: '',
            email: '',
            emailForLogin: '',
            showSpinner: false,




        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleSignup(e) {
        this.setState({ tries: this.state.tries + 1 })
        e.preventDefault()
        const errors = [];
        if (!this.state.email) {
            errors.push('email')
        }
        if (!this.state.name) {
            errors.push('name')
        }
        if (!this.state.password) {
            errors.push('password')
        }
        if (this.state.password !== this.state.password2) {
            errors.push('notMatch')
        }
        this.setState({ errorArray: errors })

        if (errors.length === 0) {
            this.setState({ showSpinner: true })
            this.makeSignupReq()
        }

    }
    async makeSignupReq() {
        const { name,
            password,
            email }
            = this.state

        const signupBody = await fetch("https://todo-api-241.herokuapp.com/todoapi/signup", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                password,
                email,
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)

        if (signupBody.error) {
            this.setState({ showSpinner: false })
            swal('', signupBody.error, 'error')

        }
        else {
            swal('Sign up successful', 'Click OK to Sign in', 'success').then(() => this.props.history.push('/signin'))

        }

    }




    render() {
        const { errorArray } = this.state
        const { theme } = this.context
        return (
            <React.Fragment>

                <div className={`container-fluid  ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-secondary'} form-container`}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="row">
                        <div style={{ backgroundColor: `${theme === 'dark' ? 'rgba(0,0,0,0.03)' : 'white'}` }} className={`col-md-4 col-sm-12 sf ${theme === 'dark' ? 'text-light' : ' text-secondary'}`}>

                            <React.Fragment>
                                <h3 className="text-center  my-2">Todo App</h3>
                                <h5 style={{ fontSize: 21 }} className={`${theme === 'dark' ? ' text-light' : 'text-secondary'} mr-3`}>SignUp</h5>
                                {
                                    !this.state.showSpinner &&
                                    <p style={{ cursor: 'pointer' }} className="text-secondary mr-3">

                                        Already have an account? <Link to='/signin'>Login</Link>

                                    </p>}
                                <form className="si_form" onSubmit={this.handleSignup.bind(this)}>
                                    <div className="form-div">
                                        <label className={`${theme === 'dark' ? 'text-light' : ' text-secondary'}`} htmlFor="email" >
                                            Name
                                                 </label>
                                        <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} autoFocus placeholder="Enter your full name" type="text" className="form-control" id="firstname" />
                                        {errorArray.includes('name') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> Enter your first name</small>}
                                    </div>




                                    <div className="form-div">
                                        <label className={`${theme === 'dark' ? 'text-light' : ' text-secondary'}`} htmlFor="email" >
                                            Email
                                                </label>
                                        <input value={this.state.email}  onChange={(e) => this.setState({ email: e.target.value })} placeholder="Enter your email" type="email" className="form-control" id="email" />
                                        {errorArray.includes('email') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> Enter your email</small>}

                                    </div>
                                    <div className="form-div">
                                        <label className={`${theme === 'dark' ? 'text-light' : ' text-secondary'}`} htmlFor="phone" >
                                            Password
                                                </label>
                                        <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Enter password" type="password" className="form-control" id="password" />
                                        {errorArray.includes('password') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> Enter password</small>}
                                    </div>
                                    <div className="form-div">
                                        <label htmlFor="phone" >
                                            Re-enter password
                                                </label>
                                        <input value={this.state.password2} onChange={(e) => this.setState({ password2: e.target.value })} placeholder="Retype password" type="password" className="form-control" id="password3" />
                                        {errorArray.includes('notMatch') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> The password does not match</small>}
                                    </div>





                                    <div className="form-div">
                                        {
                                            this.state.showSpinner ?
                                                <button className="form-control btn" disabled>Please wait.... {this.state.showSpinner && <Spinner style={{ width: 20, height: 20, float: 'right' }} size="small" />}  </button>
                                                :
                                                <button className="form-control btn" >Submit </button>
                                        }

                                    </div>
                                </form>

                            </React.Fragment>

                        </div>


                    </div>

                </div>
            </React.Fragment>
        )
    }
}
