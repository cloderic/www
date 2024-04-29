import Link from './link';

export default async function ContentList({
  items,
  renderTitle,
  renderSubtitle,
  renderDate,
  ...otherProps
}) {
  return (
    <ul {...otherProps}>
      {items.map((item, index) => (
        <li
          key={index}
          className="border-l-4 border-blue pl-2 my-4 flex flex-col"
        >
          <time
            className="text-blue-light text-xs"
            dateTime={item.date.toISODate()}
          >
            {renderDate(item)}
          </time>
          <Link
            href={`/content/${item.slug}`}
            className="text-blue hover:underline"
          >
            {renderTitle(item)}
          </Link>
          <span className="text-sm">{renderSubtitle(item)}</span>
        </li>
      ))}
    </ul>
  );
}
