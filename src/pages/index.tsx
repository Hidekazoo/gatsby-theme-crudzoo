import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import Bio from '../components/bio'
import SEO from '../components/seo'
interface IProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
      }
    }
  }
}

const TopPage: React.FC<IProps> = ({ data }) => (
  <Layout>
    <SEO
      title="CrudZoo"
      keywords={["blog", "gatsby"]}
    />
    <Bio />
    <h1>{data.site.siteMetadata.title}</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </Layout>
)

export default TopPage;

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`