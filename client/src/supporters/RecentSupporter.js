import { CheerBadge } from '../common/cheer-badge/CheerBadge';
import { SubBadge } from '../common/sub-badge/SubBadge';
import './RecentSupporter.css';
import giftIcon from './img/gift.png';

export function RecentSupporter(props) {
  let icon;
  let action = '';
  let amount = props.amount;

  if (props.type === 'sub') {
    icon = <SubBadge months={props.amount} />;
    amount = 'New Sub';
  } else if (props.type === 'resub') {
    icon = <SubBadge months={props.amount} />;
    amount = `${props.amount} Months`;
  } else if (props.type === 'gift') {
    icon = <img className='gift-icon' src={giftIcon} alt='' />
    amount = `Gifted x${props.amount}`;
  } else if (props.type === 'cheer') {
    icon = <CheerBadge bits={props.amount} />;
    amount = `${amount} Bits`;
  }

  return (
    <div className={`Label ${props.visible ? 'shown' : 'hidden'}`}>
      {icon}
      <span className="username">{props.username}</span>{' '}
      <span className="action">{action}</span>{' '}
      <span className="amount drop-shadow">{amount}</span>
    </div>
  );
}
