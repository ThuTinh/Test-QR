import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

// const greyScaleWeights = {
//   red: 0.2126,
//   green: 0.7152,
//   blue: 0.0722,
//   useIntegerApproximation: false,
// };
export const CustomQrScanner = () => {
  const [videoRef, setVideoRef] = useState(useRef<HTMLVideoElement>().current);
  const [camera, setCamera] = useState<QrScanner | null>(null);
  const [data, setData] = useState("No result V2");
  useEffect(() => {
    if (videoRef) {
      const cam = new QrScanner(videoRef, (result) => onResult(result), {
        onDecodeError: (error) => {
          console.info("onDecodeError", error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      });
      cam?.setInversionMode("both");
      cam?.setCamera("environment");
      cam?.setGrayscaleWeights(0.2, 0.8, 0.8, false);
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
