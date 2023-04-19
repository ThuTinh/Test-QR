import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

export const CustomQrScanner = () => {
  const [videoRef, setVideoRef] = useState(useRef<HTMLVideoElement>().current);
  const [camera, setCamera] = useState<QrScanner | null>(null);
  const [data, setData] = useState("No result");
  useEffect(() => {
    if (videoRef) {
      const cam = new QrScanner(videoRef, (result) => onResult(result), {
        onDecodeError: (error) => {
          console.info("onDecodeError", error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      cam.start();
      setCamera(cam);
    }
  }, [videoRef]);

  useEffect(() => {
    return () => camera?.stop();
  }, [camera]);

  const onResult = (result: QrScanner.ScanResult) => {
    console.info("setResult", result);
    setData(result.data);
  };
  return (
    <>
      <h1>{data}</h1>
      <button
        onClick={() => {
          camera?.setInversionMode("original");
          camera?.setCamera("environment");
          camera?.setGrayscaleWeights(0, 0, 0);
          camera?.start();
        }}
      >
        START
      </button>
      <button
        onClick={() => {
          camera?.stop();
        }}
      >
        STOP
      </button>
      <video
        style={{ width: "200px", height: "200px" }}
        ref={(r) => {
          if (r) {
            setVideoRef(r);
          }
        }}
        id="qr-video"
      ></video>
    </>
  );
};
