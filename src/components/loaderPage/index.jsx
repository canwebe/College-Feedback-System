import './loaderPage.style.css'
import loader from '../../assets/loader2.svg'

export default function LoaderPage() {
  return (
    <div className='loaderPage'>
      <div class='loader'>
        <p>
          SaIT<span>FEEDBACK</span>
        </p>
        <img src={loader} alt='loading' />
      </div>
    </div>
  )
}
