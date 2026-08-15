import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
  return (
    <span className="bg-secondMainColor w-[40px] h-[40px] rounded-full flex items-center justify-center">
      <button type="submit" disabled={loading}>
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <ArrowRight className="text-white text-lg" />
        )}
      </button>
    </span>
  );
};

export default SubmitButton;
