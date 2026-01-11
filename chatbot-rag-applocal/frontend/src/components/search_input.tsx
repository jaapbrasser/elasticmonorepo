import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ReactComponent as RefreshIcon } from 'images/refresh_icon.svg'
import { ReactComponent as SearchIcon } from 'images/search_icon.svg'
import { ReactComponent as ArrowIcon } from 'images/arrow_icon.svg'
import { AppStatus } from 'store/provider'

export default function SearchInput({ onSearch, value, appStatus }) {
  const [query, setQuery] = useState<string>(value)
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!!query.length) {
      onSearch(query)
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value)

  useEffect(() => {
    setQuery(value)
  }, [value])

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="relative mt-1 flex w-full items-center h-14 gap-2">
        <input
          type="search"
          className={`hover:border-blue-400 outline-none focus-visible:border-blue-400 w-full h-14 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-md px-3 py-2.5 pl-12 text-base font-medium placeholder-slate-400 text-white ${
            appStatus === AppStatus.Idle ? 'pr-20' : 'pr-40'
          }`}
          value={query}
          onChange={handleChange}
          placeholder="What is on your mind?"
        />
        <span className="pointer-events-none absolute left-4">
          <SearchIcon />
        </span>
        {appStatus === AppStatus.Idle ? (
          <button
            className="hover:bg-blue-400 disabled:bg-blue-300/50 px-4 py-2 bg-blue-500/80 backdrop-blur-sm rounded-lg flex items-center absolute right-2 z-10 border border-white/20"
            type="submit"
            disabled={!query.length}
          >
            <ArrowIcon width={24} height={24} />
          </button>
        ) : (
          <button
            className="hover:bg-blue-400/80 hover:text-white px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex justify-center items-center text-blue-300 font-bold absolute right-2 z-10 border border-white/20"
            type="submit"
          >
            <span className="mr-2">
              <RefreshIcon width={24} height={24} />
            </span>
            Start over
          </button>
        )}
      </div>
    </form>
  )
}
