import { useRef } from 'react';

import { ToastId, UseToastOptions, useToast } from '@chakra-ui/react';

const useAppToast = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  const toastUi = ({ ...props }: UseToastOptions) => {
    toastIdRef.current = toast({
      title: props.title,
      status: props.status,
      position: 'bottom-right',
      duration: 3000,
      isClosable: true,
      ...props,
    });
  };

  return { toast: toast, toastUi: toastUi };
};

export default useAppToast;
