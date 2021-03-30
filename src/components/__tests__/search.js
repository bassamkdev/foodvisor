import * as React from 'react';
import { appRender, fireEvent } from "../../test/test-utils";
import { SearchBar } from "../search";
import { useSearch } from "../../context/search.context";

jest.mock("../../context/search.context")

test('should render search input and icon and submit search query ', () => {
    const inputText = 'VALUE'
    const iconA11yLable = 'ICON_LABEL'
    const mockHandleSubmit = jest.fn()
    useSearch.mockReturnValue({handleSubmit: mockHandleSubmit})

    const {getByA11yRole, getByA11yLabel} = appRender(<SearchBar iconA11yLabel={iconA11yLable}/>)

    expect(getByA11yLabel(iconA11yLable)).not.toBeNull()
    
    const input = getByA11yRole('search')
    fireEvent(input, 'submitEditing', {nativeEvent: {text: inputText }})

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
    expect(mockHandleSubmit).toHaveBeenCalledWith(inputText)
})
