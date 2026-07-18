// ─── useCamera.js ────────────────────────────────────────────────────────────
// Access webcam stream for StartAttendance component
import { useState, useRef, useCallback } from "react";

export function useCamera() {
  const videoRef   = useRef(null);
  const streamRef  = useRef(null);
  const [active, setActive]   = useState(false);
  const [error,  setError]    = useState(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setActive(true);
      setError(null);
    } catch (err) {
      setError(err.message || "Camera access denied");
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setActive(false);
  }, []);

  return { videoRef, active, error, startCamera, stopCamera };
}
