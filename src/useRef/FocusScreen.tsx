import { useRef } from "react";

const FocusScreen = () => {
  const inputRef = useRef<HTMLInputElement>(null); //se inicializa en null porque al principio no hay ningun input referenciado

  const handleClick = () => {
    //? es para verificar que inputRef.current no es null
    inputRef.current?.select(); //selecciona el texto del input si inputRef.current no es null es similar al focus pero selecciona el texto
  };
  return (
    <div className="bg-gradient flex flex-col  gap-4">
      <h1 className="text-2xl font-thin text-white">Focus Screen</h1>
      <input
        //  ref lo que hace es referenciar el input al valor de inputRef que es null al principio pero luego apuntara al input
        ref={inputRef}
        type="text"
        className="bg-white p-2 rounded px-4 text-black py-2"
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={handleClick}
      >
        Set Focus
      </button>
    </div>
  );
};
export default FocusScreen;
