import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./AddForm.css"
import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
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
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    description: string;
    price: number;
    url: string;
    address: string
}

export const AddForm = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { register, formState: { errors }, handleSubmit } = useForm<FormData>()


    const onSubmit = handleSubmit((data, e) => handleSaveAd(e, data));

    const handleSaveAd = async (e: BaseSyntheticEvent | undefined, formValues: FormData) => {
        setLoading(true);
        e?.preventDefault();
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
            <form className="form" onSubmit={onSubmit}>
                <h1 className="title">Create a new ad</h1>
                <FormControl isInvalid={Boolean(errors.name)}>
                    <FormLabel>
                        <Text mb='8px'>Name:</Text>
                        <Input variant='outline' {...register('name', {
                            required: { value: true, message: 'The field is required' },
                            maxLength: { value: 100, message: ' Title cannot be longer than 100 characters ' },
                        })}/>

                        {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                    </FormLabel>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.description)}>
                    <FormLabel>
                        <Text mb='8px'>Description:</Text>
                        <Textarea
                            resize="none"
                            placeholder='Write something more...'
                            size='sm'
                            {...register('description', {
                                maxLength: {
                                    value: 1000,
                                    message: 'Description cannot be longer than 100 characters '
                                },
                            })}
                        />

                        {errors.description && <FormErrorMessage> errors.description.message </FormErrorMessage>}
                    </FormLabel>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.price)}>
                    <FormLabel>
                        <Text mb='8px'>Price:</Text>
                        <InputGroup size='sm'>
                            <NumberInput
                                precision={2}
                                step={1.0}
                                min={0}
                                defaultValue={0.00}
                            >
                                <NumberInputField
                                    {...register('price', {
                                        required: { value: true, message: 'The field is required' },
                                        max: { value: 9999999, message: 'Price should be between 0 - 9999999 EUR' },
                                        min: { value: 0, message: 'Price should be between 0 - 9999999 EUR' },
                                        valueAsNumber: true,

                                    })}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper/>
                                    <NumberDecrementStepper/>
                                </NumberInputStepper>
                            </NumberInput>
                            <InputRightAddon children='EUR'/>
                        </InputGroup>
                        <FormErrorMessage>
                            {errors.price && errors.price.message}
                        </FormErrorMessage>
                    </FormLabel>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.url)}>
                    <FormLabel>
                        <Text mb='8px'>External link to the ad:</Text>
                        <Input
                            variant='outline'
                            {...register('url', {
                                required: { value: true, message: 'The field is required' },
                                pattern: {
                                    value: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
                                    message: 'Link adress is not proper'
                                }

                            })}
                        />
                        <FormErrorMessage>
                            {errors.url && errors.url.message}
                        </FormErrorMessage>
                    </FormLabel>
                </FormControl>

                <FormControl isInvalid={Boolean(errors.address)}>
                    <FormLabel>
                        <Text mb='8px'>Address:
                            <Tooltip label='f.ex. Maltańska 1/1 Poznań' fontSize='md'>
                                <InfoIcon/>
                            </Tooltip></Text>
                        <Input
                            variant='outline'
                            {...register('address', {
                                required: { value: true, message: 'The field is required' },
                            })}
                        />
                        <FormErrorMessage>
                            {errors.address && errors.address.message}
                        </FormErrorMessage>
                    </FormLabel>
                </FormControl>
                <div className="btn-group">
                    <ButtonGroup variant='outline' spacing='6'>
                        <Button><Link className="cancel" to="/">Cancel</Link></Button>
                        <Button type='submit' colorScheme='blue'>Save</Button>
                    </ButtonGroup>
                </div>
            </form>
        </div>

    )
};

