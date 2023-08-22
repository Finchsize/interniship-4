import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

export function Download() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [copied, setCopied] = useState("");

  const startDownload = () => {
    const link = document.createElement("a");
    link.href = "https://testcqserver.ngrok.dev/5095_modified.7z";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("started download");
  };
  const downloadAdobe = () => {
    const link = document.createElement("a");
    link.href = "https://testcqserver.ngrok.dev/FPPSetup.exe";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log("download adobe");
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied("Copied!");
    console.log("copy link");
  };

  useEffect(() => {
    if (countdown > 0) {
      const timeout = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      startDownload();
    }
  }, [countdown]);

  return (
    <Modal>
      <div className=" flex w-full justify-end">
        <button className="font-icons text-4xl" onClick={() => navigate(-1)}>
          clear
        </button>
      </div>
      <div className="text-center">
        {countdown > 0 ? (
          <p>Download will start in {countdown}s</p>
        ) : (
          <p>Download has started</p>
        )}
        <p>
          If download hasn’t started, click{" "}
          <button className=" text-blue-600" onClick={startDownload}>
            here
          </button>{" "}
          to try again
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <p>To run the client you need Adobe Flash Player</p>
        <Button
          text="Download Adobe Flash Player"
          size="base"
          onClick={downloadAdobe}
        />
        <p>Skip this step, if you already have it</p>
      </div>
      <div className="flex w-full justify-end">
        <div className="flex flex-col items-end">
          <Button
            text={
              <div className="flex w-full items-center justify-end">
                <span className="pr-2 font-icons text-white">content_copy</span>
                <p>Copy link</p>
              </div>
            }
            size="base"
            onClick={copyLink}
          />
          <p>{copied}</p>
        </div>
      </div>
    </Modal>
  );
}
