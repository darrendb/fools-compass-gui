import React from "react"
import Readings from "../components/readings"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ readings, homepage }) => {
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
  const [readings, homepage] = await Promise.all([
    fetchAPI("/readings"),
    fetchAPI("/homepage"),
    // fetchAPI("/positions"),
    // fetchAPI("/spreads"),
  ])

  return {
    props: { readings, homepage },
    revalidate: 1,
  }
}

export default Home
