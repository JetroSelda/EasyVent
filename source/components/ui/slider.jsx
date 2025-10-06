import React, { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils'; // Make sure this utility exists in your project

const RangeSlider = React.forwardRef(({ className, min, max, step = 1, formatLabel, value, onValueChange, ...props }, ref) => {
  // Ensure `value` is an array [min, max]
  const initialValue = Array.isArray(value) ? value : [min, max];
  const [localValues, setLocalValues] = useState(initialValue);

  const handleChange = (newVals) => {
    setLocalValues(newVals);
    onValueChange?.(newVals);
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleChange}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      {localValues.map((val, index) => (
        <React.Fragment key={index}>
          {/* Optional value label positioned above each thumb */}
          <div
            className="absolute text-center"
            style={{
              left: `calc(${((val - min) / (max - min)) * 100}% + 0px)`,
              top: '10px'
            }}
          >
            <span className="text-xs">
              {formatLabel ? formatLabel(val) : val}
            </span>
          </div>
          <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        </React.Fragment>
      ))}
    </SliderPrimitive.Root>
  );
});

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;