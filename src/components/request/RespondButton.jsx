import { requestService } from "../../services/requestService";
import { useState } from "react";
import {
  HeartIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const RespondButton = ({ requestId }) => {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRespond = async () => {
    setLoading(true);
    try {
      await requestService.respondToRequest(requestId);
      setStatus("Response sent! You are someone's hero.");
    } catch {
      setStatus("You have already responded or cannot respond.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-2 items-start w-full">
      <button
        className="w-full sm:w-auto bg-secondary text-white px-4 py-2 rounded hover:bg-primary font-medium flex items-center gap-2 transition disabled:opacity-60 disabled:pointer-events-none"
        onClick={handleRespond}
        disabled={loading || !!status}
        type="button"
      >
        {loading ? (
          <>
            <HeartIcon className="h-5 w-5 text-white animate-pulse" />
            Responding...
          </>
        ) : status ? (
          status.includes("hero") ? (
            <>
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
              {status}
            </>
          ) : (
            <>
              <XCircleIcon className="h-5 w-5 text-red-600" />
              {status}
            </>
          )
        ) : (
          <>
            <HeartIcon className="h-5 w-5 text-white" />
            Respond & Save a Life
          </>
        )}
      </button>
      {!!status && status.includes("hero") && (
        <span className="text-xs text-green-700 flex items-center gap-1">
          <CheckCircleIcon className="h-4 w-4" />
          Thank you for offering hope!
        </span>
      )}
    </div>
  );
};

export default RespondButton;
