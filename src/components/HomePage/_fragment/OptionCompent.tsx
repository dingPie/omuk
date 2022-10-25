import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import CategoryButtons from './CategoryButtons';
import SelectRadius from './SelectRadius';

const OptionComponent = () => {
  return (
    <Accordion
      allowToggle
      borderRadius={'12px'}
      bgColor="gray.100"
      m="1rem 0"
      boxShadow="lg"
    >
      <AccordionItem>
        <AccordionButton p="1rem" bgColor={'white'}>
          <Box flex="1" fontWeight={'bold'} textStyle="lg" textAlign="left">
            옵션 보기
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          <SelectRadius />
        </AccordionPanel>
        <AccordionPanel>
          <CategoryButtons />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default OptionComponent;
