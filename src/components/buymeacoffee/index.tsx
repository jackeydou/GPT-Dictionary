import coffee from '../../assets/buymeacoffee.png';

export default function BuyMeACoffee() {
  return (
    <a href="https://www.buymeacoffee.com/libertylab" target="_blank">
      <img 
        src={coffee}
        alt="Buy Me A Coffee" 
        className="rounded-lg"
        style={{height: 34, width: 150}} />
    </a>
  )
}