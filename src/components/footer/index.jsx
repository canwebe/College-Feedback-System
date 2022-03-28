import './footer.style.css'

const Footer = ({ desktop }) => {
  return (
    <p className={`footer ${desktop && 'deskFooter'}`}>
      Copyright © {new Date().getFullYear()} Developed by{' '}
      <a
        href='http://canwebe.netlify.app'
        target='_blank'
        rel='noopener noreferrer'
      >
        CanWeBe! Inc
      </a>
    </p>
  )
}

export default Footer
