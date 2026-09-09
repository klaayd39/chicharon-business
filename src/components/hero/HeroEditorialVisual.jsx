import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { products } from '../../data/products'
import { heroVisual } from '../../constants/motion'

const heroImage = products.find((p) => p.id === 'lumpia')

export default function HeroEditorialVisual() {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -48])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.06])

  if (!heroImage) return null

  if (prefersReducedMotion) {
    return (
      <div className="hero-editorial-visual">
        <Link to={`/products/${heroImage.id}`} className="hero-editorial-frame group block">
          <img
            src={heroImage.image}
            alt={heroImage.imageAlt}
            className="hero-editorial-img"
            decoding="async"
            fetchPriority="high"
          />
        </Link>
        <p className="hero-editorial-caption font-display italic text-brown/45 text-sm mt-4 text-center lg:text-left">
          Lumpia, tocino, tapa, longganisa, BBQ &amp; chicharon — all in one place.
        </p>
      </div>
    )
  }

  return (
    <div ref={ref} className="hero-editorial-visual">
      <motion.div variants={heroVisual} initial="hidden" animate="show">
        <Link to={`/products/${heroImage.id}`} className="hero-editorial-frame group block">
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <img
              src={heroImage.image}
              alt={heroImage.imageAlt}
              className="hero-editorial-img"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
          <span className="hero-editorial-shine" aria-hidden="true" />
          <span className="hero-editorial-corner hero-editorial-corner-tl" aria-hidden="true" />
          <span className="hero-editorial-corner hero-editorial-corner-br" aria-hidden="true" />
        </Link>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="hero-editorial-caption font-display italic text-brown/45 text-sm mt-4 text-center lg:text-left"
      >
        Lumpia, tocino, tapa, longganisa, BBQ &amp; chicharon — all in one place.
      </motion.p>
    </div>
  )
}
