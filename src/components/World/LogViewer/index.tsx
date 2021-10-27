import { useWeb3React } from '@web3-react/core';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { LOG_EVENT_NAME } from '../../../constants/yamato';
import { useYamatoStateForWorld } from '../../../state/yamato-entirety/hooks';
import { LogEvent, LogEventType } from '../../../state/yamato-entirety/reducer';
import { formatPrice } from '../../../utils/prices';
import { shortenAddress } from '../../../utils/web3';
import { Text } from '../../CommonItem';

function getDescriptor(event: LogEvent) {
  switch (event.category as LogEventType) {
    case 'deposit':
      return `${formatPrice(event.value, 'eth').value}ETHを預けました！`;
    case 'withdrawal':
      return `${formatPrice(event.value, 'eth').value}ETHを引き出しました！`;
    case 'borrowing':
      return `${formatPrice(event.value, 'jpy').value}CJPYを借り入れました！`;
    case 'repay':
      return `${formatPrice(event.value, 'jpy').value}CJPYを返済しました！`;
    case 'self_redemption':
      return `トリガーしました！`;
    case 'core_redemption':
      return `トリガーしました！`;
    case 'sweep':
      return `トリガーしました！`;
    default:
      return `${event.value}を行いました！`;
  }
}

function getColor(category: LogEventType) {
  switch (category) {
    case 'deposit':
      return `red`;
    case 'withdrawal':
      return `red`;
    case 'borrowing':
      return `green`;
    case 'repay':
      return `green`;
    case 'self_redemption':
      return `blue`;
    case 'core_redemption':
      return `blue`;
    case 'sweep':
      return `blue`;
    default:
      return `black`;
  }
}

const Animation = styled.div`
  // enter from
  &.fade-enter {
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 1s;
  }

  // exit from
  &.fade-exit {
    opacity: 1;
  }

  // exit to
  &.fade-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }
`;

export default function LogViewer() {
  const { account } = useWeb3React();
  const { events } = useYamatoStateForWorld();

  function renderLogEvents(events: LogEvent[]) {
    return events.map((event) => {
      const title = LOG_EVENT_NAME[event.category as LogEventType];
      const color = getColor(event.category as LogEventType);
      const descriptor = getDescriptor(event);
      return (
        <CSSTransition key={event.id} timeout={500} classNames="fade">
          <Animation>
            <Text
              key={event.id}
              style={{
                display: 'block',
              }}
            >
              <span style={{ color, fontWeight: 'bold' }}>{title}</span>
              <span>: {shortenAddress(event.address)}が</span>
              <span>{descriptor}</span>
            </Text>
          </Animation>
        </CSSTransition>
      );
    });
  }

  return (
    <div
      style={{ height: !!account ? '30rem' : '34.5rem', overflowY: 'scroll' }}
    >
      {events.length > 0 ? (
        <TransitionGroup>{renderLogEvents(events)}</TransitionGroup>
      ) : (
        <Text>ログがありません。</Text>
      )}
    </div>
  );
}
