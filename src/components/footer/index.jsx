import './footer.style.css'

const Footer = ({ desktop }) => {
  return (
    <p className={`footer ${desktop && 'deskFooter'}`}>
      Copyright © {new Date().getFullYear()} Developed by{' '}
      <a href='https://canwebe.tech' target='_blank' rel='noopener noreferrer'>
        CanWeBe!
      </a>
    </p>
  )
}

export default Footer
