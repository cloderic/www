import clsx from 'clsx';

export { H1, H2, H3, H4 } from './title';

export function Blockquote({ children, className, ...otherProps }) {
  return (
    <blockquote {...otherProps} className={clsx(className, 'border-s-4 ps-4')}>
      {children}
    </blockquote>
  );
}

export function Pre({ children, className, ...otherProps }) {
  return (
    <pre
      {...otherProps}
      className={clsx(
        className,
        'bg-slate-400/50 p-4 font-mono overflow-x-auto'
      )}
    >
      {children}
    </pre>
  );
}

export function Ul({ children, className, ...otherProps }) {
  return (
    <ul
      {...otherProps}
      className={clsx(className, 'list-outside list-["-_"] ps-6')}
    >
      {children}
    </ul>
  );
}

export function Ol({ children, className, ...otherProps }) {
  return (
    <ol
      {...otherProps}
      className={clsx(className, 'list-outside list-decimal ps-6')}
    >
      {children}
    </ol>
  );
}

export function Code({ children, className, ...otherProps }) {
  return (
    <code {...otherProps} className={clsx(className)}>
      {children}
    </code>
  );
}

export function Em({ children, className, ...otherProps }) {
  return (
    <em {...otherProps} className={clsx(className, 'italic')}>
      {children}
    </em>
  );
}

export function P({ children, className, ...otherProps }) {
  return (
    <p
      {...otherProps}
      className={clsx(className, 'text-base/7 mb-4 mt-2 text-justify')}
    >
      {children}
    </p>
  );
}
