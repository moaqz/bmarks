import styles from "./home.module.css";
import { FEATURES } from "~/constants/features";

export default function HomeView() {
  return (
    <main className={`${styles.content} container`}>
      <div className={styles.hero}>
        <span className={styles.badge}>beta</span>
        <h1>bmarks</h1>
        <p>Simple bookmark manager to organize your favorites websites</p>
      </div>

      <section className={styles.features}>
        <h2>Features</h2>

        {FEATURES.map(feature => (
          <div key={feature.iconName} className={styles.feature}>
            <div className={styles.icon}>
              <svg width="20" height="20">
                <use href={`/icons/features.svg#${feature.iconName}`} />
              </svg>
            </div>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
