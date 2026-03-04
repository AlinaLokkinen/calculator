import { useEffect } from "react";

const CalculatorScreen = ({ result, screenInput }) => {
  // console.log(result);

  useEffect(() => {

  }, [])

  return (
    <div className=" w-1/3 h-1/5 bg-teallight  text-4xl text-tealdark">
      <h1 className="text-tealdark m-3 text-sm font-semibold">CALCI</h1>
      <div className="h-1/2 flex flex-col justify-end items-end mx-10 ">
      <p className="text-2xl text-end">{screenInput}</p>
        {result != 0 ? <p>{parseFloat((result).toFixed(5))}</p> : <p>0</p>}
      </div>
    </div>
  );
};

export default CalculatorScreen;
