import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // store key in .env file
  dangerouslyAllowBrowser: true, // only for demo
});

export async function askDoctorAI(question) {
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo", // or "gpt-4o-mini" if you have access
    messages: [
      { role: "system", content: "You are NextGen Doctor AI. Give advice to farmers about seeds, crops, and farming in simple Hindi-English mix." },
      { role: "user", content: question }
    ]
  });

  return response.choices[0].message.content;
}
