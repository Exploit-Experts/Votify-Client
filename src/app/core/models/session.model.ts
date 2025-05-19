import { Agenda } from '@core/models/agenda.model';

export interface Session {
  id: number;
  title: string;
  description: string;
  organizer: {
    id: number;
    name: string;
  }
  agendas : Agenda[];
  start_date: string;
  end_date: string;
}
