import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `../assets/files/pdf.worker.js`;

function PDFViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  const downloadLink = useRef(null);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const downloadPDF = () => {
    let linkElement = downloadLink.current;
    linkElement.click();
  };

  const { pdf } = props;

  return (
    <div className="w-full h-full flex justify-start flex-col items-center">
      <a ref={downloadLink} href={pdf} download className="d-none"></a>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="mb-3">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <span className="flex justify-center items-center">
          <button
            style={{ marginRight: 10 }}
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            style={{ marginRight: 10 }}
          >
            Next
          </button>
          <DownloadIcon
            onClick={() => {
              downloadPDF();
            }}
            className="cursor-pointer h-4 w-4"
          />
        </span>
      </div>

      {/* <div className="fixed w-full h-full items-center justify-between"> */}
      {/* <ChevronLeftIcon /> */}
      {/* <ChevronRightIcon /> */}
    </div>
    // </div>
  );
}
export default PDFViewer;
