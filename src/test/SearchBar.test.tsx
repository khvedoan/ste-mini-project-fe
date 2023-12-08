import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('should have data displayed', async () => {
    const loadData = jest.fn();
    render(<SearchBar loadDataFn={loadData}/>);
    const textInput = screen.getByTestId('text-input');
    fireEvent.change(textInput, { target: { value: "random text" } });
    expect(loadData).toHaveBeenCalled();
  });
});
