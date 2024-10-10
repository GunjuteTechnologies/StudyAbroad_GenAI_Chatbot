import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

// Function to check if the message is relevant
async function isRelevantMessage(message: string): Promise<boolean> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Analyze the following message and determine if it's related to studying abroad, 
      scholarships, living abroad, jobs abroad, or similar topics. 
      Respond with only 'true' or 'false'.
      
      Message: "${message}"
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text().trim().toLowerCase();
    
    return response === 'true';
  } catch (error) {
    console.error('Error in isRelevantMessage:', error);
    throw error; // Re-throw to be caught in the main handler
  }
}

// Function to process the message with Gemini
async function processMessageWithGemini(message: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `
    As an AI assistant specializing in study abroad, scholarships, and international 
    career opportunities, please provide a helpful response to the following query:
    
    "${message}"
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Named export for the POST method
export async function POST(req: NextRequest) {
  const { message } = await req.json(); // Parse the incoming JSON request body

  try {
    // Run relevance check and message processing in parallel
    const [isRelevant, processedResponse] = await Promise.all([
      isRelevantMessage(message),
      processMessageWithGemini(message)
    ]);

    if (isRelevant) {
      return NextResponse.json({ reply: processedResponse });
    } else {
      return NextResponse.json({
        reply: "I apologize, but I can only assist with topics related to studying abroad, scholarships, international jobs, or living abroad. Could you please rephrase your question to focus on these areas?"
      });
    }
  } catch (error) {
    console.error('Error processing message:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
