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
  border-radius: 26px;
  border: 1px solid ${({ theme }) => theme.text3};
  background-color: transparent;
  transition: box-shadow 0.3s, background-color 0.3s;
`;

const CurrencyToggle: React.FC = () => {
  const { cjpy } = useWalletState();

  return (
    <>
      <CurrencyToggleButton >
        <CJPYLogo width="35px" />
        <FlexText
          style={{
            fontSize: '2rem',
            lineHeight: '2.2rem',
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
          <span>
            <span
              style={{
                fontSize: '1.6rem',
              }}
            >
              {formatPrice(cjpy, 'jpy').value}
            </span>{' '}
            CJPY
          </span>
        </FlexText>
      </CurrencyToggleButton>
    </>
  );
};

export default CurrencyToggle;