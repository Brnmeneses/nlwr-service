export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}
//eh o contrato
//separou a implementacao das operacoes em outro arquivo
//desacoplando a parte de banco
export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}
