import { getEnhancedPrompt, generateImageFromPrompt } from "/utils/apiHelpers";
import { GoDash } from "react-icons/go";
import { PiStarFourBold } from "react-icons/pi";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { FaPen } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const stage = {
  describe: "Describe",
  enhance: "Enhance",
  generate: "Generate",
};

const TextWorkFlow = () => {
  const [promptByUser, setPromptByUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [EnhancedPrompt, setEnhancedPrompt] = useState("");
  const [stageStatus, setStageStatus] = useState(stage.describe);
  const [imageUrl, setImageUrl] = useState("");

  const enhancePrompt = async () => {
    // Logic to enhance the prompt using AI
    setIsLoading(true);
    setStageStatus(stage.enhance);
    setPromptByUser("");
    const enhanced = await getEnhancedPrompt(promptByUser);
    setEnhancedPrompt(enhanced);
    console.log("Enhanced Prompt:", enhanced);
    setIsLoading(false);
  };

  const generateImage = async () => {
    // Logic to generate image from enhanced prompt
    setIsLoading(true);
    setStageStatus(stage.generate);
    const imageUrl = await generateImageFromPrompt(EnhancedPrompt);
     setImageUrl(imageUrl);
    console.log("Generated Image URL:", imageUrl);
    console.log("Setting imageUrl state:", imageUrl);
    setIsLoading(false);
  };

  const renderEnhancePrompt = () => {
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg inset-shadow-sm min-h-100 w-86 ${stageStatus === stage.enhance ? "" : "hidden"} duration-100 ease-in-out  flex-col p-4 my-2`}
      >
        <div className="flex w-fulll items-center h-10 ">
          <div className="bg-purple-100 p-2 rounded-full">
            <FaPen size={18} className="text-[#7a58e8]" />
          </div>
          <h1 className="mx-2 font-sans text-xl">Enhanced Prompt</h1>
        </div>
        <div>
          <p className="text-slate-500 text-md mt-2">
            Review and edit the AI-enhanced description before generating{" "}
          </p>
        </div>
        <textarea
          value={EnhancedPrompt}
          onChange={(e) => setEnhancedPrompt(e.target.value)}
          placeholder="A scenic view of mountains during sunset"
          className="w-full rounded-lg bg-white p-2 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a58e8] min-h-60 max-h-60"
        />
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => generateImage()}
            className="bg-[#7a58e8] text-white py-2 px-4 rounded-lg self-end mt-4 hover:bg-[#6a47c9] transition-colors duration-100 ease-in-out flex items-center"
          >
            <FaWandMagicSparkles size={18} className="mr-2" />
            Generate Image
          </button>
          <button
            onClick={() => setStageStatus(stage.describe)}
            className="bg-transparent text-black py-2 px-4 rounded-lg self-end mt-4 hover:bg-[#6a47c9] transition-colors duration-100 ease-in-out flex items-center"
          >
            <FaUndo size={20} className="mr-2" />
          </button>
        </div>
      </div>
    );
  };

  const renderDescribeVision = () => {
    return (
      <div
        className={`bg-white duration-100 ease-in-out  rounded-2xl shadow-lg inset-shadow-sm min-h-40 w-86 ${stageStatus === stage.describe ? "" : "hidden"} flex-col p-4 my-2`}
      >
        <div className="flex w-fulll items-center h-10 ">
          <div className="bg-purple-100 p-2 rounded-full">
            <PiStarFourBold size={20} className="text-[#7a58e8]" />
          </div>
          <h1 className="mx-2 font-sans text-xl">Describe Your Vision</h1>
        </div>
        <div>
          <p className="text-slate-500 text-md mt-2">
            Enter a simple description of the image you want to create
          </p>
        </div>
        <textarea
          value={promptByUser}
          onChange={(e) => setPromptByUser(e.target.value)}
          placeholder="A scenic view of mountains during sunset"
          className="w-full h-24 rounded-lg bg-white p-2 mt-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#7a58e8] min-h-30 max-h-60"
        />
        <button
          disabled={!promptByUser}
          onClick={() => enhancePrompt()}
          className="bg-[#7a58e8] text-white py-2 px-4 rounded-lg self-end mt-4 hover:bg-[#6a47c9] transition-colors duration-100 ease-in-out flex items-center"
        >
          <FaWandMagicSparkles size={18} className="mr-2" />
          Enhance Prompt
        </button>
      </div>
    );
  };

  const generatedImage = () => {
    console.log("Rendering generated image with URL:", imageUrl);
    return (
      <div
        className={`bg-white rounded-2xl shadow-lg inset-shadow-sm min-h-100 w-86 ${stageStatus === stage.generate ? "" : "hidden"} duration-100 ease-in-out  flex-col p-4 my-2`}
      >
        <div className="flex w-fulll items-center h-10 ">
          <div className="bg-green-100 p-2 rounded-full">
            <MdDone size={18} className="text-green-400" />
          </div>
          <h1 className="mx-2 font-sans text-xl">Your Generated Image</h1>
        </div>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated"
            className="w-full rounded-lg mt-4 object-cover max-h-80"
            onLoad={() => setIsLoading(false)} // ✅ hide spinner when image loads
            onError={() => {
              setIsLoading(false);
              setImageUrl(null); // ✅ show error if it fails
            }}
          />
        ) : (
          !isLoading && (
            <p className="text-red-500 mt-4">Failed to generate image.</p>
          )
        )}
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setStageStatus(stage.enhance)}
            className="bg-transparent text-black py-2 px-4 rounded-lg self-end mt-4 hover:bg-[#6a47c9] transition-colors duration-100 ease-in-out flex items-center"
          >
            <FaUndo size={20} className="mr-2" />
            Create Another
          </button>
          <button
            onClick={() => generateImage()}
            className="bg-[#7a58e8] text-white py-2 px-4 rounded-lg self-end mt-4 hover:bg-[#6a47c9] transition-colors duration-100 ease-in-out flex items-center"
          >
            <FaWandMagicSparkles size={18} className="mr-2" />
            Download Image
          </button>
        </div>
      </div>
    );
  };

  const loadingState = () => {
    return (
      <div className="flex flex-col items-center justify-center h-70 w-full">
        <TailSpin color="#7a58e8" height={100} width={100} />{" "}
        <p className="text-slate-400 p-5">It will take some time...</p>
      </div>
    );
  };

  const renderWorkflowContent = () => {
    if (isLoading) {
      return loadingState();
    }
    switch (stageStatus) {
      case stage.describe:
        return renderDescribeVision();
      case stage.enhance:
        return renderEnhancePrompt();
      case stage.generate:
        return generatedImage();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Workflow Steps */}
      <div className="flex gap-2 justify-center items-center my-4 ">
        <div className="flex flex-col items-center ">
          <div
            className={`h-10 w-10 rounded-2xl text-center flex items-center justify-center shadow-md inset-shadow-sm ${stageStatus === stage.describe ? "bg-[#7a58e8] text-white" : "bg-white"}`}
          >
            1
          </div>
          <p className="text-sm my-1">Describe</p>
        </div>
        <GoDash size={30} className="self-center text-slate-400" />
        <div className="flex flex-col items-center">
          <div
            className={`h-10 w-10 rounded-2xl text-center flex items-center justify-center shadow-md inset-shadow-sm ${stageStatus === stage.enhance ? "bg-[#7a58e8] text-white" : "bg-white"}`}
          >
            2
          </div>
          <p className="text-sm my-1">Enhance</p>
        </div>
        <GoDash size={30} className="self-center text-slate-400" />
        <div className="flex flex-col items-center">
          <div
            className={`h-10 w-10 rounded-2xl text-center flex items-center justify-center shadow-md inset-shadow-sm ${stageStatus === stage.generate ? "bg-[#7a58e8] text-white" : "bg-white"}`}
          >
            3
          </div>
          <p className="text-sm my-1">Generate</p>
        </div>
      </div>
      {/*  Workflow Content */}
      {renderWorkflowContent()}
    </div>
  );
};

export default TextWorkFlow;
