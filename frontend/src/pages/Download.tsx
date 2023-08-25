import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import ButtonDanger from "../components/Button/ButtonDanger";
import ButtonOutlined from "../components/Button/ButtonOutlined";

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
      <div className="flex w-full flex-col gap-8">
        <div className=" flex items-start justify-between gap-8 self-stretch">
          <div>
            {countdown > 0 ? (
              <p className=" text-2xl">Download will start in {countdown}s</p>
            ) : (
              <p className="text-2xl text-green-700">Download has started</p>
            )}
            <p>
              If download hasn’t started, click{" "}
              <button className=" text-blue-600" onClick={startDownload}>
                here
              </button>{" "}
              to try again
            </p>
          </div>
          <button className="text-4xl" onClick={() => navigate(-1)}>
            <span className="font-icons">clear</span>
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-red-200 p-8 text-xl text-red-600">
          <div className="flex w-full items-center gap-4">
            <div className=" pt-2 text-5xl">
              <span className="font-icons">error</span>
            </div>
            <p>
              To run the client you need <br /> Adobe Flash Player
            </p>
          </div>

          <ButtonDanger
            text="Download Adobe Flash Player"
            size="base"
            onClick={downloadAdobe}
          />
        </div>

        <div className="flex flex-col items-end">
          <div className="flex w-full justify-center gap-4">
            <Button
              text={
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="pt-1">
                    <span className="font-icons">arrow_back</span>
                  </div>
                  <p>Go back</p>
                </div>
              }
              fullWidth
              size="base"
              onClick={() => {
                navigate(-1);
              }}
            />
            <ButtonOutlined
              text={
                <div className="flex w-full items-center justify-center gap-2">
                  <div className="pt-1">
                    <span className="font-icons">content_copy</span>
                  </div>
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
      </div>
    </Modal>
  );
}
