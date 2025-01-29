import { useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import CJPYLogo from '../../components/svgs/CjpyLogo';
import { useWalletState } from '../../state/wallet/hooks';
import { formatPrice } from '../../utils/prices';
import { FlexText } from './index';

const CurrencyToggleButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.text3};
  background-color: transparent;
  transition: box-shadow 0.3s, background-color 0.3s;
`;

const CurrencyToggle: React.FC = () => {
  const { cjpy } = useWalletState();
  const fontSize = useBreakpointValue<string>({ base: '1.2rem', sm: '1.6rem' });
  const mainFontSize = useBreakpointValue<string>({
    base: '1.4rem',
    sm: '2rem',
  });
  const flexDirection = useBreakpointValue<'row' | 'column'>({
    base: 'column',
    sm: 'row',
  });
  const padding = useBreakpointValue<string>({
    base: '0.5rem 1rem',
    sm: '0rem 1rem',
  });
  const lineHeight = useBreakpointValue<string>({
    base: '1.8rem',
    sm: '2.2rem',
  });

  return (
    <>
      <CurrencyToggleButton style={{ padding }}>
        <CJPYLogo width="35px" />
        <FlexText
          style={{
            fontSize: mainFontSize,
            lineHeight: lineHeight,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '1rem',
              color: '#888888',
              lineHeight: '1rem',
            }}
          >
            Balance
          </span>
          <span
            style={{
              display: 'flex',
              flexDirection: flexDirection,
              alignItems: flexDirection === 'column' ? 'flex-start' : 'center',
            }}
          >
            <span
              style={{
                fontSize: fontSize,
              }}
            >
              {formatPrice(cjpy, 'jpy').value}
            </span>
            <span
              style={{
                marginLeft: flexDirection === 'row' ? '0.2rem' : '0',
              }}
            >
              CJPY
            </span>
          </span>
        </FlexText>
      </CurrencyToggleButton>
    </>
  );
};

export default CurrencyToggle;
