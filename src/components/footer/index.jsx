import './footer.style.css'

const Footer = () => {
  return (
    <p className='footer'>
      Developed by{' '}
      <a
        href='http://canwebe.netlify.app'
        target='_blank'
        rel='noopener noreferrer'
      >
        CanWeBe! Inc
      </a>{' '}
      .<br className='desktop' /> All rights are reserved ©{' '}
      {new Date().getFullYear()}
    </p>
  )
}

export default Footer
