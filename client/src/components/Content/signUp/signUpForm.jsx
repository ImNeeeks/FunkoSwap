/* eslint-disable react/prop-types */
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import "./signUpForm.css";
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';



const SignupForm = ({ userFormData, setUserFormData }) => {
    // set state for form validation
    const [validated, setValidated] = useState(false);
    // set state for alert
    const [showAlert, setShowAlert] = useState(false);
   
    const [signUp, {error}] = useMutation(ADD_USER);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        console.log(userFormData);
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await signUp({
                variables: { ...userFormData }
            })
            console.log("user Data: ", data);
            const token = data?.signUp.token
            
            Auth.login(token);
        } catch (err) {
            console.error(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
    };

    {/* This is needed for the validation functionality above */ }
    return (
    
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {/* show alert if server response is bad */}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                Something went wrong with your signup!
            </Alert>

            <h3>SIGN UP</h3>
            <Form.Group className='mb-2'>
                <Form.Label htmlFor='username'>Username</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Your username'
                    name='username'
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                />
                <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label htmlFor='email'>Email</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Your email address'
                    name='email'
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                />
                <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mb-2'>
                <Form.Label htmlFor='password'>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Your password'
                    name='password'
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                />
                <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
            </Form.Group>
            <Button
                disabled={!userFormData.username || !userFormData.email || !userFormData.password}
                type='submit'
                variant='success'
            >
                Submit
            </Button>
        </Form>
    );
};


export default SignupForm;