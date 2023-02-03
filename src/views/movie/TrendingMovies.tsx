import { Container, Pagination } from '@app/components/common';
import { MovieList } from '@app/components/main';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchTrendingMovies } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TrendingMovies = () => {
  const { trendingMovies, isLoading } = useSelector((state: IRootState) => ({
    trendingMovies: state.movies.trending,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();

  useDocumentTitle('Trending Movies | MOVX');
  useEffect(() => {
    if (!trendingMovies) {
      dispatch(fetchTrendingMovies(currentPage));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trendingMovies?.page]);

  const handlePageChange = (page: number) => {
    if (trendingMovies?.page !== page && !isLoading) {
      dispatch(fetchTrendingMovies(page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={trendingMovies?.results || []}
        templateCount={10}
      />
      {trendingMovies && (
        <Pagination
          activePage={trendingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={trendingMovies.total_pages}
          totalPage={trendingMovies.total_pages}
        />
      )}
    </Container>
  );
};

export default TrendingMovies;
