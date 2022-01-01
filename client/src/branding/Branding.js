import Avatar from './Avatar'
import Name from './Name';
import './Branding.css';
import twitchIcon from './TwitchGlitchWhite.png';
import twitterIcon from './twitter-icon-white.png';

export function Branding() {
  return (
    <div className="Branding">
      <Avatar />

      <div className="float">
        <img className="twitch drop-shadow" src={twitchIcon} alt="" />
        <img className="twitter drop-shadow" src={twitterIcon} alt="" />
      </div>

      <Name />
    </div>
  );
}
