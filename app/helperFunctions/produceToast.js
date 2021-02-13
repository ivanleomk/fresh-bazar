export const produceToast = (toast, status, title, description) => {
  toast({
    position: "top",
    title,
    description,
    status,
    duration: 1000,
    isClosable: true,
  });
};
