import React, { useEffect } from "react";
interface Prop {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const LoadingPage: React.FC<Prop> = ({ loading, setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!loading) {
    return null;
  }
  return (
    <div className=" z-50 h-[60vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div
          style={{
            backgroundImage:
              "conic-gradient(from 0deg, violet, indigo 30%, blue 50%, green 60%, yellow 70%, orange 80%, red 100%)",
          }}
          className="size-20 rounded-full bg-radial bg-gradient-to-tr animate-spin"
        ></div>
        <h1 className="text-3xl text-clip bg-gradient-to-r from-violet-500 to-red-500 bg-clip-text text-transparent">
          Loading...
        </h1>
      </div>
    </div>
  );
};
