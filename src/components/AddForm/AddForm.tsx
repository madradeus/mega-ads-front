import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./AddForm.css"
import {
    Button,
    ButtonGroup,
    FormControl,
    FormLabel,
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
    Tooltip,
    useToast
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { Loader } from "../common/Loader/Loader";
import { api } from "../../lib/api";
import { getLocationInfo } from "../../utils/getLocationInfo";

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
    const toast = useToast()


    const handleFormValues = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.name === 'price' ? Number(e.target.value) : e.target.value,
        }))
    }

    const handleSaveAd = async (e: SyntheticEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            const geoLocation = await getLocationInfo(formValues.address);
            await api.insert({
                ...formValues,
                lon: Number(geoLocation.lon),
                lat: Number(geoLocation.lat),
            })
            toast({
                position: "top-right",
                title: 'Ad created.',
                description: "We've created your ad for you.",
                status: 'success',
                duration: 3000,
            })
            navigate(`/${geoLocation.lat}/${geoLocation.lon}/18`);
        } catch (e: any) {
            setLoading(false)
            toast({
                position: "top-right",
                title: 'Error',
                description: e.message,
                status: 'error',
                duration: 3000,
            })
        } finally {
            setLoading(false);
        }
    }

    if ( loading ) {
        return <Loader></Loader>
    }

    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSaveAd}>
                <h1 className="title">Create a new ad</h1>
                <FormControl isInvalid={!formValues.name && formValues.name !== ''}>
                    <FormLabel>
                        <Text mb='8px'>Name:</Text>
                        <Input required variant='outline' name="name" value={formValues.name}
                               onChange={handleFormValues}/>
                    </FormLabel>
                </FormControl>

                <FormLabel>
                    <Text mb='8px'>Description:</Text>
                    <Textarea
                        name="description"
                        onChange={handleFormValues}
                        value={formValues.description}
                        resize="none"
                        placeholder='Write something more...'
                        size='sm'
                    />
                </FormLabel>
                <FormLabel>
                    <Text mb='8px'>Price:</Text>
                    <InputGroup size='sm'>
                        <NumberInput precision={2} step={1.0} min={0} name='price' defaultValue={0.00}
                                     value={formValues.price}
                                     onChange={(valueAsString, valueAsNumber) => setFormValues(prevState => ({
                                         ...prevState,
                                         price: valueAsNumber
                                     }))}>
                            <NumberInputField required type='number'/>
                            <NumberInputStepper>
                                <NumberIncrementStepper/>
                                <NumberDecrementStepper/>
                            </NumberInputStepper>
                        </NumberInput>
                        <InputRightAddon children='EUR'/>
                    </InputGroup>
                </FormLabel>
                <FormLabel>
                    <Text mb='8px'>External link to the ad:</Text>
                    <Input required variant='outline' name='url' value={formValues.url}
                           onChange={handleFormValues}/>
                </FormLabel>
                <FormLabel>
                    <Text mb='8px'>Address:
                        <Tooltip label='f.ex. Maltańska 1/1 Poznań' fontSize='md'>
                            <InfoIcon/>
                        </Tooltip></Text>
                    <Input required variant='outline' name='address' value={formValues.address}
                           onChange={handleFormValues}/>
                </FormLabel>
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

