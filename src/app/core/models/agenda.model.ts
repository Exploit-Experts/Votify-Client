export interface Agenda {
  id: number;
  title: string;
  description: string;
  sessionId: number;
  status: string;
  startVotingAt: string;
  endVotingAt: string;
  informationVotes?: {
    totalVotes: number;
    approvals: number;
    rejects: number;
  };
}
