import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';

const Feed = ({ pageNumber, articles }) => {
  const router = useRouter();

  const handlePrev = () => {
    if (pageNumber > 1) {
      router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0));
    }

    return;
  };

  const handleNext = () => {
    if (pageNumber < 5) {
      router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0));
    }

    return;
  };

  return (
    <>
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>
              {article.title}
            </h1>
            <p>{article.description}</p>
            {!!article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          className={pageNumber === 1 ? styles.disabled : styles.active}
          onClick={handlePrev}
        >
          Previous page
        </div>
        <div># {pageNumber.toString()}</div>
        <div
          className={pageNumber === 5 ? styles.disabled : styles.active}
          onClick={handleNext}
        >
          Next page
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.id;

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );
  const data = await res.json();
  const { articles } = data;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    },
  };
};

export default Feed;
