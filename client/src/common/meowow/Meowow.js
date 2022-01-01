import meowowBlep from './img/meowow-blep.png';
import meowowSmile from './img/meowow-smile.png';

const imgBlep = new Image();
imgBlep.src = meowowBlep;
const imgSmile = new Image();
imgSmile.src = meowowSmile;

export function Meowow(props) {
  if (props.blep) {
    return <img className="Meowow blep" src={imgBlep.src} alt="" />;
  } else {
    return <img className="Meowow smile" src={imgSmile.src} alt="" />;
  }
}
