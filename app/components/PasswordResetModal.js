import React,{useRef} from 'react'
import { useUserContext } from '../context/UserContext'
import {Button,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogHeader,AlertDialogCloseButton,AlertDialogBody,AlertDialogFooter, useToast } from "@chakra-ui/react";
import FormInput from './FormInput';
import { produceToast } from '../helperFunctions/produceToast';
import { validateEmail } from '../helperFunctions/validateEmail';


const PasswordResetModal = ({isOpen,onClose}) => {
    const [email,setEmail] = React.useState('')
    const {forgotPassword} = useUserContext();
    const cancelRef = React.useRef()
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //Email Validation
        if(!validateEmail(email)){
            produceToast(toast,"warning","Error!","Please enter a valid email address")
        }


        forgotPassword(email)
        .then((data)=>{
            produceToast(toast,"success","Success!","Please check your inbox for your password reset email!")
            console.log(data)
        })
        .catch((err)=>{
            //User Does Not Exist
            if(err.code == 'UserNotFoundException'){
                produceToast(toast,"warning","Error!","Account with this email address does not exist.")
                return
            }
            
        })
        
    }

    return (
        <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Password Reset</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <p className = "my-4">Please enter your email address.</p>
            <form onSubmit = {(e)=>handleSubmit(e)}>
                <FormInput 
                label="Email Address"
                type="email"
                value={email}
                onChange={setEmail} />
                <div className = "my-4 flex justify-end">
                <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                </Button>
                <Button colorScheme="red" ml={3} onClick = {(e)=>handleSubmit(e)}>
                    Confirm
                </Button>
                </div>
                
            </form>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    )
}

export default PasswordResetModal
