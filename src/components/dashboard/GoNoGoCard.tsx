import { useMemo } from 'react';
import type { Ticket } from '@/data/mockData';

interface GoNoGoCardProps {
  tickets: Ticket[];
}

const GoNoGoCard = ({ tickets }: GoNoGoCardProps) => {
  const { readinessScore, status, ragColor, textColor, bgColor } = useMemo(() => {
    // Calculate release readiness score based on multiple factors
    const totalTickets = tickets.length || 1;
    const doneCount = tickets.filter(t => t.status === 'Done').length;
    const qaCount = tickets.filter(t => t.status === 'QA').length;
    const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
    const readyToReleaseCount = tickets.filter(t => t.readyToRelease).length;
    const criticalCount = tickets.filter(t => t.priority === 'Critical').length;
    const highCount = tickets.filter(t => t.priority === 'High').length;

    // Calculate score: Done tickets + QA tickets (weighted), minus critical issues
    const completionScore = ((doneCount + qaCount * 0.7) / totalTickets) * 100;
    const issueImpact = (criticalCount * 2 + highCount * 0.5) / totalTickets * 20; // Max 20 point deduction
    let score = Math.round(completionScore - issueImpact);
    score = Math.min(100, Math.max(0, score));

    // Determine RAG status
    let status: 'GO' | 'NO-GO' | 'RISK';
    let ragColor: string;
    let textColor: string;
    let bgColor: string;

    if (score >= 75) {
      status = 'GO';
      ragColor = 'hsl(142, 71%, 45%)'; // Green
      textColor = 'text-green-700';
      bgColor = 'bg-green-50 border-green-200';
    } else if (score >= 50) {
      status = 'RISK';
      ragColor = 'hsl(38, 92%, 50%)'; // Amber
      textColor = 'text-amber-700';
      bgColor = 'bg-amber-50 border-amber-200';
    } else {
      status = 'NO-GO';
      ragColor = 'hsl(0, 72%, 51%)'; // Red
      textColor = 'text-red-700';
      bgColor = 'bg-red-50 border-red-200';
    }

    return { readinessScore: score, status, ragColor, textColor, bgColor };
  }, [tickets]);

  return (
    <div className={`rounded-lg border-2 p-6 ${bgColor} h-full flex flex-col items-center justify-center`}>
      {/* Indicator Circle */}
      <div className="mb-4 flex items-center justify-center w-24 h-24 rounded-full border-4" style={{ borderColor: ragColor, backgroundColor: `${ragColor}20` }}>
        <span className={`text-4xl font-bold ${textColor}`}>{readinessScore}%</span>
      </div>

      {/* Status Title */}
      <h3 className="text-sm font-medium text-muted-foreground mb-1">Release Readiness</h3>

      {/* Status Badge */}
      <div className={`inline-block px-4 py-2 rounded-full font-bold text-white mb-2`} style={{ backgroundColor: ragColor }}>
        {readinessScore >= 75 ? '🟢 GO' : readinessScore >= 50 ? '🟠 RISK' : '🔴 NO-GO'}
      </div>

      {/* Status Description */}
      <p className={`text-xs text-center ${textColor}`}>
        {readinessScore >= 75 && 'Ready for Release'}
        {readinessScore >= 50 && readinessScore < 75 && 'Review Required'}
        {readinessScore < 50 && 'Not Ready'}
      </p>
    </div>
  );
};

export default GoNoGoCard;
