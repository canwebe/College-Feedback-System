import { motion } from 'framer-motion'
import Star from '../star'

const optionvariants = {
  hover: {
    borderWidth: '2.2px',
    padding: '9.3px 19.3px 9.3px 14.3px',
  },
}

const Options = ({ label, value, clickFxn, flag }) => {
  return (
    <motion.button
      variants={optionvariants}
      //   whileTap="tap"
      whileHover='hover'
      className={flag ? 'active' : ''}
      onClick={() => clickFxn(value)}
    >
      {label}
      <span className='star'>
        <Star rating={value} />
      </span>
    </motion.button>
  )
}

export default Options
