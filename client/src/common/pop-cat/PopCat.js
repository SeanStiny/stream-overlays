import popCatOpen from './img/pop-cat-mouth-open.png';
import popCatClosed from './img/pop-cat-mouth-closed.png';

const imgOpen = new Image();
imgOpen.src = popCatOpen;
const imgClosed = new Image();
imgClosed.src = popCatClosed;

export function PopCat(props) {
  if (props.mouth === 'open') {
    return <img className="PopCat open" src={imgOpen.src} alt="" />;
  } else {
    return <img className="PopCat closed" src={imgClosed.src} alt="" />;
  }
}
