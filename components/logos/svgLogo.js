export default function SvgLogo({ label, viewBox, d, ...otherProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="currentColor"
      aria-label={label}
      role="img"
      {...otherProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d={d} />
    </svg>
  );
}
