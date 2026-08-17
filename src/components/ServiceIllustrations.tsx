import React from 'react';

interface IllustrationProps {
  className?: string;
}

// 1. Home Cleaning (House with roof, door, yellow window, and broom)
export const HomeCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* House body */}
    <path d="M22 45L48 24L74 45V82H22V45Z" fill="#1855EA" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Roof overhang */}
    <path d="M16 46L48 20L80 46" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    {/* Attic round window */}
    <circle cx="48" cy="35" r="4.5" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    {/* Door */}
    <rect x="38" y="58" width="20" height="24" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
    <line x1="48" y1="58" x2="48" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    {/* Wall accent dots */}
    <circle cx="28" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="34" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="40" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="48" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="56" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="62" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="68" cy="52" r="1.5" fill="#FFFFFF" opacity="0.9" />
    {/* Broom on right */}
    <path d="M72 82L69 44" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 82H82V73C82 73 78 71 72 71C66 71 62 73 62 73V82Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="67" y1="74" x2="67" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="72" y1="74" x2="72" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="77" y1="74" x2="77" y2="82" stroke="#0F172A" strokeWidth="1.5" />
  </svg>
);

// 2. Apartment Cleaning (Multi-story building with 6 yellow grid windows and broom)
export const ApartmentCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Apartment building */}
    <rect x="22" y="24" width="46" height="58" rx="2" fill="#1855EA" stroke="#0F172A" strokeWidth="2.5" />
    {/* Windows grid */}
    <rect x="30" y="31" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="50" y="31" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="30" y="45" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="50" y="45" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="30" y="59" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="50" y="59" width="10" height="9" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    {/* Ground entrance */}
    <rect x="40" y="73" width="10" height="9" fill="#0F172A" />
    {/* Broom on right */}
    <path d="M72 82L69 44" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    <path d="M62 82H82V73C82 73 78 71 72 71C66 71 62 73 62 73V82Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="67" y1="74" x2="67" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="72" y1="74" x2="72" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="77" y1="74" x2="77" y2="82" stroke="#0F172A" strokeWidth="1.5" />
  </svg>
);

// 3. Office Cleaning (Modern high-rise office tower with horizontal strip windows and broom)
export const OfficeCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tall Office Tower */}
    <rect x="18" y="16" width="34" height="66" rx="2" fill="#1855EA" stroke="#0F172A" strokeWidth="2.5" />
    {/* Side building */}
    <rect x="52" y="44" width="22" height="38" rx="2" fill="#2563EB" stroke="#0F172A" strokeWidth="2" />
    {/* Tower horizontal floor windows */}
    <line x1="24" y1="26" x2="46" y2="26" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="36" x2="46" y2="36" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="46" x2="46" y2="46" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="56" x2="46" y2="56" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    <line x1="24" y1="66" x2="46" y2="66" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    {/* Side building windows */}
    <rect x="58" y="52" width="10" height="6" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="58" y="64" width="10" height="6" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    {/* Broom on right */}
    <path d="M78 82L76 46" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    <path d="M68 82H88V73C88 73 84 71 78 71C72 71 68 73 68 73V82Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="73" y1="74" x2="73" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="78" y1="74" x2="78" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="83" y1="74" x2="83" y2="82" stroke="#0F172A" strokeWidth="1.5" />
  </svg>
);

// 4. Mall / Commercial Center Cleaning (Shopping center with cart sign and broom)
export const MallCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Mall building */}
    <rect x="18" y="36" width="56" height="46" rx="2" fill="#1855EA" stroke="#0F172A" strokeWidth="2.5" />
    {/* Signboard on top with shopping cart */}
    <rect x="28" y="22" width="36" height="16" rx="2" fill="#0B57D0" stroke="#0F172A" strokeWidth="2" />
    {/* Cart symbol */}
    <path d="M38 29H40L42 34H48L49 30H42" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="43" cy="36" r="0.9" fill="#FFFFFF" />
    <circle cx="47" cy="36" r="0.9" fill="#FFFFFF" />
    {/* Mall entrance / double doors */}
    <rect x="32" y="52" width="28" height="30" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
    <line x1="46" y1="52" x2="46" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    {/* Broom on right */}
    <path d="M78 82L75 42" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    <path d="M68 82H88V73C88 73 84 71 78 71C72 71 68 73 68 73V82Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="73" y1="74" x2="73" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="78" y1="74" x2="78" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="83" y1="74" x2="83" y2="82" stroke="#0F172A" strokeWidth="1.5" />
  </svg>
);

