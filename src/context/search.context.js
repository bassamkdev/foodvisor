import * as React from 'react'

const SearchContext = React.createContext()

function SearchProvider(props) {
  const [keyword, setKeyword] = React.useState('san francisco')

  const handleSubmit = React.useCallback(query => {
    setKeyword(query.toLowerCase())
  }, [])

  const value = React.useMemo(() => ({keyword, handleSubmit}), [
    handleSubmit,
    keyword,
  ])

  return <SearchContext.Provider value={value} {...props} />
}

function useSearch() {
  const context = React.useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

export {SearchProvider, useSearch}
