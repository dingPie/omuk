import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from '@chakra-ui/react';

interface MenualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenualModal = ({ isOpen, onClose }: MenualModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight={'700'}>안내 매뉴얼</ModalHeader>
        <ModalBody>
          <UnorderedList display={'flex'} flexDir="column" gap={'.5rem'}>
            <ListItem fontWeight={'700'}>
              주소를 입력하면 자동으로 좌표를 검색해줍니다.
            </ListItem>
            <ListItem fontWeight={'700'}>
              돋보기 버튼을 눌러 내 주변 매장정보를 받아오세요.
            </ListItem>
            <ListItem fontWeight={'700'}>
              오늘 뭐먹지? 버튼을 누르면 무작위로 식당을 추천해줍니다!
            </ListItem>
          </UnorderedList>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            알았어요!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MenualModal;
