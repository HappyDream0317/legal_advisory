import Layout from "@/components/Layout";
import { useEffect, useRef } from "react";
import { fabric } from "fabric";
// import Main from "./Main";

const Airclaim = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      const imageInput = document.getElementById("imageInput");

      if (imageInput) {
        imageInput.addEventListener("change", function (e) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
              const scaleFactor = canvas.width / img.width;
              console.log("canvas.width ", canvas.width);
              console.log("img.width ", img.width);
              const fabricImg = new fabric.Image(img, {
                left: 10,
                top: 10,
                scaleX: scaleFactor,
                scaleY: scaleFactor,
                transparentCorners: false,
              });
              canvas.add(fabricImg);
              canvas.setActiveObject(fabricImg);
              canvas.renderAll();
            };
            img.src = e.target.result as string;
          };
          reader.readAsDataURL(file);
          imageInput.style.display = "none";
        });
      }
    }
  }, []);

  const onClick = () => {
    alert("Sdfsdf")
  }

  return (
    <Layout hideRightSidebar={true}>
      <div>
        <div style={{ width: "596px", margin: "auto" }}>
          <p
            style={{ fontWeight: "bold", fontSize: "20px", marginTop: "20px" }}
          >
            Flight Delay Compensation Form:
          </p>
          <p style={{ marginTop: "10px" }}>
            Please complete this form if you experienced a flight delay and
            would like to check if you are eligible to claim compensation under
            European Union Regulation (EC) No 261/2004 .
          </p>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Personal information :
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Full name:Email address :</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Phone number :</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Flight Details:{" "}
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Flight number:</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Flight date:</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Airline:</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Departure airport:</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Arrival airport:</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Delay Details:{" "}
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Total duration of delay (in hours):</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Reason provided by airline (if known):</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Attached Documentation :{" "}
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p>
                {" "}
                11. Attached copies of: - Boarding passes. - Receipts related to
                additional expenses. - Any communication with the airline.
              </p>
            </div>
          </div>
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Additional Comments:{" "}
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> 12. Provide additional details relevant to your claim :</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <p style={{ marginTop: "25px" }}>
              By completing this form, you acknowledge that the information
              provided is accurate and you are seeking advice regarding your
              eligibility to claim compensation for your flight delay.
            </p>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Presentation date : [Date]</p>
              <input
                style={{
                  borderBottom: "solid 1px grey",
                  outline: "none",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <p> Signature (if sent in printed format): </p>
              <input type="file" id="imageInput" />
              <canvas ref={canvasRef} width={200} height={70} />
              {/* <input style={{borderBottom:"solid 1px grey", outline:"none", marginLeft:"5px"}}/> */}
            </div>
            <p style={{ marginTop: "5px" }}>
              Send this form to the appropriate airline and keep a copy for your
              records. Also, check local laws and regulations to ensure you meet
              specific requirements .
            </p>
          </div>
        </div>
        <button className="btn-blue btn-large w-[150px] m-auto block mt-[50px] mb-[100px]" onClick={onClick}>
          Save
        </button>
      </div>
    </Layout>
  );
};

export default Airclaim;
