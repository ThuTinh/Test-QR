import { useState } from "react";
import "./App.css";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
// import {QrReader} from "react-qr-reader";
import jsQR from "jsqr";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CustomQrScanner } from "./Scanner";

function App() {
  const [result, setResult] = useState("Np result ne");
  // const [isLoading, setLoading] = useState(true);
  // const [users, setUsers] = useState<any[]>([]);
  // useEffect(() => {
  //   axios
  //     .get("https://gorest.co.in/public/v2/users")
  //     .then((data) => {
  //       setUsers(data.data);
  //     })
  //     .catch(() => {
  //       setUsers([]);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   navigator.mediaDevices.getUserMedia({ video: true }).then((a) => {
  //     console.info("KKK", a);
  //   });
  // }, []);

  const handleTakePhoto = (dataUri: any) => {
    setResult("");

    // Create an image element and set its source to the captured image data
    const image = new Image();
    image.src = dataUri;

    // Wait for the image to load, then create a canvas element and draw the image on it
    image.onload = () => {
      console.info("onload");
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d")!;
        context.drawImage(image, 0, 0);

        // Get the data URL of the canvas and pass it to the QR code scanner
        // const imageDataUrl = canvas.toDataURL("image/png");
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);
        if (qrCode) {
          setResult(qrCode.data);
          console.log(qrCode.data);
        }
        console.info("qrCode", qrCode)
      } catch (error) {
        console.info("ERRR", error);
      }
    };
  };


  return (
    <div className="App">
      <div>{`${result} test`}</div>
      {/* <CustomQrScanner/> */}
      {/* TEST CALL API */}
      {/* {isLoading && <div>Loading....</div>}
      {!isLoading && (
        <>
          <h3>Hello Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.name}>{user.name}</li>
            ))}
          </ul>
        </>
      )} */}
      <Camera
        onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
        isMaxResolution={true}
        sizeFactor={1}
        isImageMirror={false}
        idealResolution={{width: 1280, height: 720}}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        imageType={IMAGE_TYPES.PNG}
      />
    </div>
  );
}

export default App;
