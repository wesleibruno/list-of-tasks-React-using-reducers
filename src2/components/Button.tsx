type ButtonProps = {
  color: string;
  colorHover: string;
  children?: React.ReactNode;
};

export default function Button({ color, children, colorHover }: ButtonProps) {
  // function handleClick() {
  //   if (color == "bg-red-500") {
  //     alert("red");
  //     console.log("red");
  //   } else if (color == "bg-blue-500") {
  //     alert("blue");
  //     console.log("blue");
  //   } else if (color == "bg-orange-500") {
  //     alert("orange");
  //     console.log("orange");
  //   } else if (color == "bg-purple-500") {
  //     alert("purple");
  //     console.log("purple");
  //   } else if (color == "bg-green-500") {
  //     alert("green");
  //     console.log("green");
  //   } else if (color == "bg-pink-500") {
  //     alert("pink");
  //     console.log("pink");
  //   }
  // }

  const avisar = (msg: string) => {
    alert(msg);
  };
  return (
    <>
      <button
        onClick={() => avisar("mensagem teste")}
        className={`${colorHover} w-29 p-4 h-12 ${color} text-white flex items-center justify-center rounded-md`}
      >
        {children}
      </button>
    </>
  );
}
