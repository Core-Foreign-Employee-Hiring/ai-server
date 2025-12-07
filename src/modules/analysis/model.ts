import { t } from 'elysia';

export namespace AnalysisModel {
  export const analyzeBody = t.Object(
    {
      specs: t.String({
        description: '스펙 텍스트 모음 (경험, 자격증, 어학 등)',
        minLength: 10,
        examples: [
          '토익 900점, 정보처리기사 자격증 보유, 인턴 6개월 경험 있음.',
        ],
      }),
      model: t.Optional(
        t.String({
          description:
            '사용할 AI 모델 (기본값: google/gemini-2.5-flash-preview-09-2025)',
          default: 'google/gemini-2.5-flash-preview-09-2025',
          examples: [
            'google/gemini-2.5-flash-preview-09-2025',
            'deepseek/deepseek-v3.2',
          ],
        })
      ),
    },
    {
      description: '스펙 분석을 위한 입력 데이터',
    }
  );

  export const analyzeResponse = t.Object({
    experience: t.Integer({
      minimum: 0,
      maximum: 100,
      description: '경험 점수',
    }),
    certificate: t.Integer({
      minimum: 0,
      maximum: 100,
      description: '자격증 점수',
    }),
    language: t.Integer({ minimum: 0, maximum: 100, description: '어학 점수' }),
    career: t.Integer({ minimum: 0, maximum: 100, description: '경력 점수' }),
    education: t.Integer({
      minimum: 0,
      maximum: 100,
      description: '학력 점수',
    }),
    analysis: t.String({ description: '상세 분석 내용' }),
  });

  // Types
  export type AnalyzeBody = typeof analyzeBody.static;
  export type AnalyzeResponse = typeof analyzeResponse.static;
}
