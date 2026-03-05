"use client"

import { useEffect, useRef, useCallback } from "react"

// Pure Canvas 2D animated background - no Three.js dependencies
export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<
    { x: number; y: number; z: number; vx: number; vy: number; size: number; opacity: number }[]
  >([])
  const geometryRef = useRef({ rotationX: 0, rotationY: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  const initParticles = useCallback((width: number, height: number) => {
    const particles = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    particlesRef.current = particles
  }, [])

  const drawIcosahedron = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) => {
      const geo = geometryRef.current
      geo.rotationX += 0.003
      geo.rotationY += 0.005

      const rx = geo.rotationX
      const ry = geo.rotationY

      // Golden ratio for icosahedron vertices
      const phi = (1 + Math.sqrt(5)) / 2
      const rawVertices = [
        [-1, phi, 0],
        [1, phi, 0],
        [-1, -phi, 0],
        [1, -phi, 0],
        [0, -1, phi],
        [0, 1, phi],
        [0, -1, -phi],
        [0, 1, -phi],
        [phi, 0, -1],
        [phi, 0, 1],
        [-phi, 0, -1],
        [-phi, 0, 1],
      ]

      const faces = [
        [0, 11, 5],  [0, 5, 1],   [0, 1, 7],   [0, 7, 10],  [0, 10, 11],
        [1, 5, 9],   [5, 11, 4],  [11, 10, 2], [10, 7, 6],  [7, 1, 8],
        [3, 9, 4],   [3, 4, 2],   [3, 2, 6],   [3, 6, 8],   [3, 8, 9],
        [4, 9, 5],   [2, 4, 11],  [6, 2, 10],  [8, 6, 7],   [9, 8, 1],
      ]

      // Subtle distortion
      const distort = 0.15
      const projected = rawVertices.map(([x, y, z]) => {
        const dx = x + Math.sin(time * 1.5 + y * 2) * distort
        const dy = y + Math.cos(time * 1.2 + z * 2) * distort
        const dz = z + Math.sin(time * 1.8 + x * 2) * distort

        // Rotate
        const cosRx = Math.cos(rx)
        const sinRx = Math.sin(rx)
        const cosRy = Math.cos(ry)
        const sinRy = Math.sin(ry)

        const y1 = dy * cosRx - dz * sinRx
        const z1 = dy * sinRx + dz * cosRx
        const x1 = dx * cosRy + z1 * sinRy
        const z2 = -dx * sinRy + z1 * cosRy

        // Mouse influence (subtle)
        const mx = mouseRef.current.x * 0.02
        const my = mouseRef.current.y * 0.02

        const scale = 4 / (4 + z2)
        return {
          x: cx + (x1 + mx) * radius * scale,
          y: cy + (y1 + my) * radius * scale,
          z: z2,
          scale,
        }
      })

      // Sort faces by average z (painter's algorithm)
      const sortedFaces = faces
        .map((face) => ({
          face,
          avgZ: face.reduce((sum, i) => sum + projected[i].z, 0) / face.length,
        }))
        .sort((a, b) => b.avgZ - a.avgZ)

      sortedFaces.forEach(({ face, avgZ }) => {
        const [a, b, c] = face.map((i) => projected[i])
        const normalZ = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
        const brightness = Math.max(0.1, Math.min(1, (normalZ / (radius * radius)) * 0.5 + 0.5))
        const alpha = brightness * 0.35 + 0.05

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.closePath()

        ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 0.4})`
        ctx.fill()

        ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.7})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      })

      // Draw vertices as glowing dots
      projected.forEach((p) => {
        const dotSize = 1.5 * p.scale
        ctx.beginPath()
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${0.6 * p.scale})`
        ctx.fill()
      })
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      initParticles(canvas.offsetWidth, canvas.offsetHeight)
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)

    let startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      // Draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        const pulse = Math.sin(elapsed * 0.8 + p.z * 3) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * p.z, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity * pulse})`
        ctx.fill()
      })

      // Draw floating icosahedron
      const radius = Math.min(w, h) * 0.12
      const floatY = Math.sin(elapsed * 0.8) * 10
      drawIcosahedron(ctx, w / 2, h / 2 + floatY, radius, elapsed)

      // Subtle glow behind shape
      const gradient = ctx.createRadialGradient(w / 2, h / 2 + floatY, 0, w / 2, h / 2 + floatY, radius * 3)
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.04)")
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [initParticles, drawIcosahedron])

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" style={{ display: "block" }} />
    </div>
  )
}
