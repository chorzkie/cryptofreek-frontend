import React, { Component } from 'react'
import Forms from '../../components/forms-and-buttons/forms.component'
import CustomButton from '../../components/forms-and-buttons/button.component'
import { connect } from 'react-redux'
import { submitSignInACT } from '../../redux/page-data/page.data.actions';
import './sign-in.styles.scss'



const mapDispatchToProps = (dispatch) => {
    return {
        submitSignIn: (email, password) => dispatch(submitSignInACT(email, password)),
    }
}

const mapStateToProps = (state) => {
    return {
        signInMessage: state.pageDataRED.signInMessage,
    }
}

export class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { email, password } = this.state
        const { submitSignIn } = this.props
        submitSignIn(email, password)
    }

    handleChange = (e) => {
        const { value, name } = e.target
        this.setState({ [name]: value })
    }

    render() {
        const { signInMessage } = this.props
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <Forms
                        name="email"
                        placeholder="Email"
                        type="email"
                        label="Email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required />
                    <Forms
                        name="password"
                        placeholder="Password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required />
                    <div className="custom-buttons">
                        <CustomButton type="submit" > Sign In </CustomButton>
                    </div>
                </form>
                <div> {signInMessage} </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
