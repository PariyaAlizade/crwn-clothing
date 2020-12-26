import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../from-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component'

import './sign-in.styles.scss';
import { emailSingInStart, googleSingInStart } from '../../redux/user/user.action';

const SignIn = ({ emailSignInstart, googleSignInStart }) => {
    const [userCredentials, setUserCredential] = useState({ email: "", password: "" })
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInstart(email, password);
        // try {
        //     await auth().signInWithEmailAndPassword(email , password)
        //     this.setState({email:'',password:''});

        // } catch(error) {
        //     console.log(error);
        // }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredential({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type='email' name='email' label='Email' handleChange={handleChange} value={email} required />
                <FormInput type='password' name='password' label='Password' handleChange={handleChange} value={password} required />
                <div className='buttons'>
                    <CustomButton type='submit'> Sign In</CustomButton>
                    <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn > Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSingInStart()),
    emailSignInstart: (email, password) => dispatch(emailSingInStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn);