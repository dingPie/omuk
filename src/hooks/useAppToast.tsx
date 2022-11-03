import { useRef } from 'react';

import { ToastId, UseToastOptions, useToast } from '@chakra-ui/react';

const useAppToast = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId>();

  const toastUi = (
    title: string,
    status: 'success' | 'error' | 'warning' | 'info',
    props?: UseToastOptions,
  ) => {
    toastIdRef.current = toast({
      title: title,
      status: status,
      position: 'bottom-right',
      duration: 3000,
      isClosable: true,
      ...props,
    });
  };

  return { toast: toast, toastUi: toastUi };
};

export default useAppToast;
