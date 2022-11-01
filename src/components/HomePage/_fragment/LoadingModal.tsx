import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal = ({ isOpen, onClose }: LoadingModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex justifyContent={'center'}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;
