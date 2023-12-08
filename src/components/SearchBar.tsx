import { QueryFilter } from "../api-request";

export interface UploadedData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function SearchBar({ loadDataFn }: { loadDataFn: (queryFilter: QueryFilter) => void }) {
  const handleChange = (e: any) => {
    return loadDataFn({ page: 1, search: e.target.value });
  }
  return (
    <input
      type="text"
      className="search-bar"
      onChange={handleChange}
      placeholder=" Search records by name and email here"
      data-testid="text-input">
    </input>
  );
}

export default SearchBar;