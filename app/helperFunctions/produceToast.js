export const produceToast = (toast,status,title,description) => {
    toast({
        title,
        description,
        status,
        duration: 1000,
        isClosable: true,
      })
}