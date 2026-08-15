import React from "react";
import busImage from "../../../../assets/images/busImage.png";
import CircleShape from "../../../../components/ui/CircleShape";

interface AuthContainerProps {
  circleText1: string;
  circleText2: string;
  children: React.ReactNode;
}

const AuthContainer = ({ circleText1, circleText2, children }: AuthContainerProps) => {
  return (
    <div className="flex gap-48">
      <div className="font-futura">
        <CircleShape text1={circleText1} text2={circleText2} />
        <div className="px-9 sm:px-20 py-4 mx-auto sm:mx-0">
          {children}
        </div>
      </div>

      <div className="hidden sm:block w-full p-4">
        <div className="mx-auto my-auto mt-16">
          <img src={busImage} alt="Rydroo Bus" />
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
