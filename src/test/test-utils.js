import * as React from 'react'
import { render as rntlRender } from "@testing-library/react-native";
import {ThemeProvider} from '@emotion/react'
import { theme } from "../style";
import {QueryClient, QueryClientProvider, QueryCache} from 'react-query'

const queryCache = new QueryCache()
const queryClient = new QueryClient({queryCache})

function render(ui, options={}) {
    const Wrapper = ({children}) => {
        return (
            <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
            </QueryClientProvider>
        )
    }
    return rntlRender(ui, {wrapper: Wrapper, ...options})
}

export * from '@testing-library/react-native'
export {render}