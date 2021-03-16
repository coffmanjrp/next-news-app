import styles from '../styles/EOM.module.css';

const EOM = ({ employee }) => {
  return (
    <div className="page-container">
      <div className={styles.main}>
        <h1>Employee Of The Month</h1>
        <div className={styles.eom}>
          <h3>{employee.name}</h3>
          <h6>{employee.position}</h6>
          <img src={employee.image} alt={employee.name} />
          <p>{employee.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const res = await fetch(
    'https://my-json-server.typicode.com/coffmanjrp/next-news-app/employeeOfTheMonth'
  );
  const data = await res.json();

  return {
    props: {
      employee: data,
    },
  };
};

export default EOM;
