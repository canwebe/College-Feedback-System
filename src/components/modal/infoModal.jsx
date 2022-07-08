import { motion } from 'framer-motion'
import { FaCross, FaTimes } from 'react-icons/fa'
import './modal.style.css'
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const cardVariants = {
  hidden: { y: '-70vh' },
  visible: {
    y: 0,
    transition: { type: 'spring', mass: 0.5, damping: 9 },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
}

const InfoModal = ({ setIsModal }) => {
  // To Hide the Modal
  const handleClick = (e) => {
    if (e.target.classList.contains('backDrop')) {
      setIsModal(false)
    }
  }

  return (
    <motion.div
      onClick={handleClick}
      className='backDrop'
      variants={backdropVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <motion.div className='modalCard' variants={cardVariants}>
        <FaTimes className='cancelInfo' onClick={() => setIsModal(false)} />
        <div className='infoModal'>
          <p>
            Welcome to SaITFeedback a feedback application for SaIT. For data
            updation , delation , addition and other queries visit your
            respected department.Please give valid review for your own benifits.
          </p>
          <div>
            Developed by{' '}
            <a
              href='https://canwebe.tech'
              target='_blank'
              rel='noopener noreferrer'
            >
              CanWeBe!
            </a>{' '}
            © {new Date().getFullYear()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InfoModal
