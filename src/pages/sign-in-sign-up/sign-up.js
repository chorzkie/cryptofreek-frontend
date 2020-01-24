import React, { Component } from 'react'
import Forms from '../../components/forms-and-buttons/forms.component'
import CustomButton from '../../components/forms-and-buttons/button.component'
import { connect } from 'react-redux'
import { submitSignUpACT } from '../../redux/page-data/page.data.actions';
import './sign-up.styles.scss'



const mapDispatchToProps = (dispatch) => {
    return {
        submitSignUp: (name, email, password) => dispatch(submitSignUpACT(name, email, password)),
    }
}

const mapStateToProps = (state) => {
    return {
        signUpMessage: state.pageDataRED.signUpMessage,
    }
}

export class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state
        const { submitSignUp } = this.props

        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        }
        else {
            submitSignUp(displayName, email, password)
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state
        const { signUpMessage } = this.props
        return (
            <div className='sign-up'>
                <h2 className='title'>I don't have an account yet </h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <Forms
                        name="displayName"
                        placeholder="Name"
                        type="text"
                        label="Name"
                        value={displayName}
                        handleChange={this.handleChange}
                        required />
                    <Forms
                        name="email"
                        placeholder="Email"
                        type="email"
                        label="Email"
                        value={email}
                        handleChange={this.handleChange}
                        required />
                    <Forms
                        name="password"
                        placeholder="Password"
                        type="password"
                        label="Password"
                        value={password}
                        handleChange={this.handleChange}
                        required />
                    <Forms
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        required />
                    <div className="custom-buttons">
                        <CustomButton type="submit" > Create Account </CustomButton>
                    </div>
                </form>
                <div> {signUpMessage} </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
