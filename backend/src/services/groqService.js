import Groq from "groq-sdk";
import { buildTripPrompt } from "../prompts/tripPrompt.js";


export const generateTripPlan = async (trip) => {
    const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
    });

  
    try {
    const prompt = buildTripPrompt(trip);

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      response_format: {
        type: "json_object",
      },

      temperature: 0.1,

      messages: [
        {
          role: "system",
          content: `
You are VoyageAI.

Return ONLY valid RFC 8259 JSON.

Never return markdown.

Never return explanations.

Never wrap JSON inside code fences.

If the user's input is invalid, return a valid JSON object explaining the issue.

Never return invalid JSON.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = chatCompletion.choices[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("Empty response received from AI.");
    }
        console.log(result);


    JSON.parse(result);
    console.log(result);

    return result;
  } catch (error) {
    console.error("Groq Service Error:", error);
    throw error;
  }
};
