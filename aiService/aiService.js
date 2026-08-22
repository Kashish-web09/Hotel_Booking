import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function generateHotelDescription({
    hotelName,
    location
}) {

    const prompt = `
You are a professional hotel content writer.

Create an attractive hotel description using the following information:

Hotel Name: ${hotelName}
Location: ${location}

Requirements:
- Write 80-100 words.
- Make it professional and attractive.
- Make it suitable for a hotel booking website.
- Do not invent specific facilities or services.
- Focus on the hotel's location and overall stay experience.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
    });

    return response.text;
}