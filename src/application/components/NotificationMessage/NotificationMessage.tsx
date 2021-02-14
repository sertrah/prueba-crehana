import React, { FunctionComponent } from "react";
import { createPortal } from "react-dom";

type NotificationMessageProps = {
  notifications?: { id: number; title?: string; message?: string }[];
  mountingElement: Element;
  onClose: any;
};

const NotificationMessage: FunctionComponent<NotificationMessageProps> = ({
  notifications,
  mountingElement,
}) => {
  return createPortal(
    <div className="fixed top-0">
      {notifications?.map(({ id, title, message }) => (
        <div key={id}>
          <section className="flex items-center justify-center mt-4 mx-3 top-0">
            <div
              className="flex items-center bg-white shadow  rounded mt-6 px-2 mx-8"
              style={{ width: "24rem" }}
            >
              <div className="mr-6 bg-blue-500 rounded px-4 py-2 text-center -ml-3">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex items-center rounded-lg rounded-l-none">
                <h2 className="text-blue-600 text-lg font-bold mr-2 ">Info</h2>
                <p className="text-sm text-gray-700">{message}</p>
              </div>
              <div className="flex justify-end flex-1">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-red-600"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>,
    mountingElement
  );
};

export default NotificationMessage;
