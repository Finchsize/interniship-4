import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";

export function Download() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(
    parseInt(`${process.env.REACT_APP_COUNTDOWN_TIME_SECONDS}`, 10),
  );
  const [copy, setCopy] = useState("Copy link");
  const [disabled, setDisabled] = useState(false);

  const startDownload = () => {
    const link = document.createElement("a");
    link.href = `${process.env.REACT_APP_CLIENT}`;
    link.click();
  };
  const downloadAdobe = () => {
    const link = document.createElement("a");
    link.href = `${process.env.REACT_APP_FLASH}`;
    link.click();
  };
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopy("Copied to Clipboard");
    setDisabled(true);
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
      <div className="flex flex-col items-end">
        <div className="flex w-full justify-center gap-4">
          <Button
            text={
              <div className="flex w-full items-center justify-center">
                <span className="pr-2 font-icons text-white">arrow_back</span>
                <p>Go back</p>
              </div>
            }
            fullWidth
            size="base"
            onClick={() => {
              navigate(-1);
            }}
          />
          <Button
            text={
              <div className="flex w-full items-center justify-center">
                <span className="pr-2 font-icons text-white">content_copy</span>
                <p>{copy}</p>
              </div>
            }
            size="base"
            fullWidth
            onClick={copyLink}
            disabled={disabled}
          />
        </div>
      </div>
    </Modal>
  );
}
