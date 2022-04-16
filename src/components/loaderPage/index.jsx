import './loaderPage.style.css'
import loader from '../../assets/loader2.svg'
export default function LoaderPage() {
  return (
    <div className='loaderPage'>
      <img className='loaderImg' src={loader} alt='loader' />
    </div>
  )
}
