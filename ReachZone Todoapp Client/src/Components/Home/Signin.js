import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import swal from 'sweetalert';
import { ThemeContextProvider } from '../ThemeContext/ThemeContext';
export default class SignIn extends Component {
    static contextType = ThemeContextProvider
    constructor(props) {
        super(props);
        this.state = {
            errorArray: [],
            password: '',
            password2: '',
            email: '',
            showSpinner: false,




        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleSignup(e) {

        e.preventDefault()
        const errors = [];
        if (!this.state.email) {
            errors.push('email')
        }
        if (!this.state.password) {
            errors.push('password')
        }
        this.setState({ errorArray: errors })

        if (errors.length === 0) {
            this.setState({ showSpinner: true })
            this.makeSigninReq()
        }

    }
    async makeSigninReq() {
        const { email, password } = this.state

        const signinBody = await fetch("https://todo-api-241.herokuapp.com/todoapi/signin", {
            method: 'Post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })

        })
            .then((response) => response.json())
            .then(resJson => resJson)
            .catch(err => err.message)

        if (signinBody.error) {
            this.setState({ showSpinner: false })
            swal('', signinBody.error, 'error')

        }
        else {
            localStorage.setItem('todouser', JSON.stringify({ signinBody }))
            this.props.history.push('/dashboard', { user: signinBody })

        }

    }




    render() {
        const { theme } = this.context
        const { errorArray } = this.state
        return (
            <React.Fragment>

                <div className={`container-fluid  ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-secondary'} form-container`}>
                    <div style={{ display: 'flex', justifyContent: 'center' }} className="row">

                        <div style={{ backgroundColor: `${theme === 'dark' ? 'rgba(0,0,0,0.03)' : 'white'}` }} className={`col-md-4 col-sm-12 sf ${theme === 'dark' ? 'text-light' : ' text-secondary'}`}>

                            <React.Fragment>
                                <h3 className={`text-center  my-2`}>Todo App</h3>
                                <h5 style={{ fontSize: 21 }} className={`text-center my-4`}>Sign in</h5>
                                {
                                    !this.state.showSpinner &&
                                    <p style={{ cursor: 'pointer' }} className={`${theme === 'dark' ? ' text-light' : 'text-secondary'} mr-3`}>

                                        Already have an account? <Link to='/'>Sign Up</Link>

                                    </p>}
                                <form className="si_form" onSubmit={this.handleSignup.bind(this)}>




                                    <div className="form-div">
                                        <label className={`${theme === 'dark' ? 'text-light' : ' text-secondary'}`} htmlFor="email" >
                                            Email
                                                </label>
                                        <input onChange={(e) => this.setState({ email: e.target.value })} placeholder="Enter your email" type="email" className="form-control" id="email" />
                                        {errorArray.includes('email') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> Enter your email</small>}

                                    </div>
                                    <div className="form-div">
                                        <label className={`${theme === 'dark' ? 'text-light' : ' text-secondary'}`} htmlFor="phone">
                                            Password
                                                </label>
                                        <input onChange={(e) => this.setState({ password: e.target.value })} placeholder="Enter password" type="password" className="form-control" id="password" />
                                        {errorArray.includes('password') && <small style={{ color: 'red', marginTop: 15, marginBottom: 15 }}><FontAwesomeIcon icon={faInfoCircle} style={{ color: 'red' }} /> Enter your password</small>}
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
