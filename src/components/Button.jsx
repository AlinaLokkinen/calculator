import bs from "/delete.png";

const Button = ({ b, handleClick }) => {
  return (
    <div className="text-white font-normal text-3xl h-full flex justify-center items-center">
      {b === "bs" ? (
        <button className="">
          <img
            className="max-h-10"
            src={bs}
            alt="a backspace icon"
            onClick={() => handleClick(b)}
          />
        </button>
      ) : (
        <button onClick={() => handleClick(b)}>{b}</button>
      )}
    </div>
  );
};

export default Button;
