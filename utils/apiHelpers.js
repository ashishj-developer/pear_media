import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AQ.Ab8RN6LKhwnaHTSaNqxugxbuNmsLIrRnH0sUcdmAFr9GcuQ4dg",
});

// Function to handle the "Enhance" step
export const getEnhancedPrompt = async (input) => {
  try {
    // Call the Google GenAI API to enhance the prompt
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Enhance this image prompt for a professional photographer in 100 words. "${input}"`,
    });
    const data = response.text;
    return data;
  } catch (error) {
    console.error("Enhancement failed:", error);
    return input; // Fallback to original
  }
};



export const generateImageFromPrompt = async (prompt) => {
  try {
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&seed=${Date.now()}`;
    return imageUrl; // Just return URL, don't fetch!
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};