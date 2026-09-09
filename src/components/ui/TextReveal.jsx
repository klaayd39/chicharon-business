import { motion, useReducedMotion } from 'framer-motion'
import { easeOutExpo } from '../../constants/motion'

export default function TextReveal({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  wordDelay = 0.045,
}) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0, rotate: 2 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * wordDelay,
              ease: easeOutExpo,
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
