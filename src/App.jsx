import { useState } from 'react';
import './App.css'
// import Barcode from 'react-barcode';
import QRCode from "react-qr-code";

function App() {
  const [bText, setBText] = useState('test');
  const handleOnChange = (event) => {
    // event.preventDefault();
    const name = event.target.value;
    setBText(name);
    // console.log(name)
  }

  const onImageDownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="">
      {/* <input type="text" name='name' onChange={handleOnChange} /> */}
      <textarea name="" id="" cols="30" rows="10" onChange={handleOnChange}></textarea>
      {/* <Barcode value={bText} /> */}
      <QRCode
        id="QRCode"
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={bText}
        viewBox={`0 0 256 256`}
      />
      <input type="button" value="Download QR" onClick={onImageDownload} />
    </div>
  )
}

export default App
