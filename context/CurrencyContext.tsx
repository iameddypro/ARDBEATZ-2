import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'USD' | 'TZS' | 'KES' | 'UGX' | 'GHS';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInUsd: number) => string;
  convertPrice: (priceInUsd: number) => number;
  rates: Record<CurrencyCode, number>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Approximate rates relative to USD (1 USD = ...)
// These should ideally be fetched from an API in a real production app.
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  TZS: 2700, // Tanzanian Shilling
  KES: 130,  // Kenyan Shilling
  UGX: 3700, // Ugandan Shilling
  GHS: 16,   // Ghanaian Cedi
};

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  TZS: 'TSh ',
  KES: 'KSh ',
  UGX: 'USh ',
  GHS: '₵',
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const convertPrice = (priceInUsd: number) => {
    return priceInUsd * RATES[currency];
  };

  const formatPrice = (priceInUsd: number) => {
    const converted = convertPrice(priceInUsd);
    
    // For TZS, UGX, KES, usually don't use decimals for large numbers
    const shouldHaveDecimals = currency === 'USD' || currency === 'GHS';
    
    const formattedNumber = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: shouldHaveDecimals ? 2 : 0,
      maximumFractionDigits: shouldHaveDecimals ? 2 : 0,
    }).format(converted);

    return `${SYMBOLS[currency]}${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice, rates: RATES }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};