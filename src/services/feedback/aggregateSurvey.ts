import {
  SURVEY_QUESTIONS,
  type SurveyQuestionId,
} from './survey';

export interface SurveyResponseRow {
  id: number;
  created_at: string;
  frequency: string | null;
  difficulty: string | null;
  favorite_genre: string | null;
  pmf: string | null;
  improvement: string | null;
}

export interface OptionBucket {
  value: string;
  label: string;
  count: number;
  /** Share of the responses that answered this question, 0-100. */
  pct: number;
}

export interface QuestionDistribution {
  id: SurveyQuestionId;
  prompt: string;
  /** Responses that answered this question (not the response total). */
  total: number;
  buckets: OptionBucket[];
}

export interface SurveyAggregation {
  total: number;
  questions: QuestionDistribution[];
  /**
   * Sean Ellis score: percentage answering "very disappointed". 40+ is the
   * conventional product-market-fit threshold. Null when unanswered.
   */
  pmfScore: number | null;
  improvements: Array<Pick<SurveyResponseRow, 'id' | 'created_at' | 'improvement'>>;
}

export function aggregateSurvey(rows: SurveyResponseRow[]): SurveyAggregation {
  const questions = SURVEY_QUESTIONS.map((question) => {
    const answered = rows.filter((row) => row[question.id]);
    const buckets = question.options.map((option) => {
      const count = answered.filter((row) => row[question.id] === option.value).length;
      return {
        value: option.value,
        label: option.label,
        count,
        pct: answered.length > 0 ? (count / answered.length) * 100 : 0,
      };
    });

    return {
      id: question.id,
      prompt: question.prompt,
      total: answered.length,
      buckets,
    };
  });

  const pmf = questions.find((q) => q.id === 'pmf');
  const veryDisappointed = pmf?.buckets.find((b) => b.value === 'very_disappointed');

  const improvements = rows
    .filter((row) => row.improvement && row.improvement.trim().length > 0)
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .map(({ id, created_at, improvement }) => ({ id, created_at, improvement }));

  return {
    total: rows.length,
    questions,
    pmfScore: pmf && pmf.total > 0 ? (veryDisappointed?.pct ?? 0) : null,
    improvements,
  };
}
