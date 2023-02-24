import coffee from '../../assets/buymeacoffee.png';

export default function BuyMeACoffee() {
  return (
    <a href="https://www.buymeacoffee.com/libertylab" target="_blank" className="fixed top-2 right-2 rounded-lg overflow-hidden">
      <img 
        src={coffee}
        alt="Buy Me A Coffee" 
        style={{height: 34, width: 150}} />
    </a>
  )
}