export interface Job {
  id: string;
  kind: string;
  args: string;
  status: string;
  attempts: JobAttempt[];
  created_at: Date;
  updated_at: Date;
}

export interface JobAttempt {
  started_at: Date;
  duration: number;
  status: string;
  error: string;
  stacktrace: string[];
}
