import badgeWhite from './img/white72.png';
import badgeWhiteBlue from './img/white-blue72.png';
import badgeWhiteGreen from './img/white-green72.png';
import badgeWhiteYellow from './img/white-yellow72.png';
import badgeWhitePink from './img/white-pink72.png';
import badgeBluePink from './img/blue-pink72.png';
import badgeBlueGreen from './img/blue-green72.png';
import badgeGreenBlue from './img/green-blue72.png';
import badgeGreenYellow from './img/green-yellow72.png';
import badgeYellowGreen from './img/yellow-green72.png';
import badgeYellowPink from './img/yellow-pink72.png';
import badgePinkYellow from './img/pink-yellow72.png';
import badgePinkBlue from './img/pink-blue72.png';

const badges = [
  { months: 1, icon: badgeWhite },
  { months: 2, icon: badgeWhiteBlue },
  { months: 3, icon: badgeWhiteGreen },
  { months: 6, icon: badgeWhiteYellow },
  { months: 9, icon: badgeWhitePink },
  { months: 12, icon: badgeBluePink },
  { months: 18, icon: badgeBlueGreen },
  { months: 24, icon: badgeGreenBlue },
  { months: 30, icon: badgeGreenYellow },
  { months: 36, icon: badgeYellowGreen },
  { months: 42, icon: badgeYellowPink },
  { months: 48, icon: badgePinkYellow },
  { months: 54, icon: badgePinkBlue },
];

export function SubBadge(props) {
  let icon;

  let i = 0;
  while (i < badges.length && badges[i].months <= props.months) {
    icon = badges[i].icon;
    i++;
  }

  return <img className="SubBadge" src={icon} alt="" />;
}
