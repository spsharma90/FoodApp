import styles from "./container.module.css";
export default function Container(props) {
  return <div className={styles.parentContainer}>{props.children}</div>;
}
