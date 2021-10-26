import { Button, Flex, Image, Text } from '@chakra-ui/react';

export type SocialType = 'kakao' | 'naver' | 'facebook' | 'google' | 'apple';

export interface SocialProps {
  social: SocialType;
  link: string;
}
export interface SocialButtonProps {
  data: SocialProps;
}

export const SOCIAL_DATA = Object.freeze({
  kakao: { icon: '/icons/social/kakao.png', text: '카카오 계정으로 로그인' },
  naver: { icon: '/icons/social/naver.png', text: '네이버 계정으로 로그인' },
  facebook: { icon: '/icons/social/facebook.png', text: 'Facebook으로 로그인' },
  google: { icon: '/icons/social/google.png', text: 'Google로 로그인' },
  apple: { icon: '/icons/social/apple.png', text: 'Apple로 로그인' },
});

export const SocialButton = ({ data }: SocialButtonProps) => {
  return (
    <>
      <Button colorScheme={data.social} w="100%" h="45px" maxW="310px" onClick={() => window.open(data.link)} borderRadius="4px">
        <Flex alignItems="center" justifyContent="center">
          <Image position="absolute" w="24px" h="24px" left="27px" src={SOCIAL_DATA[data.social].icon} />
          <Text fontSize={['16px', '14px', '15px']}>{SOCIAL_DATA[data.social].text}</Text>
        </Flex>
      </Button>
    </>
  );
};
