import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
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
          <Flex
            position={'relative'}
            h="200px"
            justifyContent={'center'}
            alignItems="center"
          >
            {/* <LocationPersonIcon
              position={'absolute'}
              left="50%"
              top="50%"
              transform={'translate3d(-50%,-50%,0)'}
              boxSize="40px"
            /> */}
            <Text textStyle={'xl'} fontWeight="700">
              로딩중
            </Text>
            {DOT_ARRAY.map((fadeIn, idx) => (
              <Text
                key={idx}
                textStyle={'xl'}
                fontWeight="700"
                animation={`${fadeIn} 1.5s infinite`}
              >
                .
              </Text>
            ))}

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

const fadeIn1 = keyframes`
  0% {
    transform: scale(0, 0);
  } 
  50% {
    transform: scale(1, 1);
  }
`;
const fadeIn2 = keyframes`
  25% {
    transform: scale(0, 0);
  } 
  75% {
    transform: scale(1, 1);
  }
`;
const fadeIn3 = keyframes`
  50% {
    transform: scale(0, 0);
  } 
  100% {
    transform: scale(1, 1);
  }
`;
const DOT_ARRAY = [fadeIn1, fadeIn2, fadeIn3];

const popup1 = keyframes`
  0% {
    transform: scale(0, 0);
  }
  30% {
    transform: scale(1.3, 1.3);
  }
  50% {
    transform: scale(1, 1);
  }
`;

const popup2 = keyframes`
  25% {
    transform: scale(0, 0);
  }
  55% {
    transform: scale(1.3, 1.3);
  }
  75% {
    transform: scale(1, 1);
  }
`;

const popup3 = keyframes`
  50% {
    transform: scale(0, 0);
  }
  80% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
`;

const ICON_ARRAY = [
  {
    color: 'red.200',
    left: '10%',
    top: '15%',
    animation: popup1,
  },
  {
    color: 'green.200',
    left: '40%',
    top: '65%',
    animation: popup2,
  },
  {
    color: 'yellow.200',
    left: '80%',
    top: '45%',
    animation: popup3,
  },
];
