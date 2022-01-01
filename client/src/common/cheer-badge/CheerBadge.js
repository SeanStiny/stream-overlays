import badge100 from './img/100bits72.png';
import badge1000 from './img/1000bits72.png';
import badge5000 from './img/5000bits72.png';
import badge10000 from './img/10000bits72.png';
import badge25000 from './img/25000bits72.png';

const badges = [
  { bits: 100, icon: badge100 },
  { bits: 1000, icon: badge1000 },
  { bits: 5000, icon: badge5000 },
  { bits: 10000, icon: badge10000 },
  { bits: 25000, icon: badge25000 },
];

export function CheerBadge(props) {
  let icon;

  let i = 0;
  while (i < badges.length && badges[i].bits <= props.bits) {
    icon = badges[i].icon;
    i++;
  }

  return <img className="CheerBadge" src={icon} alt="" />;
}
