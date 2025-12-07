import OpenAI from 'openai';
import { AnalysisModel } from './model';

export abstract class AnalysisService {
  private static openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  static async analyzeSpecs(
    data: AnalysisModel.AnalyzeBody
  ): Promise<AnalysisModel.AnalyzeResponse> {
    const aiModel = data.model || 'deepseek/deepseek-v3.2';

    const prompt = `
You are a recruitment expert. Analyze the applicant's specification text and score each of the five items (experience, certificate, language, career, education) between 0 and 100, and write a comprehensive analysis of the results.

Answer in Korean.

[INPUT]
${data.specs}

[OUTPUT FORMAT]
Respond in JSON format only. Do not include markdown tags (\`\`\`json).
{
  "experience": <점수 0-100>,
  "certificate": <점수 0-100>,
  "language": <점수 0-100>,
  "career": <점수 0-100>,
  "education": <점수 0-100>,
  "analysis": "<상세 분석 내용>"
}
`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: aiModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const responseContent = completion.choices[0]?.message?.content || '{}';

      // Clean up code blocks if present
      const cleaned = responseContent
        .replace(/```json\s*/g, '')
        .replace(/```\s*/g, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      // Ensure all fields are present and valid
      return {
        experience: Number(parsed.experience) || 0,
        certificate: Number(parsed.certificate) || 0,
        language: Number(parsed.language) || 0,
        career: Number(parsed.career) || 0,
        education: Number(parsed.education) || 0,
        analysis: parsed.analysis || '분석에 실패했습니다.',
      };
    } catch (error) {
      console.error('Error analyzing specs:', error);
      throw new Error('AI analysis failed');
    }
  }
}
