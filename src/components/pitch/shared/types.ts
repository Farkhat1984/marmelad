// Shared types for Pitch Deck components

export interface RevenueDataPoint {
  year: string;
  revenue: number;
}

export interface DonutDataItem {
  category: string;
  percentage: number;
  amount: string;
}

export interface CompetitorData {
  name: string;
  price: number;
  quality: number;
  localFocus: number;
  isMarmelat?: boolean;
}

export interface UnitEconomicsItem {
  metric: string;
  value: string;
  benchmark?: string;
  isGood: boolean;
}

export interface KPIData {
  value: string;
  label: string;
  growth?: string | null;
}

export interface ChartProps {
  animated?: boolean;
}

export interface SlideProps {
  className?: string;
}
