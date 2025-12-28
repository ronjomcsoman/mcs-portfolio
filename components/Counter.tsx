'use client'

import { animate, motion, useMotionValue, useTransform, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface CounterProps {
    value: number
    duration?: number
    prefix?: string
}

export default function Counter({ value, duration = 2, prefix = '' }: CounterProps) {
    const count = useMotionValue(0)
    const rounded = useTransform(count, (latest) => {
        return prefix + Math.round(latest).toLocaleString()
    })

    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, { duration, ease: "easeOut" })
            return controls.stop
        }
    }, [value, duration, count, isInView])

    return <motion.span ref={ref}>{rounded}</motion.span>
}
