import Head from "next/head";
import Image from "next/image";

import styles from "../styles/Home.module.css";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeStoresData from "../data/coffee-stores.json";

export async function getStaticProps() {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props) {
  const handleOnClick = () => {
    console.log("clicked");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnClick} />
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto coffee stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                const { name, imgUrl, id, websiteUrl } = coffeeStore;
                return (
                  <Card
                    key={id}
                    name={name}
                    imgUrl={imgUrl}
                    href={`/coffee-store/${id}`}
                    websiteUrl={websiteUrl}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
