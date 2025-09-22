import axios from 'axios';

export const getGeminiText = async (prompt: string): Promise<string> => {
  try {
    console.log( prompt );
    const response = await axios.post(
      'http://172.20.10.2:3000/api/gemini-text',
      { prompt },
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Error fetching response from Geminri.';
  }
};

export const getGeminiTextWithImage = async (prompt: string, imageBase64: string | null): Promise<string> => {
  try {
    const response = await axios.post(
      'http://172.20.10.2:3000/api/gemini-text-image',
      { prompt, image: imageBase64 },
      {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Error fetching response from Geminri.';
  }
};
