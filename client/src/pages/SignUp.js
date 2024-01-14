import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Heading,
  Link  as  ChakraLink
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useNavigate , Link as ReactRouterLink} from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
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
            const response = await fetch('http://localhost:5000/users/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_name: values.name,
                user_password: values.password,
              }),
            });

            if (response.ok) {
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
                  <Input {...field} placeholder='name' />
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
                  <Input {...field} placeholder='password' />
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
