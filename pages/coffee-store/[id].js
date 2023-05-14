import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";
import { fetchCoffeeStores } from "lib/coffee-stores";
import { useContext, useEffect, useState } from "react"; 
import { StoreContext } from "context/store-context";
import { isEmpty } from "utils";
 
export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStoreData = await fetchCoffeeStores();

  const findCoffeeSotreById = coffeeStoreData.find((coffeeStore) => {
    return coffeeStore.id.toString() === params.id; //synamic Id
  });

  return {
    props: {
      coffeeStore: findCoffeeSotreById ? findCoffeeSotreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStoreData = await fetchCoffeeStores();
  const paths = coffeeStoreData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id?.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { state: {coffeeStores} } = useContext(StoreContext);

  const id = router.query.id;

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

  useEffect(() => {
    if (!(initialProps.CoffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeSotreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id;
        });
        setCoffeeStore(findCoffeeSotreById);
      }
    }
  }, [id]);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const handleUpvoteButton = () => {
    console.log("Up vote!");
    return;
  };

  
  const { name, adress, neighborhood, imgUrl } = coffeeStore;
  console.log(coffeeStore);

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl || "/static/images/image-not-found.png"}
            width={600}
            height={360}
            alt="Coffee-store img"
          ></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="icon"
            />
            <p className={styles.text}>{adress}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width={24}
                height={24}
                alt="icon"
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="icon"
            />
            <p className={styles.text}>1</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
