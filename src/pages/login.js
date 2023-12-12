import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Container,
  } from '@chakra-ui/react'
  import { Field, Form, Formik} from 'formik'
import { Link, Navigate } from 'react-router-dom'

export default function LogIn () {
    function validateName(value) {
      let error
      if (!value) {
        error = 'Name is required'
      } else if (value.toLowerCase() !== 'sh') {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }
    function validatePassword(value) {
        let error
        if (!value) {
          error = 'Password is required'
        } else if (value.toLowerCase() !== '770') {
          error = "Jeez! You're not a fan 😱"
        }
        return error
      }
  
    return (<Container textAlign={'center'}mt={48}>
      <Formik
        initialValues={{ name: 'Sasuke' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <Form>
            <Field name='name' validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel>First name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' validate={validatePassword}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
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
    )
  }