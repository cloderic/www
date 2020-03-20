import React, { useCallback, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import range from 'lodash.range';
import debounce from 'lodash.debounce';
import styled from '@emotion/styled';
import Measure from 'react-measure';

const PdfContainer = styled.div`
  .document {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: stretch;
  }
  .page {
    margin: 0.5rem;
  }
`;

const Pdf = ({ src }) => {
  const [width, setWidth] = useState(undefined);
  const [numPages, setNumPages] = useState(0);
  const onDocumentLoaded = useCallback(
    ({ numPages }) => setNumPages(numPages),
    [setNumPages]
  );
  const onResize = useCallback(
    debounce(
      (contentRect) => setWidth(Math.min(800, contentRect.bounds.width)),
      500
    ),
    [setWidth]
  );
  return (
    <Measure bounds onResize={onResize}>
      {({ measureRef }) => (
        <PdfContainer ref={measureRef}>
          <Document
            className="document"
            file={src}
            onLoadSuccess={onDocumentLoaded}
          >
            {!width
              ? []
              : range(numPages).map((i) => (
                  <Page
                    className="page"
                    key={i}
                    pageNumber={i + 1}
                    width={width}
                  />
                ))}
          </Document>
        </PdfContainer>
      )}
    </Measure>
  );
};

export default Pdf;
