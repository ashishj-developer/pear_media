import { useState } from "react";
import { CiText } from "react-icons/ci";
import { IoColorPaletteOutline } from "react-icons/io5";
import TextWorkFlow from "./components/TextWorkFlow";

function App() {
  const workflow = [
    {
      name: "Creative Studio",
      icon: <CiText size={20} />,
    },
    {
      name: "Style Lab",
      icon: <IoColorPaletteOutline size={20} />,
    },
  ];

  const [active, setActive] = useState(workflow[0].name);
  return (
    <div className="bg-[#eaeafa] min-h-screen h-full w-screen flex flex-col items-center p-4">
      <div className="flex items-center h-15 my-4">
        <div className="bg-[#7a58e8] flex items-center h-12 mx-2 rounded-xl w-12 justify-center shadow-lg inset-shadow-sm ">
          <h2 className="text-3xl text-white font-bold">P</h2>
        </div>
        <h1 className="text-2xl font-sans">Pear Media</h1>
      </div>
      <div className="flex flex-col items-center w-80 h-auto my-2">
        <h1 className="text-3xl font-bold">AI Creative Suite</h1>
        <p className="text-center text-xl mt-2 text-slate-500">
          Transform simple ideas into stunning visuals with AI-powered prompt
          enhancement
        </p>
      </div>
      <div className="flex items-center bg-white rounded-2xl justify-center my-5 shadow-lg inset-shadow-sm py-0.5">
        {workflow.map((item) => (
          <div className={`flex text-center justify-center m-1.5 h-12 w-40 rounded-2xl  duration-300 ease-out ${active === item.name ? 'bg-[#fbfbfc] shadow-md ' : 'bg-white'}`} key={item.name}>
            <button onClick={() => setActive(item.name)} className="flex items-center ">
              {item.icon}
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <TextWorkFlow />
      {/* footer */}
      <p className="text-slate-500 text-sm mt-6">
        Pear Media • AI-Powered Creative Tools
      </p>
    </div>
  );
}

export default App;
