import { LOG_EVENT_NAME } from '../../../constants/yamato';
import { useYamatoStateForWorld } from '../../../state/yamato-entirety/hooks';
import { LogEvent, LogEventType } from '../../../state/yamato-entirety/reducer';

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
    case 'yamato_redemption':
      return `blue`;
    case 'yamato_sweep':
      return `blue`;
    default:
      return `black`;
  }
}

function getDescriptor(event: LogEvent) {
  switch (event.category as LogEventType) {
    case 'deposit':
      return `${event.value}ETHを預けました！`;
    case 'withdrawal':
      return `${event.value}ETHを引き出しました！`;
    case 'borrowing':
      return `${event.value}CJPYを借り入れました！`;
    case 'repay':
      return `${event.value}CJPYを返済しました！`;
    case 'self_redemption':
      return `${event.value}CJPYを償還しました！`;
    case 'yamato_redemption':
      return `トリガーしました！`;
    case 'yamato_sweep':
      return `トリガーしました！`;
    default:
      return `${event.value}を行いました！`;
  }
}

export default function LogViewer() {
  const { events } = useYamatoStateForWorld();
  const diplayedEvents = events.slice(0, 20);

  function renderLogEvents() {
    return diplayedEvents.map((event, index) => {
      const title = LOG_EVENT_NAME[event.category as LogEventType];
      const color = getColor(event.category as LogEventType);
      const descriptor = getDescriptor(event);
      return (
        <div key={index}>
          <span style={{ color, fontWeight: 'bold' }}>{title}</span>
          <span>: {event.address}が</span>
          <span>{descriptor}</span>
        </div>
      );
    });
  }

  return <div style={{ minHeight: '500px' }}>{renderLogEvents()}</div>;
}
