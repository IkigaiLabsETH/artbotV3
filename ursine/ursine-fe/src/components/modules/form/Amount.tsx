import { FC } from 'react';

interface AmountProps {
  amount: number;
  onMinus: () => void;
  onPlus: () => void;
}

export const Amount: FC<AmountProps> = ({ amount, onMinus, onPlus }) => {
  return (
    <div className="flex items-center space-x-4 bg-dark-secondary rounded-lg p-2">
      <button
        onClick={onMinus}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        -
      </button>
      <span className="text-lg font-bold min-w-[2rem] text-center">
        {amount}
      </span>
      <button
        onClick={onPlus}
        className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        +
      </button>
    </div>
  );
}; 