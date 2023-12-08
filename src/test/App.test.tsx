import { render, screen, } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('App', () => {
  it('should have no data displayed', async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.request.mockResolvedValue({
      status: 200,
      data: {
        data: [],
        page: 1,
        pageCount: 1,
        pageSize: 10,
      }
    });
    render(<App />);
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-size')).not.toBeInTheDocument();
    expect(screen.queryByTestId('data-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('search-bar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('table-pagination')).not.toBeInTheDocument();
  });

  it('should have uploaded data displayed', async () => {
    jest.spyOn(axios, 'get').mockImplementation();
    mockedAxios.create.mockReturnThis();
    mockedAxios.request.mockResolvedValue({
      status: 200,
      data: {
        data: [{
          id: "id1",
          postId: 1,
          recordId: 1,
          name: "displayed name",
          email: "email",
          body: "body"
        }],
        page: 1,
        pageCount: 1,
        pageSize: 10,
      }
    });
    render(<App />);
    expect(axios.request).toHaveBeenCalled();
    await new Promise(res => setTimeout(res, 2000));
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('page-size')).toBeInTheDocument();
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getByTestId('search-bar')).toBeInTheDocument();
    expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
  });
});
