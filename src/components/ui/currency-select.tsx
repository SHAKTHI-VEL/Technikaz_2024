import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const currencies = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 },
  GBP: { symbol: '£', rate: 0.0095 },
  AUD: { symbol: 'A$', rate: 0.018 },
  CAD: { symbol: 'C$', rate: 0.016 },
  JPY: { symbol: '¥', rate: 1.79 },
  CNY: { symbol: '¥', rate: 0.086 }
} as const;

export type CurrencyCode = keyof typeof currencies;

interface CurrencySelectProps {
  value: CurrencyCode;
  onValueChange: (value: CurrencyCode) => void;
  className?: string;
}

export function CurrencySelect({ value, onValueChange, className }: CurrencySelectProps) {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value as CurrencyCode)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(currencies).map(([code, { symbol }]) => (
          <SelectItem key={code} value={code}>
            <span className="inline-flex items-center gap-2">
              <span className="text-sm">{symbol}</span>
              <span>{code}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function formatPrice(price: number, currency: CurrencyCode) {
  const { symbol, rate } = currencies[currency];
  const convertedPrice = price * rate;
  return `${symbol}${convertedPrice.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}