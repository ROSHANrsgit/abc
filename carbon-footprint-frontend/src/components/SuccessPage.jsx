import React, { useRef, useContext, forwardRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import backgroundImage from "../assets/Images/background.svg";
import downloadIcon from "../assets/Images/download.svg";
import footer from "../assets/Images/Footer.svg";
import carbonlogo from "../assets/Images/CarbonLogo.svg";
import wegrowlogo from "../assets/Images/WeGrowLogo.svg";
import Meera from "../assets/Images/Meera.svg";
import Merin from "../assets/Images/Merin.svg";
import { GlobalStateContext } from "../signupContext";
import "../components/style.css";

const Certificate = React.forwardRef((props, ref) => {
  const { data, emission, todate } = props;
  return (
    <div
      ref={ref}
      className="w-[350px] h-[493.5px] md:w-[425.5px] md:h-[600px] border-[14px] border-[#40A578] relative "
    >
      <div className="flex justify-around items-center md:mt-[28px] md:mb-[6px] mb-[5px] ">
        <img src={wegrowlogo} alt="We Grow Forest Logo" className="w-20" />
      </div>
      <div className="text-center">
        <h1 className="outfit-medium text-[9px]">
          This certificate acknowledges that
        </h1>
        <h2 className="text-base md:text-lg outfit-bold text-[#40A578] -my-1 md:my-0 ">
          {data.name.toUpperCase()}
        </h2>
        <p className="outfit-medium text-[9px]">has successfully offset</p>
        <p className="text-sm outfit-bold text-[#40A578] ">
          {emission} kg of CO<sub>2</sub> emissions
        </p>
        <p className="text-[9px] outfit-medium -mb-[4px]">by supporting</p>
        <p className="text-[9px] outfit-medium -mb-[4px]">
          We Grow Forest Foundation's
        </p>
        <p className="text-[9px] outfit-medium">
          Verified Carbon Zero Day Projects
        </p>
        <p className="text-sm text-[#40A578] outfit-bold -my-[2px] md:my-0">
          {todate}
        </p>
        <p className="text-[9px] outfit-medium -mb-[4px]">
          Thank you for your commitment to combating climate change
        </p>
        <p className="text-[9px] outfit-medium mb-[9px]">
          by offsetting your carbon footprint with
        </p>
      </div>
      <div className="flex justify-center">
        <img
          src={carbonlogo}
          alt="Carbon Zero Day Logo"
          className="w-36 mx-auto"
        />
      </div>
      <div className="text-[9px] text-center outfit-medium mb-[4px]">
        www.carbonzero.day
      </div>

      <div className="flex justify-center gap-[20px] mr-[16px] ">
        <img src={Meera} alt="Dr Meera Asmi" className="w-[60px] " />
        <img src={Merin} alt="Dr Merin Jacob" className="w-[40px]" />
      </div>

      <div>
        <div
          className="relative flex justify-center h-[158.5px] md:h-[215px] -mt-[2px]"
          style={{
            backgroundImage: `url(${footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",

            borderTop: "none",
          }}
        >
          <div className="flex justify-center gap-[20px]">
            <div className="text-end">
              <p className="outfit-medium text-[7px] md:text-[10px] -mb-[1px] ">
                Dr Meera Asmi
              </p>
              <p className="text-[6px] -mb-[2px] md:mb-0 outfit-medium">
                Chairwoman
              </p>
              <p className="text-[6px] outfit-medium">
                We Grow Forest Foundation
              </p>
            </div>
            <div className="justify-start">
              <p className="outfit-medium text-[7px] md:text-[10px] -mb-[1px] ">
                Dr Merin Jacob
              </p>
              <p className="text-[6px] -mb-[2px] md:mb-0 outfit-medium">
                Managing Trustee
              </p>
              <p className="text-[6px] outfit-medium">
                We Grow Forest Foundation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const CertificateDownload = forwardRef(({ emit }, ref) => {
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };
  const today = new Date();
  const formattedDate = formatDate(today);

  const { formData } = useContext(GlobalStateContext);

  return (
    <div ref={ref}>
      <Certificate data={formData} emission={emit} todate={formattedDate} />
    </div>
  );
});

const CarbonZeroDay = () => {
  const certificateRef = useRef();
  const { formData } = useContext(GlobalStateContext);

  const captureElement = (element, scale = 2) => {
    return new Promise((resolve) => {
      const captureArea = element.querySelector(".capture-area");
      if (!captureArea) {
        console.error("Capture area not found");
        return;
      }

      // Add a white background div
      const bgDiv = document.createElement("div");
      bgDiv.style.position = "absolute";
      bgDiv.style.top = "0";
      bgDiv.style.left = "0";
      bgDiv.style.right = "0";
      bgDiv.style.bottom = "0";
      bgDiv.style.backgroundColor = "white";
      captureArea.insertBefore(bgDiv, captureArea.firstChild);

      setTimeout(() => {
        html2canvas(captureArea, {
          scale: scale,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null,
        }).then((canvas) => {
          captureArea.removeChild(bgDiv);
          resolve(canvas);
        });
      }, 100); // Small delay to ensure rendering
    });
  };
  const downloadPDF = () => {
    const input = certificateRef.current;
    const scale = 2; // Increase this for higher resolution
    html2canvas(input, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 2.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width / scale;
      const imgHeight = canvas.height / scale;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0; // Set to 0 to remove top white space
      pdf.addImage(imgData, "JPEG", imgX, imgY, canvas.width, canvas.height);
      pdf.save("CarbonZeroDay_Certificate.pdf");
    });
  };

  const downloadJPG = () => {
    const input = certificateRef.current;
    const scale = 2; // Increase this for higher resolution
    html2canvas(input, { scale: scale }).then((canvas) => {
      canvas.toBlob(
        (blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = "CarbonZeroDay_Certificate.jpg";
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);
        },
        "image/jpeg",
        1.0
      ); // 1.0 is maximum quality
    });
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="font-sans bg-cover bg-center flex flex-col lg:flex-row items-center justify-around min-h-screen bg-gray-50 p-4"
    >
      <div className="flex flex-col lg:gap-8 gap-[5px] mt-4">
        <div className="text-left pl-0 lg:pl-0 mb-10  ">
          <h1 className="font-outfit text-4xl lg:text-6xl outfit-extrabold text-[#40A578] text-left">
            Download
          </h1>
          <h1 className="text-4xl lg:text-6xl outfit-extrabold text-[#9DDE8B] text-left">
            Carbon Zero.Day
          </h1>
          <h1 className="text-4xl lg:text-6xl outfit-extrabold text-[#40A578] text-left">
            Certificate
          </h1>
        </div>
        <div className="flex space-x-2">
          <button
            className="w-full flex gap-4 lg:gap-16 outfit-medium items-center justify-start py-2 px-2 md:px-4 bg-[#9DDE8B] text-white rounded-md hover:bg-[#40A578]"
            onClick={downloadPDF}
          >
            PDF
            <img src={downloadIcon} alt="Download" className="ml-2 h-4 w-5" />
          </button>
          <button
            className="w-full flex gap-4 lg:gap-16 outfit-medium items-center justify-start py-2 px-2 md:px-4 bg-[#9DDE8B] text-white rounded-md hover:bg-[#40A578] "
            onClick={downloadJPG}
          >
            JPG
            <img src={downloadIcon} alt="Download" className="ml-2 h-4 w-5" />
          </button>
          <button className="w-full py-2 px-2 md:px-4 bg-[#9DDE8B] text-white rounded-md hover:bg-[#40A578] ">
            <a
              href="https://www.wegrowforest.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center outfit-medium justify-center"
            >
              www.wegrowforest.org
            </a>
          </button>
        </div>
      </div>
      <div className="md:mt-8 -mt-4 bg-white border-8 border-[#40A578] w-[350px] h-[493.5px] md:w-[425.5px] md:h-[600px] flex items-center justify-center">
        <CertificateDownload ref={certificateRef} emit={100} />
      </div>
    </div>
  );
};

export default CarbonZeroDay;
