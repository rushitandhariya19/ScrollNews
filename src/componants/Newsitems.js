import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import img from './default-image.jpg';
import PropTypes from 'prop-types';

export default function Newsitems({ category, country, setProgress, query, countryFull }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchNews = useCallback(async (pageToFetch) => {
    setProgress(30);
    const url = query
      ? `https://newsapi.org/v2/everything?apiKey=bac018d99b064d6688fcfa81cd97623c&q=${query}&pageSize=6&page=${pageToFetch}`
      : `https://newsapi.org/v2/top-headlines?apiKey=bac018d99b064d6688fcfa81cd97623c&category=${category}&country=${country}&pageSize=6&page=${pageToFetch}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setArticles((prev) => pageToFetch === 1 ? data.articles : [...prev, ...data.articles]);
      setTotalResults(data.totalResults);
      setPage(pageToFetch);
      setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }, [category, country, query, setProgress]);

  useEffect(() => {
    setPage(1);
    fetchNews(1);
  }, [category, country, query, fetchNews]);

  return (
    <div className="container">
      <div className="my-container">
        <h3>
          {query
            ? `Search Results for "${query}"`
            : `Showing News for ${category.charAt(0).toUpperCase() + category.slice(1)} in ${countryFull}`}
        </h3>

        <InfiniteScroll
          dataLength={articles.length}
          next={() => fetchNews(page + 1)}
          hasMore={articles.length < totalResults}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all!</b>
            </p>
          }
        >
          <div className="row">
            {articles.map((news, index) => (
              <div className="col-md-4 mb-5" key={index}>
                <div className="card h-100">
                  <img
                    src={news.urlToImage || img}
                    className="card-img-top"
                    alt="news"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <p><strong>Author:</strong> {news.author || 'Unknown'}</p>
                    <p><strong>Published:</strong> {new Date(news.publishedAt).toDateString()}</p>
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text">{news.description || news.title}</p>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary mt-auto"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}

Newsitems.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  query: PropTypes.string,
  countryFull: PropTypes.string
};

Newsitems.defaultProps = {
  country: 'us',
  category: 'general',
  query: '',
  countryFull: 'US'
};