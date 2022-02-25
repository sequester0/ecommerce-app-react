import React from 'react';
import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from '@chakra-ui/react'
import { useFormik } from 'formik';
import validationSchema from './validations';
import { fetchLogin } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await fetchLogin({ email: values.email, password: values.password });
        login(loginResponse);
        navigate('/profile');
      } catch (error) {
        bag.setErrors({ general: error.response.data.message })
      }
    }
  });

  return <div>
    
    <Flex align="center" width="full" justifyContent="center">
      <Box pt="10">
        
        <Box textAlign="center">
          <Heading>Sign In</Heading>
        </Box>

        <Box my="5">
          {formik.errors.general && (
            <Alert borderRadius="lg" status='error'>{formik.errors.general}</Alert>
          )}
        </Box>

        <Box my="5" textAlign="left">
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input type="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email} />
            </FormControl>

            <FormControl mt="4">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input type="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password} />
            </FormControl>  

            <Button mt="4" width="full" type='submit' colorScheme="blue">
              Sign In
            </Button>     
          </form>

        </Box>

      </Box>
    </Flex>

  </div>;
}

export default Signin;
