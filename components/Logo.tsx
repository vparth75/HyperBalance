interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 240, height = 240, className = "" }: LogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 240 240" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="120" cy="120" r="95" stroke="#213147" strokeWidth="16" fill="none" />

      {/* top right arc */}
      <path 
        d="M120 25 A95 95 0 0 1 215 120"
        stroke="#e3066e"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none" 
      />

      {/* bottom left arc */}
      <path 
        d="M120 215 A95 95 0 0 1 25 120"
        stroke="#e3066e"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none" 
      />

      {/* balance dot small */}
      <circle cx="170" cy="70" r="14" fill="#e3066e"/>
      {/* balance dot large */}
      <circle cx="70" cy="170" r="20" fill="#213147"/>
    </svg>
  );
}
