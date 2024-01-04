import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Container,
  Heading,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function LogIn(props) {

  const navigate = useNavigate();
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
      <Heading m={12}>log in</Heading>
      <Formik
        initialValues={{ name: '', password: '' }}

        onSubmit={async (values, actions) => {
          try {
            const response = await fetch('http://localhost:5000/users/check-credentials', {
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
              // Authentication successful, get the user data from the response
              const userData = await response.json();
        
              // Save user_id in local storage
              localStorage.setItem('user_id', userData.user_id);
        
              // Navigate to the home page
              navigate('/home');
            } else {
              // Authentication failed, handle the error
              // You may want to update state to show an error message
            }
          } catch (error) {
            console.error('Error authenticating user:', error);
          }
        }}
        
        
        validate={validateCredentials}
      >
        {(props) => (
          <Form>
            <Field name='name'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>First name</FormLabel>
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
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
