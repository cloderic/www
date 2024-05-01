import Link from './link';

const defaultRenderDate = ({ date }) => date.toFormat('yyyy/MM/dd');
const defaultRenderTitle = ({ title, venue, organization }) => (
  <>
    {title}
    {venue != null || organization != null ? (
      <span className="italic"> - {venue || organization}</span>
    ) : null}
  </>
);

const CATEGORY_PICTOS = {
  publication: '🖊️',
  talk: '🎙️',
  music: '🎸',
  mooc: '📚'
};

const defaultRenderSubtitle = ({ categories = [] }) =>
  categories.map((category) =>
    Object.hasOwn(CATEGORY_PICTOS, category) ? (
      <span className="me-2">{CATEGORY_PICTOS[category]}</span>
    ) : null
  );

export default async function ContentList({
  items,
  renderTitle = defaultRenderTitle,
  renderSubtitle = defaultRenderSubtitle,
  renderDate = defaultRenderDate,
  ...otherProps
}) {
  return (
    <ul {...otherProps}>
      {items.map((item, index) => (
        <li
          key={index}
          className="border-l-4 border-blue pl-2 my-4 flex flex-col break-inside-avoid"
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
