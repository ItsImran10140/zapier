/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode } from "react";

export const DarkButton = ({
  childern,
  onClick,
  size = "small",
}: {
  childern: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center px-8 py-2 cursor-pointer hover:shadow-md bg-purple-800 text-white rounded text-center`}
    >
      {childern}
    </div>
  );
};
