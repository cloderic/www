'use client';

export default function PrintButtonClient({ ...otherProps }) {
  return <button onClick={() => print()} {...otherProps} />;
}
