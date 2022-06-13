import { CheerBadge } from '../common/cheer-badge/CheerBadge';
import { SubBadge } from '../common/sub-badge/SubBadge';
import './RecentAlert.css';
import giftIcon from './img/gift.png';

export function RecentAlert(props) {
  let icon;
  let action = '';
  let amount = props.amount;

  if (props.type === 'sub') {
    icon = <SubBadge months={props.amount} />;
    amount = 'New Sub';
  } else if (props.type === 'resub') {
    icon = <SubBadge months={props.amount} />;
    if (props.amount === 1) {
      amount = 'New Sub';
    } else {
      amount = `${props.amount} Months`;
    }
  } else if (props.type === 'gift') {
    icon = <img className='gift-icon' src={giftIcon} alt='' />
    amount = `Gifted x${props.amount}`;
  } else if (props.type === 'cheer') {
    icon = <CheerBadge bits={props.amount} />;
    amount = `${amount} Bits`;
  }

  return (
    <div className={`RecentAlert ${props.visible ? 'shown' : 'hidden'} drop-shadow`}>
      {icon}
      <span className="username">{props.username}</span>{' '}
      <span className="action">{action}</span>{' '}
      <span className="amount">{amount}</span>
    </div>
  );
}
