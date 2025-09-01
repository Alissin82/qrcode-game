// components/ui/ComingSoon.tsx
type ComingSoonProps = {
  message?: string;
  isBoy?: boolean;
};

const ComingSoon = ({ message = "به زودی فعال می‌شود 🚀", isBoy = true }: ComingSoonProps) => {
  const circleGradient = isBoy
    ? "bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500"
    : "bg-gradient-to-tr from-pink-500 via-rose-500 to-red-500";

  const textColor = isBoy ? "text-blue-200" : "text-pink-200";

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        {/* دایره متحرک */}
        <div
          className={`mb-4 inline-flex h-24 w-24 animate-bounce items-center justify-center rounded-full ${circleGradient} shadow-2xl`}
        >
          <span className="text-4xl">⏳</span>
        </div>

        {/* متن اصلی */}
        <h2 className={`text-2xl font-extrabold tracking-wide drop-shadow-md ${textColor}`}>
          {message}
        </h2>

        {/* متن توضیحی */}
        <p className="mt-2 text-sm text-white/80">منتظر یه چیز خفن باش 😉</p>
      </div>
    </div>
  );
};

export default ComingSoon;
