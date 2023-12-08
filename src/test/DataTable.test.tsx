import { render, screen, within } from '@testing-library/react';
import { UploadedData } from '../api-request';
import DataTable from '../components/DataTable';

describe('DataTable', () => {
  it('should have data displayed', async () => {
    const data: UploadedData[] = [{
      id: "id1",
      postId: 1,
      recordId: 1,
      name: "displayed name",
      email: "email",
      body: "body"
    }];
    render(<DataTable tableData={data}/>);
    const { getByText } = within(screen.getByTestId('table-body'));
    expect(getByText('displayed name')).toBeInTheDocument();
  });
});
