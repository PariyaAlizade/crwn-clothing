import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../from-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
//import { auth , createUserProfileDocument } from '../../assets/firebase/firebase.utils';
import './sign-up.styles.scss';
import { signUpStart } from '../../redux/user/user.action';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredential] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }
        signUpStart({email, password, displayName});

        // try {
        //     const { user } = await auth().createUserWithEmailAndPassword(email,password);
        //     await createUserProfileDocument(user , {displayName});
        //     this.setState({
        //         displayName : '',
        //         email : '',
        //         password : '',
        //         confirmPassword : ''
        //     })

        // } catch(error) {
        //     console.log(error);

        // }
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredential({ ...userCredentials, [name]: value })
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>Sign In</CustomButton>

            </form>
        </div>
    )
}


const mapDispatchToProps = disptch => ({
    signUpStart: userCredential => disptch(signUpStart(userCredential))
})

export default connect(null, mapDispatchToProps)(SignUp);