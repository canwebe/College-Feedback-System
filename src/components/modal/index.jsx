import { FaTimes } from 'react-icons/fa'
import { motion } from 'framer-motion'
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
  hidden: { y: '-100vh' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.3 },
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

const Modal = ({ setIsModal, handleSubmit }) => {
  // To Hide the Modal
  const handleClick = (e) => {
    if (e.target.classList.contains('backDrop')) {
      setIsModal(false)
    }
  }

  // When user agree
  const handleAgree = () => {
    console.log('agreed')
    handleSubmit()
    setIsModal(false)
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
        <span className='cancelIcon' onClick={() => setIsModal(false)}>
          <FaTimes />
        </span>
        <div>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, quasi molestiae esse dolor iure totam maiores facilis
            et repellat nulla porro aperiam beatae at doloribus repellendus
            voluptate mollitia repudiandae? Ab.
          </p> */}
          <p>
            Please provide your valid USN only because for security reason this
            app has no logout feature. Once You signed in with your usn there is
            no way to go back. OTP will be sent to your registered phone number.
          </p>
          <div className='modalBtnDiv'>
            <button onClick={() => setIsModal(false)}>Cancel</button>
            <button onClick={handleAgree}>I Agree</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Modal
