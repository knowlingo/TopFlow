"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedScoreProps {
  score: number
  grade: string
  duration?: number
}

export function AnimatedScore({ score, grade, duration = 2000 }: AnimatedScoreProps) {
  const [currentScore, setCurrentScore] = useState(0)
  const [showGrade, setShowGrade] = useState(false)

  useEffect(() => {
    // Reset animation when score changes
    setCurrentScore(0)
    setShowGrade(false)

    // Animate score counting up
    const startTime = Date.now()
    const updateScore = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out animation curve
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const newScore = Math.round(score * easeProgress)

      setCurrentScore(newScore)

      if (progress < 1) {
        requestAnimationFrame(updateScore)
      } else {
        // Show grade after score animation completes
        setTimeout(() => setShowGrade(true), 200)
      }
    }

    requestAnimationFrame(updateScore)
  }, [score, duration])

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 80) return "text-blue-500"
    if (score >= 70) return "text-yellow-500"
    return "text-red-500"
  }

  // Get grade color
  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-500 border-green-500 bg-green-500/10"
    if (grade.startsWith("B")) return "text-blue-500 border-blue-500 bg-blue-500/10"
    if (grade.startsWith("C")) return "text-yellow-500 border-yellow-500 bg-yellow-500/10"
    return "text-red-500 border-red-500 bg-red-500/10"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Animated Score Circle */}
      <motion.div
        className={`flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 ${getGradeColor(grade)}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <motion.div
          className={`text-5xl font-bold tabular-nums ${getScoreColor(currentScore)}`}
          animate={{ scale: currentScore === score ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentScore}
        </motion.div>
        <div className="text-xs text-muted-foreground">out of 100</div>
      </motion.div>

      {/* Animated Grade Badge */}
      <AnimatePresence>
        {showGrade && (
          <motion.div
            className={`text-2xl py-2 px-6 font-bold rounded-full border-2 ${getGradeColor(grade)}`}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Grade: {grade}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
