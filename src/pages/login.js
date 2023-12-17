import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Container,
    Heading,
  } from '@chakra-ui/react'
  import { Field, Form, Formik} from 'formik'
import { Link, useNavigate } from 'react-router-dom'

export default function LogIn (props) {
  const {userName , password} = props.userData

  const navigate = useNavigate();
    function validateName(value) {
      let error
      if (!value) {
        error = 'Name is required'
      } else if (value !== userName) {
        error = "Jeez! You're not a fan 😱"
      }
      return error
    }
    function validatePassword(value) {
        let error
        if (!value) {
          error = 'Password is required'
        } else if (value!== password) {
          error = "Jeez! You're not a fan 😱"
        }
        return error
      }
  
    return (<Container textAlign={'center'}mt={48}>
      <Heading m={12}>log in</Heading>
      <Formik
        initialValues={{ name: 'Sasuke' }}
        onSubmit={(values, actions) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2))
          //   actions.setSubmitting(false)
          // }, 1000)
          navigate('/home')
        }}
        
      >
        {(props) => (
          <Form>
            <Field name='name' validate={validateName} >
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