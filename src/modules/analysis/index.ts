import { Elysia, t } from 'elysia';
import { AnalysisModel } from './model';
import { AnalysisService } from './service';

export const analysis = new Elysia({ prefix: '/analysis', tags: ['Analysis'] })
  .model({
    'analysis.body': AnalysisModel.analyzeBody,
    'analysis.response': AnalysisModel.analyzeResponse,
  })
  .post(
    '/',
    async ({ body, set }) => {
      try {
        return await AnalysisService.analyzeSpecs(body);
      } catch (e: unknown) {
        set.status = 500;
        return (e as Error).message;
      }
    },
    {
      body: 'analysis.body',
      detail: {
        summary: '스펙 분석',
        description:
          '사용자의 스펙 텍스트(경험, 자격증, 어학, 경력, 학력 등)를 분석하여 각 항목별 점수와 상세 분석 내용을 반환합니다.',
      },
      response: {
        200: 'analysis.response',
        500: t.String(),
      },
    }
  );
