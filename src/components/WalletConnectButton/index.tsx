import { Box } from '@chakra-ui/react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { Button as RebassButton } from 'rebass/styled-components';
import styled from 'styled-components';
import { CHAIN_INFO } from '../../constants/chains';
import { NetworkContextName } from '../../constants/misc';
import useENSName from '../../hooks/ens/useENSName';
import { useWalletModalToggle } from '../../state/application/hooks';
import {
  isTransactionRecent,
  useAllTransactions,
} from '../../state/transactions/hooks';
import { TransactionDetails } from '../../state/transactions/reducer';
import { shortenAddress } from '../../utils/web3';
import { Text } from '../CommonItem';
import Loader from '../Loader';
import CurrencyToggle from './CurrencyToggle';
import Row from './Row';
import WalletModal from './WalletModal';

// 先にWalletTextを宣言
export const WalletText = styled(Text)`
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1.8rem;
  color: ${({ theme }) => theme.text2};
`;

const WalletButton = styled(RebassButton)`
  color: ${({ theme }) => theme.text0};
  background-color: ${({ theme }) => theme.text3};
  padding: 1.2rem 2.5rem;
  margin-right: 1rem;
  border-radius: 26px;
  transition: box-shadow 0.3s;
  min-width: 120px;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const ResponsiveWalletText = styled(WalletText)`
  font-size: 1.6rem;
  line-height: 1.8rem;
  padding: 0.4rem 0;
`;

export const FlexText = styled(WalletText)`
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

export function ChainInfo() {
  const { chainId } = useWeb3React();

  if (!chainId || chainId === 1) return null;

  return (
    <Box>
      <WalletText
        style={{
          color: 'orange',

          marginLeft: '1rem',
          marginRight: '0.5rem',
        }}
      >
        {CHAIN_INFO[chainId].label}
      </WalletText>
    </Box>
  );
}

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

function Web3StatusInner() {
  const { account, error } = useWeb3React();

  const { ENSName } = useENSName(account ?? undefined);

  const toggleWalletModal = useWalletModalToggle();
  const allTransactions = useAllTransactions();
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);
  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash);
  const hasPendingTransactions = !!pending.length;

  if (account) {
    return (
      <>
        <CurrencyToggle />
        <Box display={{ base: 'none', md: 'block' }}>
          <ChainInfo />
        </Box>

        <WalletButton id="web3-status-connected" onClick={toggleWalletModal}>
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {hasPendingTransactions ? (
              <WalletText style={{ fontSize: '1.4rem', lineHeight: '2.8rem' }}>
                <Row>
                  <span>{pending?.length} Pending...</span>
                  <div style={{ marginTop: '0.2rem', marginLeft: '0.4rem' }}>
                    <Loader stroke="#FFFFFF" />
                  </div>
                </Row>
              </WalletText>
            ) : (
              <WalletText
                style={{ fontSize: '1.5rem', lineHeight: '1.4rem' }}
                data-testid="wallet-data-connectedAs"
              >
                Connected As
                <br />
                {ENSName || shortenAddress(account)}
              </WalletText>
            )}
          </span>
        </WalletButton>
      </>
    );
  } else if (error) {
    return (
      <WalletButton onClick={toggleWalletModal}>
        <ResponsiveWalletText>
          {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
        </ResponsiveWalletText>
      </WalletButton>
    );
  } else {
    return (
      <WalletButton id="connect-wallet" onClick={toggleWalletModal}>
        <ResponsiveWalletText data-testid="wallet-data-connectWallet">
          Connect Wallet
        </ResponsiveWalletText>
      </WalletButton>
    );
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);

  const { ENSName } = useENSName(account ?? undefined);

  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions
    .filter((tx) => !tx.receipt)
    .map((tx) => tx.hash);
  const confirmed = sortedRecentTransactions
    .filter((tx) => tx.receipt)
    .map((tx) => tx.hash);

  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && (
        <WalletModal
          ENSName={ENSName ?? undefined}
          pendingTransactions={pending}
          confirmedTransactions={confirmed}
        />
      )}
    </>
  );
}
