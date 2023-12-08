import { render, screen } from '@testing-library/react';
import TablePagination, { PaginationData } from '../components/TablePagination';

describe('TablePagination', () => {
  it('should only be active page button', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 1,
      pageCount: 1,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.queryByTestId('first-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('next-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('second-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('last-page-button')).not.toBeInTheDocument();
  });

  it('should only be active page and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 1,
      pageCount: 2,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.queryByTestId('first-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('next-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('second-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should only be first page and active page and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 2,
      pageCount: 3,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.getByTestId('first-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('next-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('second-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should only be active page and next page and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 1,
      pageCount: 3,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.queryByTestId('first-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('second-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should only be active page and next page and second ellipsis and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 1,
      pageCount: 4,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.queryByTestId('first-page-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('second-ellipsis-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should only be first page and active page and next page and second ellipsis and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 2,
      pageCount: 5,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.getByTestId('first-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prev-page-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('second-ellipsis-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should only be first page and prev page and active page and next page and second ellipsis and last page buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 3,
      pageCount: 6,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.getByTestId('first-page-button')).toBeInTheDocument();
    expect(screen.queryByTestId('first-ellipsis-button')).not.toBeInTheDocument();
    expect(screen.getByTestId('prev-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('second-ellipsis-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });

  it('should be all buttons', async () => {
    const loadData = jest.fn();
    const paginationData: PaginationData = {
      page: 4,
      pageCount: 7,
    };
    render(<TablePagination paginationData={paginationData} loadDataFn={loadData}/>);
    expect(screen.getByTestId('first-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('first-ellipsis-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('active-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-page-button')).toBeInTheDocument();
    expect(screen.getByTestId('second-ellipsis-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-page-button')).toBeInTheDocument();
  });
});
