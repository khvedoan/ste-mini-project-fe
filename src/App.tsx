import { useEffect, useRef, useState } from 'react';
import './App.css';
import DataTable from './components/DataTable';
import FileUploader from './components/FileUploader';
import TablePagination, { PaginationData } from './components/TablePagination';
import SearchBar from './components/SearchBar';
import request, { QueryFilter, UploadedData, UploadedDataList } from './api-request';

function App() {
  const [data, setData] = useState<UploadedData[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [paginationData, setPaginationData] = useState<PaginationData>({ page: 1, pageCount: 1 });
  const firstTimeLoad = useRef(0);

  const loadData = (queryFilter: QueryFilter) => {
    const { page, search, limit } = queryFilter;
    request<UploadedDataList>({
      method: "GET",
      url: "uploaded-records",
      params: {
        limit: limit || pageSize,
        page,
        ...search ? { search } : {},
      }
    }).then((res) => {
      const { status, data } = res;
      if (status === 200) {
        setData(data.data);
        setPaginationData({ page, pageCount: data.pageCount });
      } else {
        alert("Data fetch failed.");
        console.log(res);
      }
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    });
  }
  const handlePageSizeChange = (e: any) => {
    setPageSize(e.target.value);
    return loadData({ page: 1, limit: e.target.value})
  };
  useEffect(() => {
    if (!firstTimeLoad.current) {
      firstTimeLoad.current = 1;
      return loadData({ page: 1, limit: pageSize});
    }
  });

  return (
    <div className="App">
      <div className='form-container' data-testid="file-uploader">
        <FileUploader loadDataFn={loadData}/>
      </div>

      {
        data.length ?
          <div className='search-bar-container' data-testid="search-bar">
            <SearchBar loadDataFn={loadData}/>
          </div> :
          <div></div>
      }

      {
        data.length ?
          <div className='page-size-container' data-testid="page-size">
            <label>Items per page:</label>
            <select value={pageSize} onChange={handlePageSizeChange}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div> :
          <div></div>
      }
      
      {
        data.length ?
          <div className='data-container' data-testid="data-table">
            <DataTable tableData={data}/>
          </div> :
          <div></div>
      }

      {
        data.length ?
        <div className='pagination-container' data-testid="table-pagination">
          <TablePagination paginationData={paginationData} loadDataFn={loadData}/>
        </div> :
        <div></div>
      }
    </div>
  );
}

export default App;
