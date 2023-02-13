import React from 'react';
import { AddForm } from "../components/AddForm/AddForm";
import { ChakraProvider } from '@chakra-ui/react'


export const AddFormView = () => {
    return (
        <ChakraProvider>
            <AddForm/>
        </ChakraProvider>

    );
};

