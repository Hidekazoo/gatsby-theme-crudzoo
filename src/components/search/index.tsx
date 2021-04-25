import algoliasearch from "algoliasearch/lite"
import React, { ReactNode } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"

import { PostHit } from "./hitcomps"
import Input from "./input"
import { useOnClickOutside } from "./useOutSideClick"

const StateResults: React.FC = ({
  searchState: state,
  searchResults: res,
  children,
}: any) => {
  return res && res.nbHits > 0 ? children : `No results for '${state.query}'`
}

const StatsResults: React.FC = ({ searchResults: res }: any) => {
  return res && res.nbHits > 0 && `${res.nbHits} posts`
}

const Results = connectStateResults(StateResults)

const Stats = connectStateResults(StatsResults)

export default function Search({ indices, collapse, hitsAsGrid }: any) {
  const algoliaSearch = process.env.GATSBY_USE_ALGOLIA

  const ref = React.createRef<HTMLDivElement>()
  const [query, setQuery] = React.useState(``)
  const [focus, setFocus] = React.useState(false)
  let searchClient
  if (algoliaSearch) {
    searchClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID!,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY!
    )
  }

  useOnClickOutside(ref, () => setFocus(false))

  const HitsWrapper = (props: { show: boolean; children: ReactNode }) => {
    const { show, children } = props
    if (!show) return null
    return <div className="hits-wrapper">{children}</div>
  }
  return (
    <>
      {!algoliaSearch ? null : (
        <div ref={ref} style={{ position: "relative" }}>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
          >
            <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
            <HitsWrapper show={query.length > 0 && focus}>
              {indices.map(
                ({
                  name,
                  title,
                }: {
                  name: string
                  title: string
                  hitComp: any
                }) => (
                  <Index key={name} indexName={name}>
                    <header>
                      <h3>{title}</h3>
                      <Stats />
                    </header>
                    <Results>
                      <Hits hitComponent={PostHit(() => setFocus(false))} />
                    </Results>
                  </Index>
                )
              )}
            </HitsWrapper>
          </InstantSearch>
        </div>
      )}
    </>
  )
}
