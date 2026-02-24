const ChartCard = ({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`chart-container flex flex-col min-h-0 ${className}`}>
      <h3 className="text-sm font-semibold text-foreground mb-3 shrink-0">{title}</h3>
      <div className="flex-1 min-h-0 w-full overflow-visible">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;
