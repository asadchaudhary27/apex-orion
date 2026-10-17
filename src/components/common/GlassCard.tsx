import React from 'react';
import { cn } from '../../utils/cn';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover-glow' | 'interactive' | 'solid-dark';
  glowColor?: 'cyan' | 'orange' | 'white' | 'none';
  blurAmount?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  as?: React.ElementType;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  glowColor = 'none',
  blurAmount = 'md',
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  }[blurAmount];

  const variantClasses = {
    default: 'bg-black/[0.03] border-white/10 shadow-2xl',
    'hover-glow': 'bg-black/[0.03] border-white/10 hover:border-[#FF5722]/50 hover:bg-black/[0.08] hover:shadow-[0_0_30px_rgba(255,87,34,0.3)] transition-all duration-300',
    interactive: 'bg-black/[0.03] border-white/10 hover:border-[#FF5722]/40 hover:bg-black/[0.05] active:scale-[0.99] transition-all duration-200 cursor-pointer',
    'solid-dark': 'bg-[#0a0a0a]/90 border-white/10 backdrop-blur-md',
  }[variant];

  const glowClasses = {
    cyan: 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-b before:from-[#FF5722]/20 before:to-transparent before:-z-10',
    orange: 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-b before:from-[#FF5722]/25 before:to-transparent before:-z-10',
    white: 'before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-b before:from-white/15 before:to-transparent before:-z-10',
    none: '',
  }[glowColor];

  return (
    <Component
      className={cn(
        'relative rounded-2xl border glass-fallback',
        blurClasses,
        variantClasses,
        glowClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GlassCard;
