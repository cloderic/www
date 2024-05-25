import Link from './link';

const defaultRenderDate = ({ date }) => date.toFormat('yyyy/MM/dd');
const defaultRenderTitle = ({ title, venue, organization }) => (
  <h3>
    {title}
    {venue != null || organization != null ? (
      <span className="italic"> - {venue || organization}</span>
    ) : null}
  </h3>
);

const CATEGORY_PICTOS = {
  publication: '🖊️',
  other_publications: '🖊️',
  talk: '🎙️',
  music: '🎸',
  mooc: '📚'
};

const defaultRenderSubtitle = ({ categories = [], description = '' }) => (
  <>
    {categories.map((category, index) =>
      Object.hasOwn(CATEGORY_PICTOS, category) ? (
        <span key={index} className="me-2">
          {CATEGORY_PICTOS[category]}
        </span>
      ) : null
    )}
    {description}
  </>
);

export default async function ContentList({
  items,
  renderTitle = defaultRenderTitle,
  renderSubtitle = defaultRenderSubtitle,
  renderDate = defaultRenderDate,
  noprinturl,
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
            noprinturl={noprinturl}
          >
            {renderTitle(item)}
          </Link>
          <span className="text-sm">{renderSubtitle(item)}</span>
        </li>
      ))}
    </ul>
  );
}