// 5. Glass & Window Cleaning (Window with squeegee and sparkling glints)
export const GlassCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Window Frame */}
    <rect x="20" y="24" width="54" height="58" rx="2" fill="#93C5FD" stroke="#0F172A" strokeWidth="2.5" />
    {/* Glass Pane Inner cross */}
    <rect x="25" y="29" width="20" height="21" fill="#DBEAFE" />
    <rect x="49" y="29" width="20" height="21" fill="#DBEAFE" />
    <rect x="25" y="54" width="20" height="23" fill="#DBEAFE" />
    <rect x="49" y="54" width="20" height="23" fill="#DBEAFE" />
    <line x1="47" y1="24" x2="47" y2="82" stroke="#0F172A" strokeWidth="2" />
    <line x1="20" y1="52" x2="74" y2="52" stroke="#0F172A" strokeWidth="2" />
    {/* Sparkles */}
    <path d="M35 38L37 42L41 44L37 46L35 50L33 46L29 44L33 42Z" fill="#FBBF24" />
    <path d="M60 62L61.5 65L64.5 66.5L61.5 68L60 71L58.5 68L55.5 66.5L58.5 65Z" fill="#FBBF24" />
    {/* Squeegee */}
    <path d="M78 82L70 50" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
    <rect x="60" y="46" width="20" height="5" rx="1.5" transform="rotate(-15 60 46)" fill="#1855EA" stroke="#0F172A" strokeWidth="1.5" />
    <rect x="61" y="44" width="18" height="2" rx="0.5" transform="rotate(-15 61 44)" fill="#FBBF24" />
  </svg>
);

// 6. Construction Cleaning (Building site with tools and broom)
export const ConstructionCleaningIllustration: React.FC<IllustrationProps> = ({ className = 'w-16 h-16 sm:w-20 sm:h-20' }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Building under construction */}
    <rect x="20" y="32" width="50" height="50" rx="2" fill="#1855EA" stroke="#0F172A" strokeWidth="2.5" />
    {/* Scaffolding beams */}
    <line x1="26" y1="44" x2="64" y2="44" stroke="#FBBF24" strokeWidth="2.5" />
    <line x1="26" y1="58" x2="64" y2="58" stroke="#FBBF24" strokeWidth="2.5" />
    <line x1="26" y1="72" x2="64" y2="72" stroke="#FBBF24" strokeWidth="2.5" />
    {/* Crane/Hammer icon */}
    <path d="M35 18H55V24H35V18Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="45" y1="24" x2="45" y2="32" stroke="#0F172A" strokeWidth="2" />
    {/* Broom on right */}
    <path d="M78 82L75 42" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    <path d="M68 82H88V73C88 73 84 71 78 71C72 71 68 73 68 73V82Z" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="73" y1="74" x2="73" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="78" y1="74" x2="78" y2="82" stroke="#0F172A" strokeWidth="1.5" />
    <line x1="83" y1="74" x2="83" y2="82" stroke="#0F172A" strokeWidth="1.5" />
  </svg>
);

// Helper function to pick the right illustration based on service ID or icon
export const getServiceIllustration = (id: string, className?: string) => {
  switch (id) {
    case 'unterhaltsreinigung':
    case 'home-cleaning':
      return <HomeCleaningIllustration className={className} />;
    case 'wohnungsreinigung':
    case 'apartment-cleaning':
    case 'treppenhausreinigung':
      return <ApartmentCleaningIllustration className={className} />;
    case 'buero-gewerbereinigung':
    case 'office-cleaning':
    case 'praxisreinigung':
      return <OfficeCleaningIllustration className={className} />;
    case 'gewerbereinigung':
    case 'mall-cleaning':
    case 'sonderreinigung':
      return <MallCleaningIllustration className={className} />;
    case 'glas-fensterreinigung':
      return <GlassCleaningIllustration className={className} />;
    case 'baureinigung':
      return <ConstructionCleaningIllustration className={className} />;
    default:
      return <HomeCleaningIllustration className={className} />;
  }
};
