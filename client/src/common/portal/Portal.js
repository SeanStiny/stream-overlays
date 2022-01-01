import './Portal.css';

export function Portal(props) {
  return (
    <div className={`Portal ${props.open ? 'open' : 'closed'}`}></div>
  )
}
