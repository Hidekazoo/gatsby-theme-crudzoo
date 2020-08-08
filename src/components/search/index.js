import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"

import { Root, HitsWrapper } from "./styles"
import Input from "./input"
import * as hitComps from "./hitcomps"
import { useOnClickOutside } from "./useOutSideClick"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0
      ? children
      : `'${state.query}' に該当する記事はありません `
)

const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} 件`
)

export default function Search({ indices, collapse, hitsAsGrid }) {
  const siteData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          algoliaSearch
        }
      }
    }
  `)
  const algoliaSearch = siteData.site.siteMetadata.algoliaSearch

  const ref = React.createRef(null)
  const [query, setQuery] = React.useState(``)
  const [focus, setFocus] = React.useState(false)
  let searchClient
  if (algoliaSearch) {
    searchClient = algoliasearch(
      process.env.GATSBY_ALGOLIA_APP_ID,
      process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
  }

  useOnClickOutside(ref, () => setFocus(false))

  return (
    <>
      {!algoliaSearch ? null : (
        <div ref={ref} style={{ position: "relative" }}>
          <InstantSearch
            searchClient={searchClient}
            indexName={indices[0].name}
            onSearchStateChange={({ query }) => setQuery(query)}
            root={{ Root, props: { ref } }}
          >
            <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
            <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
              {indices.map(({ name, title, hitComp }) => (
                <Index key={name} indexName={name}>
                  <header>
                    <h3>{title}</h3>
                    <Stats />
                  </header>
                  <Results>
                    <Hits
                      hitComponent={hitComps[hitComp](() => setFocus(false))}
                    />
                  </Results>
                </Index>
              ))}
            </HitsWrapper>
          </InstantSearch>
        </div>
      )}
    </>
  )
}
