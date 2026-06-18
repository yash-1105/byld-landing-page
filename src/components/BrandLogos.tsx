/** Recognizable brand marks rebuilt as inline SVG, self-contained, crisp at any size. */

type P = { size?: number }

export function WhatsAppLogo({ size = 34 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="WhatsApp">
      <path fill="#25D366" d="M16 0a16 16 0 0 0-13.79 24.1L0 32l8.13-2.13A16 16 0 1 0 16 0z" />
      <path fill="#fff" d="M11.86 8.6c-.27-.62-.55-.63-.81-.64h-.69c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3 0 1.77 1.29 3.48 1.47 3.72.18.24 2.5 4 6.18 5.46 3.06 1.21 3.68.97 4.34.91.66-.06 2.14-.87 2.44-1.72.3-.85.3-1.57.21-1.72-.09-.15-.33-.24-.69-.42-.36-.18-2.14-1.06-2.47-1.18-.33-.12-.57-.18-.81.18-.24.36-.93 1.18-1.14 1.42-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.89-1.78-1.07-.95-1.79-2.13-2-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.79-1.96-1.11-2.67z" />
    </svg>
  )
}

export function ExcelLogo({ size = 34 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="Microsoft Excel">
      <path fill="#107C41" d="M19 16 8 14v12.6c0 .77.63 1.4 1.4 1.4H29.6c.77 0 1.4-.63 1.4-1.4V22z" />
      <path fill="#185C37" d="M19 16 8 14V5.4C8 4.63 8.63 4 9.4 4H19z" />
      <path fill="#21A366" d="M29.6 4H19v12h12V5.4c0-.77-.63-1.4-1.4-1.4z" />
      <path fill="#33C481" d="M19 16h12v6H19z" />
      <rect x="1" y="8" width="18" height="16" rx="1.6" fill="#107C41" />
      <path fill="#fff" d="m6.3 12 2.1 4 2.2-4h2.5l-3.3 6 3.4 6h-2.6l-2.2-4.1L6.2 24H3.6l3.4-6-3.3-6z" />
    </svg>
  )
}

export function DriveLogo({ size = 34 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 1443 1250" role="img" aria-label="Google Drive">
      <path fill="#3777E3" d="m240.5 1250 240.5-416.7h962.1L1202.5 1250z" />
      <path fill="#FFCF63" d="M962.1 833.3h481L962.1 0H481.1z" />
      <path fill="#11A861" d="M0 833.3 240.5 1250l481-833.3L481 0z" />
    </svg>
  )
}

export function GmailLogo({ size = 34 }: P) {
  return (
    <svg width={size} height={size * (40 / 52)} viewBox="0 0 52 40" role="img" aria-label="Gmail">
      <path fill="#4285F4" d="M3.5 40h7V19L0 11v25.5C0 38.43 1.57 40 3.5 40z" />
      <path fill="#34A853" d="M41.5 40h7c1.93 0 3.5-1.57 3.5-3.5V11l-10.5 8z" />
      <path fill="#FBBC04" d="M41.5 3.5V19L52 11V5.25c0-4.86-5.55-7.63-9.44-4.71z" />
      <path fill="#EA4335" d="M10.5 19V3.5L26 15.13 41.5 3.5V19L26 30.63z" />
      <path fill="#C5221F" d="M0 5.25V11l10.5 8V3.5L9.44.54C5.55-2.38 0 .39 0 5.25z" />
    </svg>
  )
}
