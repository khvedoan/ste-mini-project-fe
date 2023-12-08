import { fireEvent, render, screen, within } from '@testing-library/react';
import FileUploader from '../components/FileUploader';

describe('FileUploader', () => {
  it('should alert with unsupported file message', async () => {
    const loadData = jest.fn();
    render(<FileUploader loadDataFn={loadData}/>);
    const fileInput = screen.getByTestId('file-input');
    const textFile = new File(['test file content'], 'test.txt', {
        type: 'text/plain',
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.change(fileInput, { target: { files: [textFile] } });
    expect(window.alert).toBeCalledWith("Only csv files are supported.");
  });

  it('should show upload progress bar', async () => {
    const loadData = jest.fn();
    render(<FileUploader loadDataFn={loadData}/>);
    const fileInput = screen.getByTestId('file-input');
    const csvFile = new File(['test file content'], 'test.csv', {
        type: 'text/csv',
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.change(fileInput, { target: { files: [csvFile] } });
    expect(window.alert).not.toBeCalled();
    const { getByText } = within(screen.getByTestId('progress-bar'));
    expect(getByText('0%')).toBeInTheDocument();
  });

  it('should alert when the form is submitted with no files', async () => {
    const loadData = jest.fn();
    render(<FileUploader loadDataFn={loadData}/>);
    const fileInput = screen.getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [] } });

    const submitButton = screen.getByTestId('submit-button');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(submitButton);
    expect(window.alert).toBeCalledWith("Please select a csv file to upload.");
  });

  it('should not alert when the form is submitted with a file', async () => {
    const loadData = jest.fn();
    render(<FileUploader loadDataFn={loadData}/>);
    const fileInput = screen.getByTestId('file-input');
    const csvFile = new File(['test file content'], 'test.csv', {
        type: 'text/csv',
    });
    fireEvent.change(fileInput, { target: { files: [csvFile] } });

    const submitButton = screen.getByTestId('submit-button');
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    fireEvent.click(submitButton);
    expect(window.alert).not.toBeCalledWith();
  });
});
