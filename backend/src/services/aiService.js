import Groq from "groq-sdk";


export const chatWithAI=async(message)=>{
    const groq=new Groq({
        apiKey:process.env.GROQ_API_KEY,
    });
    try {
        const response=await groq.chat.completions.create({
        messages:[
            {
                role:"system",
                content:"You are VoyageAI, a helpful AI travel assistant. Help users with destinations, itineraries, budgets, activities, food, transportation and travel tips."
            },
            {
                role:"user",
                content:message,
            },
        ],
        model:"openai/gpt-oss-120b",
    });

    return response.choices[0].message.content||"";
    } catch (error) {
        console.error("Groq API Error:", error);
        throw error;
    }
}