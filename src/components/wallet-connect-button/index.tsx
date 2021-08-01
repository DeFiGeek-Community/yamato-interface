import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Row, Button as AntButton } from 'antd';
import { darken, lighten } from 'polished';
import { forwardRef } from 'react';
import { Activity } from 'react-feather';
import styled, { css } from 'styled-components';
// import CoinbaseWalletIcon from '../../../assets/images/coinbaseWalletIcon.svg';
// import FortmaticIcon from '../../../assets/images/fortmaticIcon.png';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import {
  // fortmatic,
  injected,
  // portis,
  walletconnect,
  // walletlink,
} from '../../connectors';
import { NETWORK_LABELS } from '../../constants/chains';
import { NETWORK_CONTEXT_NAME } from '../../constants/web3';
import useENSName from '../../hooks/useENSName';
import {
  usePendingTxCount,
  useWalletModalToggle,
} from '../../state/application/hooks';
import { shortenAddress } from '../../utils/web3';
// import PortisIcon from '../../..assets/images/portisIcon.png';
import Loader from '../Loader';
import Identicon from './Identicon';
import WalletModal from './WalletModal';

const IconWrapper = styled.div<{ size?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`;

// eslint-disable-next-line react/display-name
const Button = forwardRef((props, ref) => <AntButton />);

const Web3StatusGeneric = styled(Button)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`;
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => darken(0.1, theme.red1)};
  }
`;

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => theme.primary4};
  border: none;
  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }
  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.primary5};
      border: 1px solid ${({ theme }) => theme.primary5};
      color: ${({ theme }) => theme.primaryText1};
      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}
`;

const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
  background-color: ${({ pending, theme }) =>
    pending ? theme.primary1 : theme.bg1};
  border: 1px solid
    ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) =>
      pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg1)};
    :focus {
      border: 1px solid
        ${({ pending, theme }) =>
          pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg2)};
    }
  }
`;

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`;

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`;

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return <Identicon />;
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    );
    // } else if (connector === walletlink) {
    //   return (
    //     <IconWrapper size={16}>
    //       <img src={CoinbaseWalletIcon} alt={''} />
    //     </IconWrapper>
    //   );
    // } else if (connector === fortmatic) {
    //   return (
    //     <IconWrapper size={16}>
    //       <img src={FortmaticIcon} alt={''} />
    //     </IconWrapper>
    //   );
    // } else if (connector === portis) {
    //   return (
    //     <IconWrapper size={16}>
    //       <img src={PortisIcon} alt={''} />
    //     </IconWrapper>
    //   );
  }
  return null;
}

function Web3StatusInner() {
  const { account, connector, chainId, error } = useWeb3React();

  const { ENSName } = useENSName(account ?? undefined);

  const toggleWalletModal = useWalletModalToggle();
  const txCount = usePendingTxCount();
  const hasPendingTransactions = txCount > 0;

  if (account) {
    return (
      <>
        {chainId && chainId !== 1 && (
          <span style={{ color: 'orange', marginRight: '10px' }}>
            {NETWORK_LABELS[chainId]}
          </span>
        )}
        <AntButton id="web3-status-connected" onClick={toggleWalletModal}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {hasPendingTransactions ? (
              <Row>
                <Text>{txCount} Pending...</Text> <Loader />
              </Row>
            ) : (
              <>
                <Text>{ENSName || shortenAddress(account)}</Text>
              </>
            )}
            {!hasPendingTransactions && connector && (
              <StatusIcon connector={connector} />
            )}
          </span>
        </AntButton>
      </>
    );
  } else if (error) {
    return (
      <AntButton onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </Text>
      </AntButton>
    );
  } else {
    return (
      <AntButton
        id="connect-wallet"
        onClick={toggleWalletModal}
        // faded={!account}
      >
        <Text>Connect to a wallet</Text>
      </AntButton>
    );
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NETWORK_CONTEXT_NAME);

  const { ENSName } = useENSName(account ?? undefined);

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} />
    </>
  );
}
