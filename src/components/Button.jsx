import bs from "/delete.png";

const Button = ({ b, handleClick }) => {
  return (
    <div className="text-white font-normal text-3xl h-full flex justify-center items-center">
      {b === "bs" ? (
        <button data-testid="button-bs" className="">
          <img
            className="max-h-10"
            src={bs}
            alt="backspace icon"
            onClick={() => handleClick(b)}
          />
        </button>
      ) : (
        <button data-testid={`button-${b}`} onClick={() => handleClick(b)}>{b}</button>
      )}
    </div>
  );
};

export default Button;
