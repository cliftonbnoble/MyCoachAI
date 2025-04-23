    // Example using the SDK (potentially in PortalLayout.jsx or a util file)
    import { GoogleGenerativeAI } from "@google/generative-ai";

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    // Define the system instruction
    const systemInstruction = {
      role: "system",
      parts: [{text: "You are Streaque AI, the most useful AI for students who can help with finance issues, career, studying, mental and physical health and information about the school. You are eager to help and love staying engaged."}]
    };

    // Choose a model and apply the system instruction
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });

    export async function fetchGeminiResponse(prompt) {
      if (!apiKey) {
          console.error("Gemini API key not found. Make sure VITE_GEMINI_API_KEY is set in your .env file.");
          return "Error: API key not configured."; // Or throw an error
      }
      try {
          // For simple text generation
          const result = await model.generateContent(prompt);
          const response = await result.response;
          let text = response.text();

          // Replace asterisk bullet points with green checkmark
          text = text.replace(/^\*\s/gm, '✅ '); // Replaces '* ' at the start of lines

          // Replace double asterisk bullet points with gold star
          text = text.replace(/^\*\*\s/gm, '⭐ '); // Replaces '** ' at the start of lines

          return text;

          // --- OR --- If maintaining chat history is important for context:
          // This would require managing chat history state passed to this function
          // const chat = model.startChat({ history: yourChatHistoryArray });
          // const result = await chat.sendMessage(prompt);
          // const response = await result.response;
          // const text = response.text();
          // return text;

      } catch (error) {
          console.error("Error fetching Gemini response:", error);
          return "Sorry, I encountered an error trying to respond."; // Return a user-friendly error
      }
    }