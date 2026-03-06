const CalculatorScreen = ({ result, screenInput }) => {
  // console.log(result);

  return (
    <div className=" w-1/3 h-1/5 bg-teallight  text-4xl text-tealdark">
      <h1 className="text-tealdark m-3 text-sm font-semibold">CALCI</h1>
      <div className="h-1/2 flex flex-col justify-end items-end mx-10 ">
        <p data-testid="screen-input" className="text-2xl text-end">
          {screenInput}
        </p>
        {result < 1 && result != 0 ? (
          <p data-testid="screen-result">{parseFloat(result).toFixed(10)}</p>
        ) : result != 0 ? (
          <p data-testid="screen-result">{parseFloat(result.toFixed(5))}</p>
        ) : (
          <p data-testid="screen-result">0</p>
        )}
      </div>
    </div>
  );
};

export default CalculatorScreen;
