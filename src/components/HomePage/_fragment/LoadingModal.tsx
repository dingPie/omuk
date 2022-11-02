import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  keyframes,
} from '@chakra-ui/react';

import LocationDotIcon from '@components/common/@Icons/System/LocationDot';
import LocationPersonIcon from '@components/common/@Icons/System/LocationPerson';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoadingModal = ({ isOpen, onClose }: LoadingModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex position={'relative'} h="240px">
            {/* <LocationPersonIcon
              position={'absolute'}
              left="50%"
              top="50%"
              transform={'translate3d(-50%,-50%,0)'}
              boxSize="40px"
            /> */}
            {ICON_ARRAY.map((data, idx) => (
              <LocationDotIcon
                key={data.left + idx}
                position={'absolute'}
                left={data.left}
                top={data.top}
                animation={`${data.animation} 1.5s infinite`}
                boxSize="40px"
                fill={data.color}
              />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;

const popup1 = keyframes`
  0% {
    transform: scale(0, 0);
  }
  40% {
    transform: scale(1.2, 1.2);
  }
  50% {
    transform: scale(1, 1);
  }
`;

const popup2 = keyframes`
  25% {
    transform: scale(0, 0);
  }
  65% {
    transform: scale(1.2, 1.2);
  }
  75% {
    transform: scale(1, 1);
  }
`;

const popup3 = keyframes`
  50% {
    transform: scale(0, 0);
  }
  90% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
`;

const ICON_ARRAY = [
  {
    color: 'red.200',
    left: '10%',
    top: '25%',
    animation: popup1,
  },
  {
    color: 'green.200',
    left: '40%',
    top: '75%',
    animation: popup2,
  },
  {
    color: 'yellow.200',
    left: '70%',
    top: '55%',
    animation: popup3,
  },
];
