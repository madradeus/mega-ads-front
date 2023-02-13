import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./AddForm.css"
import {
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputRightAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
    Textarea,
    Tooltip
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Loader } from "../common/Loader/Loader";

export const AddForm = () => {

    const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleFormValues = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSaveAd = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log('click')
        navigate('/')
    }

    if ( loading ) {
        return <Loader></Loader>
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSaveAd}>
                <h1 className="title">Add a new ad</h1>
                <label>
                    <Text mb='8px'>Name:</Text>
                    <Input required variant='outline' name="name" value={formValues.name}
                           onChange={handleFormValues}/>
                </label>
                <label>
                    <Text mb='8px'>Description:</Text>
                    <Textarea
                        name="description"
                        onChange={handleFormValues}
                        value={formValues.description}
                        resize="none"
                        placeholder='Write something more...'
                        size='sm'
                    />
                </label>
                <label>
                    <Text mb='8px'>Price:</Text>
                    <InputGroup size='sm'>
                        <NumberInput precision={2} step={1.0} min={0} defaultValue={0.00}>
                            <NumberInputField required name='price' value={formValues.price}
                                              onChange={handleFormValues}/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                        <InputRightAddon children='EUR'/>
                    </InputGroup>
                </label>
                <label>
                    <Text mb='8px'>External link to the ad:</Text>
                    <Input required variant='outline' name='url' value={formValues.url}
                           onChange={handleFormValues}/>
                </label>
                <label>
                    <Text mb='8px'>Address:
                        <Tooltip label='Format: city, street number' fontSize='md'>
                            <InfoIcon/>
                        </Tooltip></Text>
                    <Input required variant='outline'/>
                </label>
                <div className="btn-group">
                    <ButtonGroup variant='outline' spacing='6'>
                        <Button><Link className="cancel" to="/">Cancel</Link></Button>
                        <Button type='submit' colorScheme='blue'>Save</Button>
                    </ButtonGroup>
                </div>
            </form>

        </div>

    );
};

