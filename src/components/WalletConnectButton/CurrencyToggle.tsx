import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CEURLogo from '../../components/svgs/CeurLogo';
import CJPYLogo from '../../components/svgs/CjpyLogo';
import CUSDLogo from '../../components/svgs/CusdLogo';
import { useWalletState } from '../../state/wallet/hooks';
import { formatPrice } from '../../utils/prices';
import { FlexText } from './index';

const CurrencyToggleButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0rem 1rem;
  border-radius: 26px;
  border: 1px solid ${({ theme }) => theme.text3};
  background-color: transparent;
  transition: box-shadow 0.3s, background-color 0.3s;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  background-color: ${({ theme }) => theme.bg0};
  border: 1px solid ${({ theme }) => theme.text3};
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  font-weight: bold;
  font-size: 1.6rem;
  z-index: 1000;
  width: 200px;
  padding: 0.5rem;
`;

const DropdownItem = styled.div`
  color: ${({ theme }) => theme.text3};
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

interface Currency {
  name: string;
  logo: React.ComponentType<{ width?: string; height?: string }>;
}

const currencies: Currency[] = [
  { name: 'CJPY', logo: CJPYLogo },
  { name: 'CUSD', logo: CUSDLogo },
  { name: 'CEUR', logo: CEURLogo },
];

const CurrencyToggle: React.FC = () => {
  const { cjpy } = useWalletState();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCurrencyToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCurrencySelect = (currency: string) => {
    console.log(`Selected currency: ${currency}`);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownLeft(rect.left);
    }
  }, [isDropdownOpen]);

  return (
    <>
      <CurrencyToggleButton ref={buttonRef} onClick={handleCurrencyToggle}>
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
      {isDropdownOpen && (
        <DropdownMenu style={{ left: dropdownLeft }}>
          {currencies.map((currency) => {
            const LogoComponent = currency.logo;
            return (
              <DropdownItem
                key={currency.name}
                onClick={() => handleCurrencySelect(currency.name)}
              >
                <LogoComponent width="30px" height="30px" />
                <span style={{ marginLeft: '1rem' }}>{currency.name}</span>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      )}
    </>
  );
};

export default CurrencyToggle;
