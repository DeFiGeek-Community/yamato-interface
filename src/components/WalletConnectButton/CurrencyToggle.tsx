import { useBreakpointValue } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import CEURLogo from '../../components/svgs/CeurLogo';
import CJPYLogo from '../../components/svgs/CjpyLogo';
import CUSDLogo from '../../components/svgs/CusdLogo';
import { useCurrency } from '../../context/CurrencyContext';
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
  cursor: pointer;
  height: 48px;
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
  const history = useHistory();
  const { cjpy } = useWalletState();
  const { currency, setCurrency } = useCurrency();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCurrencyToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    const newPath = `/${selectedCurrency.toLowerCase()}`;
    history.push(newPath);
    setIsDropdownOpen(false);
  };


  const CurrentLogoComponent =
    currencies.find((c) => c.name === currency)?.logo || CJPYLogo;

    const fontSize = useBreakpointValue<string>({ base: '1.6rem', sm: '1.6rem' });
    const mainFontSize = useBreakpointValue<string>({
      base: '2rem',
      sm: '2rem',
    });
    const flexDirection = useBreakpointValue<'row' | 'column'>({
      base: 'row',
      sm: 'row',
    });
    const padding = useBreakpointValue<string>({
      base: '0rem 1rem',
      sm: '0rem 1rem',
    });
    const lineHeight = useBreakpointValue<string>({
      base: '2.2rem',
      sm: '2.2rem',
    });

  return (
    <>
      <CurrencyToggleButton style={{ padding }} onClick={handleCurrencyToggle}>
        <CurrentLogoComponent width="35px" />
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
              {currency}
            </span>
          </span>
        </FlexText>
      </CurrencyToggleButton>
      {isDropdownOpen && (
        <DropdownMenu >
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
