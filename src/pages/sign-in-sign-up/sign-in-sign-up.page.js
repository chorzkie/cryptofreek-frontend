import React from 'react'
import SignIn from './sign-in'
import SignUp from './sign-up'
import './sign-in-sign-up.styles.scss'



const SignInAndSignUpPage = () => {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn />
            <SignUp />
        </div>
    )
}

export default SignInAndSignUpPage