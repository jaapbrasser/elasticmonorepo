import React, { useState, useEffect } from 'react'

const Frog: React.FC = () => {
  const [position, setPosition] = useState(50) // percentage from left
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isHopping, setIsHopping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHopping(true)
      setTimeout(() => setIsHopping(false), 300) // hop animation duration

      // 1/3 chance to turn around
      if (Math.random() < 1/3) {
        setDirection(prev => -prev)
      }

      // Move position
      setPosition(prev => {
        const newPos = prev + direction * 5 // move 5% each hop
        return Math.max(0, Math.min(100, newPos)) // keep within bounds
      })
    }, 1000) // every second

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: `${position}%`,
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <svg width="60" height="50" viewBox="0 0 60 50" xmlns="http://www.w3.org/2000/svg">
        {/* Back legs */}
        <ellipse
          cx={direction === 1 ? "12" : "48"}
          cy="35"
          rx="8"
          ry="4"
          fill="#4ade80"
          transform={isHopping ? `rotate(${direction === 1 ? -30 : 30} ${direction === 1 ? 12 : 48} 35)` : ''}
        />
        <ellipse
          cx={direction === 1 ? "48" : "12"}
          cy="35"
          rx="8"
          ry="4"
          fill="#4ade80"
          transform={isHopping ? `rotate(${direction === 1 ? 30 : -30} ${direction === 1 ? 48 : 12} 35)` : ''}
        />

        {/* Frog body */}
        <ellipse
          cx="30"
          cy="25"
          rx={isHopping ? "14" : "16"}
          ry={isHopping ? "20" : "14"}
          fill="#4ade80"
          stroke="#22c55e"
          strokeWidth="2"
        />

        {/* Spots */}
        <circle cx="22" cy="20" r="2" fill="#22c55e" />
        <circle cx="38" cy="22" r="1.5" fill="#22c55e" />
        <circle cx="28" cy="30" r="1" fill="#22c55e" />

        {/* Eyes */}
        <circle cx="25" cy="15" r="4" fill="#fff" stroke="#000" strokeWidth="1" />
        <circle cx="35" cy="15" r="4" fill="#fff" stroke="#000" strokeWidth="1" />
        <circle cx="25" cy="15" r="2" fill="#000" />
        <circle cx="35" cy="15" r="2" fill="#000" />

        {/* Mouth */}
        <path d="M 26 22 Q 30 26 34 22" stroke="#000" strokeWidth="2" fill="none" />

        {/* Front legs */}
        <ellipse
          cx={direction === 1 ? "18" : "42"}
          cy="28"
          rx="6"
          ry="3"
          fill="#4ade80"
          transform={isHopping ? `rotate(${direction === 1 ? -15 : 15} ${direction === 1 ? 18 : 42} 28)` : ''}
        />
        <ellipse
          cx={direction === 1 ? "42" : "18"}
          cy="28"
          rx="6"
          ry="3"
          fill="#4ade80"
          transform={isHopping ? `rotate(${direction === 1 ? 15 : -15} ${direction === 1 ? 42 : 18} 28)` : ''}
        />
      </svg>
    </div>
  )
}

export default Frog