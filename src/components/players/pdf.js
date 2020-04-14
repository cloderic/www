import React, { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import range from 'lodash.range';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faStepBackward,
  faStepForward,
  faFileDownload,
  faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import Measure from 'react-measure';
import Link from '../link';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { BOX_SHADOW, BG_COLOR_2_GRADIENT } from '../../theme/colors';

const DocumentContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: stretch;
  .containee {
    width: 100%;
    max-width: 800px;
  }
  .page,
  .controls {
    position: relative;
    z-index: 10;
    ${BOX_SHADOW};
  }
  .page {
    margin: 0.5rem 0;

    // Do not attempt to display annotations, it messes up the layout.
    .annotationLayer {
      display: none;
    }
  }
  .controls {
    background: ${BG_COLOR_2_GRADIENT};

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: ${({ noPagination }) =>
      noPagination ? 'center' : 'space-between'};;
    padding: 0 0.5rem;

    .title {
      flex-grow: 1;
      text-align: center;
      max-width: 70%;
      margin: 1em 0;

      header {
        font-size: 1.15em;
        margin 0;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

const Pdf = ({
  title,
  src,
  href,
  start = 0,
  end = -1,
  noPagination,
  noControls,
  noLinks,
  noTitle
}) => {
  const [loading, setLoading] = useState(true);
  const [[currentStart, currentEnd], setRange] = useState([0, 0]);
  const [current, setCurrent] = useState(undefined);
  const onDocumentLoaded = useCallback(
    ({ numPages }) => {
      setLoading(false);
      const currentStart = Math.min(Math.max(0, start), numPages);
      const currentEnd =
        end < 0 ? numPages : Math.min(Math.max(currentStart, end), numPages);
      setRange([currentStart, currentEnd]);
      setCurrent(currentStart);
    },
    [start, end, setLoading, setCurrent, setRange]
  );
  const onPrevious = useCallback(
    () =>
      setCurrent((current) => {
        const newCurrent = Math.max(currentStart, current - 1);
        trackCustomEvent({
          category: 'pdf',
          action: 'previousPage',
          label: title,
          value: newCurrent
        });
        return newCurrent;
      }),
    [title, setCurrent, currentStart]
  );
  const onNext = useCallback(
    () =>
      setCurrent((current) => {
        const newCurrent = Math.min(currentEnd - 1, current + 1);
        trackCustomEvent({
          category: 'pdf',
          action: 'nextPage',
          label: title,
          value: newCurrent
        });
        return newCurrent;
      }),
    [title, setCurrent, currentEnd]
  );

  return (
    <DocumentContainer noPagination={noPagination}>
      <Measure bounds>
        {({ measureRef, contentRect }) => (
          <div className="containee" ref={measureRef}>
            <Document
              className="document"
              file={src}
              onLoadSuccess={onDocumentLoaded}
            >
              {!noControls && (
                <div className="controls">
                  {!noPagination && (
                    <button
                      onClick={onPrevious}
                      title={'Previous page'}
                      disabled={noPagination || current === currentStart}
                    >
                      <FontAwesomeIcon icon={faStepBackward} />
                    </button>
                  )}
                  <div className="title">
                    {!noTitle && <header>{title}</header>}
                    {!noLinks && (
                      <div>
                        <small>
                          <Link href={src}>
                            <FontAwesomeIcon icon={faFileDownload} /> Download
                          </Link>{' '}
                          -{' '}
                          <Link href={href}>
                            <FontAwesomeIcon icon={faExternalLinkAlt} /> Open
                            original
                          </Link>
                        </small>
                      </div>
                    )}
                    <div>
                      {loading ? (
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                      ) : !noPagination ? (
                        <small>
                          Page {current - currentStart + 1} /{' '}
                          {currentEnd - currentStart}
                        </small>
                      ) : (
                        <small>
                          Pages {currentStart + 1} to {currentEnd}
                        </small>
                      )}
                    </div>
                  </div>
                  {!noPagination && (
                    <button
                      onClick={onNext}
                      title={'Next page'}
                      disabled={noPagination || current === currentEnd - 1}
                    >
                      <FontAwesomeIcon icon={faStepForward} />
                    </button>
                  )}
                </div>
              )}

              {!noPagination ? (
                <Page
                  className="page"
                  pageNumber={current + 1}
                  width={contentRect.bounds.width}
                />
              ) : (
                range(currentStart, currentEnd).map((i) => (
                  <Page
                    className="page"
                    key={i}
                    pageNumber={i + 1}
                    width={contentRect.bounds.width}
                  />
                ))
              )}
            </Document>
          </div>
        )}
      </Measure>
    </DocumentContainer>
  );
};

export default Pdf;
