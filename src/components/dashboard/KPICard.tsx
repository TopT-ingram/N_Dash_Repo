import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Environment } from '@/store/filterStore';

interface KPICardProps {
  label: string;
  count: number;
  trend: number;
  isActive: boolean;
  onClick: () => void;
  environment: Environment;
}

const KPICard = ({ label, count, trend, isActive, onClick }: KPICardProps) => {
  const isPositive = trend > 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`kpi-card ${isActive ? 'kpi-card-active' : ''}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-foreground">{count}</span>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-destructive' : 'text-success'}`}>
          {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {Math.abs(trend)}%
        </div>
      </div>
    </motion.div>
  );
};

export default KPICard;
