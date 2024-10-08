import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Heading,
  InputRightElement,
  InputGroup,
  Link  as  ChakraLink
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useNavigate , Link as ReactRouterLink} from 'react-router-dom';
import axiosInstance from '../axiosInstance';
export default function SignUp() {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [errorMessage, setErrorMessage] = useState('');

  function validateCredentials(values) {
    const errors = {};

    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  }

  return (
    <Container textAlign={'center'} mt={48}>
      <Heading m={12}>Sign Up</Heading>
      <Formik
        initialValues={{ name: '', password: '' }}
        onSubmit={async (values, actions) => {
          try {
            const response = await axiosInstance.post('/users/', {
              user_name: values.name,
              user_password: values.password,
            });
        
            if (response.status >= 200 && response.status < 300) {
              // Registration successful, you may handle the response as needed
              // For example, redirect to login page
              navigate('/login');
            } else {
              // Registration failed, handle the error
              setErrorMessage('Registration failed. Please try again.');
            }
          } catch (error) {
            console.error('Error registering user:', error);
          }
        }}
        validate={validateCredentials}
      >
        {(props) => (
          <Form>
            <Field name='name'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>User name</FormLabel>
                  <Input {...field} placeholder='user name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                  <Input
                    {...field}
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='password'
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                  </InputGroup>
                  {/* <Input {...field} placeholder='password' /> */}
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
            <ChakraLink as={ReactRouterLink} to='/login'>
             <p style={{ marginTop: '16px' }}>

             Do you already have an account? <b>Login</b>
             </p>
            </ChakraLink>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
