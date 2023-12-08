import { QueryFilter } from "../api-request";

export interface PaginationData {
  page: number;
  pageCount: number;
}

function TablePagination(
  { paginationData, loadDataFn }: {
    paginationData: PaginationData,
    loadDataFn: (queryFilter: QueryFilter) => void
  }) {
  const { page: activePage, pageCount: lastPage } = paginationData;

  return (
    <div className="pagination-box">
      {
        activePage > 1 &&
        <a href="#" onClick={() => loadDataFn({ page: 1 })} data-testid="first-page-button">1</a>
      }
      {
        activePage - 1 > 2 &&
        <a data-testid="first-ellipsis-button">...</a>
      }

      {
        activePage - 1 > 1 &&
        <a href="#" onClick={() => loadDataFn({ page: activePage - 1 })} data-testid="prev-page-button">
          {activePage - 1}
        </a>
      }

      <a href="#" className="active" data-testid="active-page-button">{activePage}</a>

      {
        lastPage - activePage > 1 &&
        <a href="#" onClick={() => loadDataFn({ page: activePage + 1 })} data-testid="next-page-button">
          {activePage + 1}
        </a>
      }

      {
        lastPage - activePage > 2 &&
        <a data-testid="second-ellipsis-button">...</a>
      }

      {
        lastPage - activePage >= 1 &&
        <a href="#" onClick={() => loadDataFn({ page: lastPage })} data-testid="last-page-button">{lastPage}</a>
      }
    </div>
  );
}

export default TablePagination;