import React from "react"
import Readings from "../components/readings"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/core.css"
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { IonButton, IonDatetime } from '@ionic/react';

const Home = ({ readings, homepage }) => {
  return (
    <Layout readings={readings} >
      <Seo seo={homepage.seo} />
      <IonDatetime displayFormat="MM/DD/YYYY" placeholder="Select Date"></IonDatetime>
      <IonButton fill="clear">Start</IonButton>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>? {homepage.hero.title}</h1>
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
