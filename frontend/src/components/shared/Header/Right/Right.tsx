import { Status } from "./Status";

export function Right() {
  return (
    <div
      className="flex items-center justify-end gap-8"
      style={{ width: "479.52px" }}
    >
      <Status></Status>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="64"
          viewBox="0 -960 960 960"
          width="64"
        >
          <path d="M242-251.154q56.846-38.615 113.461-60.577Q412.077-333.692 480-333.692t124.654 21.961q56.731 21.962 113.577 60.577 43.231-47.077 67.115-104.451Q809.231-412.978 809.231-480q0-138.077-95.577-233.654T480-809.231q-138.077 0-233.654 95.577T150.769-480q0 67.022 24 124.395 24 57.374 67.231 104.451Zm237.752-213.461q-50.06 0-84.175-34.364-34.116-34.363-34.116-84.423t34.364-84.175q34.363-34.115 84.423-34.115t84.175 34.363q34.116 34.363 34.116 84.423t-34.364 84.175q-34.363 34.116-84.423 34.116ZM480.468-120q-75.545 0-141.016-28.038-65.472-28.039-114.423-77.154-48.952-49.116-76.991-114.189Q120-404.455 120-479.881q0-75.427 28.038-140.619 28.039-65.192 77.154-114.308 49.116-49.115 114.189-77.154Q404.455-840 479.881-840q75.427 0 140.619 28.038 65.192 28.039 114.308 77.154 49.115 49.116 77.154 114.34Q840-555.244 840-480.468q0 75.545-28.038 141.016-28.039 65.472-77.154 114.423-49.116 48.952-114.34 76.991Q555.244-120 480.468-120ZM480-150.769q56.538 0 112.5-19.462 55.961-19.461 100.808-58.692-44.847-34.462-99-54.231Q540.154-302.923 480-302.923t-114.692 19.385q-54.539 19.384-97.846 54.615 44.077 39.231 100.038 58.692 55.962 19.462 112.5 19.462Zm.107-344.616q37.739 0 62.701-25.069 24.961-25.068 24.961-62.807 0-37.739-25.069-62.701-25.069-24.961-62.807-24.961-37.739 0-62.701 25.069-24.961 25.069-24.961 62.807 0 37.739 25.069 62.701 25.069 24.961 62.807 24.961ZM480-583.154Zm0 356.308Z" />
        </svg>
      </button>
    </div>
  );
}
