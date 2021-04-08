import * as React from 'react'
import { render } from "@testing-library/react-native";
import {ThemeProvider} from '@emotion/react'
import { theme } from "../style";
import {QueryClient, QueryClientProvider, QueryCache} from 'react-query'
import { NavigationContainer } from "@react-navigation/native";
import { SearchProvider } from "../context/search.context";



const queryCache = new QueryCache()
const queryClient = new QueryClient({queryCache})

function authRender(ui, options={}) {
    const Wrapper = ({children}) => {
        return (
            <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
            </QueryClientProvider>
        )
    }
    return render(ui, {wrapper: Wrapper, ...options})
}

function themedRender(ui, options={}) {
    const Wrapper = ({children}) => {
        return (
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        )
    }
    return render(ui, {wrapper: Wrapper, ...options})
}

function appRender(ui, options={}) {
   
        const Wrapper = ({children}) => {
            return (
                <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                <SearchProvider>
                <NavigationContainer>
                    {children}
                </NavigationContainer>
                </SearchProvider>
                </ThemeProvider>
            </QueryClientProvider>
            )
        }
        return render(ui, {wrapper: Wrapper, ...options})
}



export * from '@testing-library/react-native'
export {authRender, appRender, themedRender, queryCache}