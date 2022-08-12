import { AbstractConnector } from '@web3-react/abstract-connector';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SUPPORTED_WALLETS } from '../../../constants/web3';
import { injected } from '../../../infrastructures/connectors';
import { Text } from '../../CommonItem';
import Loader from '../../Loader';
import Option from './Option';

const PendingSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const LoadingMessage = styled.div<{ error?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  margin-bottom: 20px;
  color: ${({ theme, error }) => (error ? theme.error : 'inherit')};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.error : theme.success)};
  & > * {
    padding: 1rem;
  }
`;

const ErrorGroup = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: flex-start;
`;

const ErrorButton = styled.div`
  border-radius: 8px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg0};
  margin-left: 1rem;
  padding: 0.5rem;
  font-weight: 600;
  user-select: none;
  &:hover {
    cursor: pointer;
    border: 1px solid;
    border-color: ${({ theme }) => theme.text0};
  }
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  align-items: center;
  justify-content: center;
`;

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}: {
  connector?: AbstractConnector;
  error?: boolean;
  setPendingError: (error: boolean) => void;
  tryActivation: (connector: AbstractConnector) => void;
}) {
  const isMetamask = window?.ethereum?.isMetaMask;
  const { t } = useTranslation();

  return (
    <PendingSection>
      <LoadingMessage error={error}>
        <LoadingWrapper>
          {error ? (
            <ErrorGroup>
              <div
                style={{
                  fontSize: '1.4rem',
                }}
              >
                Error connecting.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ErrorButton
                  onClick={() => {
                    setPendingError(false);
                    connector && tryActivation(connector);
                  }}
                >
                  Try Again
                </ErrorButton>
                {connector === injected && (
                  <Text
                    style={{
                      fontSize: '0.5rem',
                      margin: '0px 12px 0px',
                    }}
                  >
                    {t('walletConnectButton.walletModal.alert3')}
                  </Text>
                )}
              </div>
            </ErrorGroup>
          ) : (
            <>
              <Loader />
              Initializing...
            </>
          )}
        </LoadingWrapper>
      </LoadingMessage>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key];
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null;
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null;
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={option.iconURL}
            />
          );
        }
        return null;
      })}
    </PendingSection>
  );
}
