"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ArrowLeft, Camera, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ScannerQR() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [permission, setPermission] = useState<boolean>(false)
  const scanIntervalRef = useRef<number | null>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setPermission(true)
        setScanning(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }

    if (scanIntervalRef.current) {
      window.clearInterval(scanIntervalRef.current)
      scanIntervalRef.current = null
    }

    setScanning(false)
  }, [])

  const scanQRCode = useCallback(() => {
    if (!canvasRef.current || !videoRef.current) return

    const canvas = canvasRef.current
    const video = videoRef.current
    const context = canvas.getContext("2d")

    if (!context || video.videoWidth === 0) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get image data for processing
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

    // Here you would normally use a QR code scanning library
    // For demonstration, we'll simulate finding a QR code after 3 seconds

    // In a real implementation, you would use a library like jsQR:
    // const code = jsQR(imageData.data, imageData.width, imageData.height);
    // if (code) {
    //   handleQRCodeDetected(code.data);
    // }
  }, [])

  const handleQRCodeDetected = useCallback(
    async (qrData: string) => {
      // Stop scanning
      stopCamera()

      try {
        // Call your API with the QR code data
        const response = await fetch("https://your-api-endpoint.com/qr-scan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrData }),
        })

        if (!response.ok) {
          throw new Error("Failed to process QR code")
        }

        const data = await response.json()

        // Handle successful scan - for example, navigate to a table
        const tableId = data.tableId || qrData
        localStorage.setItem("bidaTableId", tableId)
        navigate(`/waiting-room/${tableId}`)
      } catch (err) {
        console.error("API error:", err)
        setError("Failed to process QR code. Please try again.")
        setScanning(false)
      }
    },
    [navigate, stopCamera],
  )

  // Simulate QR detection for demo purposes
  // In a real app, this would be handled by the scanQRCode function
  useEffect(() => {
    if (scanning && permission) {
      const timer = setTimeout(() => {
        // Simulate finding a QR code after 3 seconds
        handleQRCodeDetected("table-123")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [scanning, permission, handleQRCodeDetected])

  useEffect(() => {
    startCamera()

    // Set up scanning interval
    if (permission && !scanIntervalRef.current) {
      scanIntervalRef.current = window.setInterval(scanQRCode, 200)
    }

    return () => {
      stopCamera()
    }
  }, [permission, startCamera, scanQRCode, stopCamera])

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Top lighting effect */}
      <div className="absolute top-10 w-48 h-12 bg-white rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-28 w-32 h-8 bg-white rounded-full opacity-10 blur-lg"></div>

      {/* Header with back button */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
        <button onClick={handleBack} className="text-white p-2 rounded-full" aria-label="Go back">
          <ArrowLeft size={24} />
        </button>
        <div className="text-white font-medium">Scan QR Code</div>
        <div className="w-10"></div> {/* Empty div for spacing */}
      </div>

      {/* Camera view */}
      <div className="relative w-[320px] h-[320px] bg-black rounded-lg overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white p-4 text-center">
            <div>
              <p className="mb-4">{error}</p>
              <button
                onClick={() => {
                  setError(null)
                  startCamera()
                }}
                className="px-4 py-2 bg-purple-600 rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />

            {/* QR code scanning frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[220px] h-[220px] border-2 border-white rounded-lg relative">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500"></div>
              </div>
            </div>

            {/* Scanning animation */}
            {scanning && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center text-white">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Scanning...</span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Instructions */}
      <div className="mt-6 text-white text-center px-6">
        <h2 className="text-lg font-medium mb-2">Scan Table QR Code</h2>
        <p className="text-sm text-gray-300">Position the QR code within the frame to scan automatically.</p>
      </div>

      {/* Camera controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <button
          onClick={scanning ? stopCamera : startCamera}
          className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center"
          aria-label={scanning ? "Stop scanning" : "Start scanning"}
        >
          <Camera size={28} className="text-white" />
        </button>
      </div>
    </div>
  )
}

