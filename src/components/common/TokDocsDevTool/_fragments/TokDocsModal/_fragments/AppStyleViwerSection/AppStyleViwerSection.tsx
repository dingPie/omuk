import React from 'react';
//TODO: 개발기간이 끝나면 제거해주세요 "yarn remove react-syntax-highlighter"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { Box, useTheme } from '@chakra-ui/react';

import { AppStyleViwerDocsType } from '../../TokDocsModal.data';
import ColorSection from './_fragments/ColorSection';
import FontWeightSection from './_fragments/FontWeightSection';
import GeneratedIconSection from './_fragments/GeneratedIconSection';
import LetterSpacingSection from './_fragments/LetterSpacingSection';
import RadiusSection from './_fragments/RadiusSection';
import ShadowSection from './_fragments/ShadowSection';
import SpaceSection from './_fragments/SpaceSection';
import TextStyleSection from './_fragments/TextStyleSection';

const codeStyle = atomOneDark;

interface AppStyleViwerSectionProps {
  selectedMenu: AppStyleViwerDocsType;
}

function AppStyleViwerSection({ selectedMenu }: AppStyleViwerSectionProps) {
  const theme = useTheme();
  const {
    //
    colors,
    breakpoints,
    space,
    shadows,
    letterSpacings,
    radii,
    fontWeights,
    textStyles,
  } = theme;

  return (
    <>
      {selectedMenu === 'gnerated Icons' && <GeneratedIconSection />}
      {selectedMenu === 'colors' && <ColorSection colors={colors} />}
      {selectedMenu === 'break points' && (
        <SyntaxHighlighter language="json" style={codeStyle}>
          {JSON.stringify(breakpoints, null, 4)}
        </SyntaxHighlighter>
      )}
      {selectedMenu === 'space' && <SpaceSection spaces={space} />}
      {selectedMenu === 'radius' && <RadiusSection radii={radii} />}
      {selectedMenu === 'shadows' && (
        <Box>
          <SyntaxHighlighter language="json" style={codeStyle}>
            {JSON.stringify(shadows, null, 4)}
          </SyntaxHighlighter>
          <ShadowSection boxShadows={shadows} />
        </Box>
      )}
      {selectedMenu === 'latter spacing' && (
        <LetterSpacingSection letterSpacings={letterSpacings} />
      )}
      {selectedMenu === 'font weight' && (
        <FontWeightSection fontWeights={fontWeights} />
      )}
      {selectedMenu === 'text styles' && (
        <Box>
          <SyntaxHighlighter language="json" style={codeStyle}>
            {JSON.stringify(textStyles, null, 4)}
          </SyntaxHighlighter>
          <TextStyleSection textStyles={textStyles} />
        </Box>
      )}
    </>
  );
}

export default AppStyleViwerSection;
