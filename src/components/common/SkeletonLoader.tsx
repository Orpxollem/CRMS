import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'list' | 'table';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animate?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  animate = true
}) => {
  const baseClasses = `bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 ${
    animate ? 'animate-shimmer bg-[length:200%_100%]' : ''
  } ${className}`;

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'rectangular':
        return 'rounded-2xl';
      case 'text':
        return 'rounded-lg';
      default:
        return 'rounded-2xl';
    }
  };

  const getDefaultSize = () => {
    switch (variant) {
      case 'circular':
        return { width: '3rem', height: '3rem' };
      case 'text':
        return { width: '100%', height: '1rem' };
      case 'rectangular':
        return { width: '100%', height: '8rem' };
      default:
        return { width: '100%', height: '2rem' };
    }
  };

  const defaultSize = getDefaultSize();
  const style = {
    width: width || defaultSize.width,
    height: height || defaultSize.height
  };

  if (variant === 'card') {
    return (
      <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 ${className}`}>
        <div className="animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${baseClasses} rounded-full`} style={{ width: '3rem', height: '3rem' }} />
            <div className="flex-1 space-y-2">
              <div className={`${baseClasses} rounded-lg`} style={{ width: '60%', height: '1rem' }} />
              <div className={`${baseClasses} rounded-lg`} style={{ width: '40%', height: '0.75rem' }} />
            </div>
          </div>
          <div className="space-y-3">
            <div className={`${baseClasses} rounded-lg`} style={{ width: '100%', height: '0.75rem' }} />
            <div className={`${baseClasses} rounded-lg`} style={{ width: '80%', height: '0.75rem' }} />
            <div className={`${baseClasses} rounded-lg`} style={{ width: '90%', height: '0.75rem' }} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4">
              <div className={`${baseClasses} rounded-full`} style={{ width: '2.5rem', height: '2.5rem' }} />
              <div className="flex-1 space-y-2">
                <div className={`${baseClasses} rounded-lg`} style={{ width: '70%', height: '1rem' }} />
                <div className={`${baseClasses} rounded-lg`} style={{ width: '50%', height: '0.75rem' }} />
              </div>
              <div className={`${baseClasses} rounded-xl`} style={{ width: '4rem', height: '2rem' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={`bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-100 overflow-hidden ${className}`}>
        <div className="p-6 border-b border-neutral-100">
          <div className={`${baseClasses} rounded-lg`} style={{ width: '30%', height: '1.5rem' }} />
        </div>
        <div className="divide-y divide-neutral-100">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="grid grid-cols-4 gap-4">
                <div className={`${baseClasses} rounded-lg`} style={{ height: '1rem' }} />
                <div className={`${baseClasses} rounded-lg`} style={{ height: '1rem' }} />
                <div className={`${baseClasses} rounded-lg`} style={{ height: '1rem' }} />
                <div className={`${baseClasses} rounded-lg`} style={{ height: '1rem' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()} animate-fade-in`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : style.width,
              animationDelay: `${index * 100}ms`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()}`}
      style={style}
    />
  );
};

export default SkeletonLoader;