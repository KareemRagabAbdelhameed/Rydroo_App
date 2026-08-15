import { Link } from "react-router-dom";
import SubmitButton from "./SubmitButton";

interface AuthFooterProps {
  title: string;
  loading: boolean;
  footerText: string;
  footerLinkText: string;
  footerLinkTo: string;
  error?: string | null;
}

const AuthFooter = ({
  title,
  loading,
  footerText,
  footerLinkText,
  footerLinkTo,
  error,
}: AuthFooterProps) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-secondMainColor dark:text-white">
          {title}
        </h2>
        <SubmitButton loading={loading} />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="text-secondMainColor dark:text-white mt-3">
        {footerText}{" "}
        <Link to={footerLinkTo} className="font-semibold underline">
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
