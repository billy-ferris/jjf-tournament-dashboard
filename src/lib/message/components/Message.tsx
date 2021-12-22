import { FunctionComponent } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { MessageProps } from "../message.types";

export const Message: FunctionComponent<MessageProps> = ({ message, type }) => (
  <div
    className={`mb-2 p-4 border-l-4 w-full max-w-lg animate-fade-in-up ${
      type === "error"
        ? "bg-red-50 border-red-400"
        : type === "success"
        ? "bg-green-50 border-green-400"
        : "bg-blue-50 border-blue-400"
    }`}
  >
    <div className="flex">
      <div className="flex-shrink-0">
        {type === "error" ? (
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        ) : type === "success" ? (
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        ) : (
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        )}
      </div>
      <div className="ml-3">
        <div
          className={`text-sm ${
            type === "error"
              ? "text-red-800"
              : type === "success"
              ? "text-green-800"
              : "text-blue-800"
          }`}
        >
          <p>{message}</p>
        </div>
      </div>
    </div>
  </div>
);

export default Message;
