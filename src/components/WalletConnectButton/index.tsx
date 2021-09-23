import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Activity } from 'react-feather';
import { Button as RebassButton } from 'rebass/styled-components';
import styled from 'styled-components';
// import CoinbaseWalletIcon from '../../../assets/images/coinbaseWalletIcon.svg';
// import FortmaticIcon from '../../../assets/images/fortmaticIcon.png';
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg';
import CJPYLogo from '../../components/svgs/CjpyLogo';
import { NETWORK_LABELS } from '../../constants/chains';
import { NETWORK_CONTEXT_NAME } from '../../constants/web3';
import useENSName from '../../hooks/useENSName';
import {
  // fortmatic,
  injected,
  // portis,
  walletconnect,
  // walletlink,
} from '../../infrastructures/connectors';
import {
  usePendingTxCount,
  useWalletModalToggle,
} from '../../state/application/hooks';
import { useWalletState } from '../../state/wallet/hooks';
import { shortenAddress } from '../../utils/web3';
// import PortisIcon from '../../..assets/images/portisIcon.png';
import { Text } from '../CommonItem';
import Loader from '../Loader';
import Identicon from './Identicon';
import Row from './Row';
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

const WalletButton = styled(RebassButton)`
  color: ${({ theme }) => theme.text1};
  padding: 0;
`;

export const WalletText = styled(Text)`
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: #5bad92;
`;

const FlexText = styled(WalletText)`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  width: fit-content;

  font-style: normal;
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text3};
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
  const { cjpy } = useWalletState();

  const toggleWalletModal = useWalletModalToggle();
  const txCount = usePendingTxCount();
  const hasPendingTransactions = txCount > 0;

  if (account) {
    return (
      <>
        {chainId && chainId !== 1 && (
          <WalletText
            style={{
              color: 'orange',
              marginRight: '1rem',
            }}
          >
            {NETWORK_LABELS[chainId]}
          </WalletText>
        )}
        <WalletButton id="web3-status-connected" onClick={toggleWalletModal}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* {!hasPendingTransactions && connector && (
              <StatusIcon connector={connector} />
            )} */}
            {hasPendingTransactions ? (
              <Row>
                <FlexText style={{ fontSize: '1.8rem', lineHeight: '2.1rem' }}>
                  {txCount} Pending...
                </FlexText>{' '}
                <Loader />
              </Row>
            ) : (
              <FlexText style={{ fontSize: '1.8rem', lineHeight: '2.1rem' }}>
                Connected As
                <br />
                {ENSName || shortenAddress(account)}
              </FlexText>
            )}
            <CJPYLogo width="35px" />
            <FlexText
              style={{
                fontSize: '3rem',
                lineHeight: '3.5rem',
              }}
            >
              CJPY {cjpy}
            </FlexText>
          </span>
        </WalletButton>
      </>
    );
  } else if (error) {
    return (
      <WalletButton onClick={toggleWalletModal}>
        <NetworkIcon />
        <FlexText>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </FlexText>
      </WalletButton>
    );
  } else {
    return (
      <WalletButton
        id="connect-wallet"
        onClick={toggleWalletModal}
        // faded={!account}
        style={{
          verticalAlign: 'middle',
        }}
      >
        <WalletText
          style={{
            fontSize: '2rem',
            lineHeight: '2.3rem',
          }}
        >
          Connect Wallet →
        </WalletText>
      </WalletButton>
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
