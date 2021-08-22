import React from "react"
import Readings from "../components/readings"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ homepage, readings }) => {
  return (
    <Layout readings={readings} >
      <Seo seo={homepage.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.hero.title}</h1>
          <Readings readings={readings} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepage, positions, spreads, readings] = await Promise.all([
    fetchAPI("/homepage"),
    fetchAPI("/positions"),
    fetchAPI("/spreads"),
    fetchAPI("/readings"),
  ])

  return {
    props: { homepage, positions, spreads, readings },
    revalidate: 1,
  }
}

export default Home
