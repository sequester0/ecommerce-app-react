import React from 'react'

import { postProduct } from '../../../api';
import { useMutation, useQueryClient } from 'react-query';
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { Formik, FieldArray } from 'formik';
import validationSchema from './validations';
import { message } from 'antd';

function NewProduct() {
    const queryClient = useQueryClient();

    const newProductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries('admin:products'),
    });

    const handleSubmit = async(values, bag) => {
        message.loading({ content: 'Loading...', key: 'loading' });

        const newValues = {
            ...values,
            photos: JSON.stringify(values.photos)
        }

        newProductMutation.mutate(newValues, {
            onSuccess: () => {
                message.success({ content: 'Product added successfully', key: 'loading' });
            },
            onError: () => {
                message.error({ content: 'Something went wrong', key: 'loading' });
            }
        });
    } 

    return <div>
        <Text fontSize='2xl'>New Product</Text>
        <Formik
            initialValues={{
                title: "",
                description: "",
                price: "",
                photos: [],
            }}
            validationSchema={validationSchema}
            onSubmit={ handleSubmit }
        >
            {
                ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting}) => (
                    <>
                        <Box>
                            <Box my="5" textAlign="left">
                                <form onSubmit={ handleSubmit }>

                                    <FormControl>
                                        <FormLabel>Title</FormLabel>
                                        <Input 
                                            name='title' 
                                            onChange={ handleChange } 
                                            onBlur={ handleBlur } 
                                            value={ values.title }
                                            disabled={ isSubmitting }
                                            isInvalid={ errors.title && touched.title }
                                        />
                                        { errors.title && touched.title && <Text color='red.500'>{ errors.title }</Text> }
                                    </FormControl>

                                    <FormControl mt="4">
                                        <FormLabel>Description</FormLabel>
                                        <Textarea 
                                            name='description' 
                                            onChange={ handleChange } 
                                            onBlur={ handleBlur } 
                                            value={ values.description }
                                            disabled={ isSubmitting }
                                            isInvalid={ errors.description && touched.description }
                                        />
                                        { errors.description && touched.description && <Text color='red.500'>{ errors.description }</Text> }
                                    </FormControl>

                                    <FormControl mt="4">
                                        <FormLabel>Price</FormLabel>
                                        <Input 
                                            name='price' 
                                            onChange={ handleChange } 
                                            onBlur={ handleBlur } 
                                            value={ values.price }
                                            disabled={ isSubmitting }
                                            isInvalid={ errors.price && touched.price }
                                        />
                                        { errors.price && touched.price && <Text color='red.500'>{ errors.price }</Text> }
                                    </FormControl>

                                    <FormControl mt="4">
                                        <FormLabel>Photos</FormLabel>
                                        <FieldArray 
                                            name='photos'
                                            render={ (arrayHelpers) => (
                                                <div>
                                                    {
                                                        values.photos && values.photos.map((photo, index) => (
                                                            <div key={ index }>
                                                                <Input mt="2"
                                                                    name={`photos.${index}`}
                                                                    value={photo}
                                                                    disabled={ isSubmitting }
                                                                    onChange={ handleChange }
                                                                    width="3xl"
                                                                />

                                                                <Button size="sm" ml="4" type='button' colorScheme="red" onClick={() => arrayHelpers.remove(index) }>Remove</Button>
                                                            </div>
                                                        ))
                                                    }
                                                    <Button size="sm" mt="5" type='button' colorScheme="blue" onClick={() => arrayHelpers.push('') }>
                                                        Add a Photo
                                                    </Button>
                                                </div>
                                            )}
                                        />
                                    </FormControl>
                                    

                                    <Button colorScheme="teal" mt="4" width="full" type='submit' isLoading={ isSubmitting }>Add Product</Button>
                                </form>
                            </Box>
                        </Box>
                    </>
                )
            }
        </Formik>
    </div>;
}

export default NewProduct