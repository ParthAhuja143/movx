import { Container, Pagination } from '@app/components/common';
import { MovieList } from '@app/components/main';
import { numberWithCommas } from '@app/helpers/helperFunctions';
import { useDocumentTitle, usePageSaver } from '@app/hooks';
import { fetchUpcomingMovies } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UpcomingMovies = () => {
  const { upcomingMovies, isLoading } = useSelector((state: IRootState) => ({
    upcomingMovies: state.movies.upcoming,
    isLoading: state.misc.isLoading,
  }));
  const { currentPage, setCurrentPage } = usePageSaver();
  const dispatch = useDispatch();
  const queryString = '/movie/upcoming';

  useDocumentTitle('Upcoming Movies | MOVX');
  useEffect(() => {
    if (!upcomingMovies) {
      dispatch(fetchUpcomingMovies(currentPage));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [upcomingMovies?.page]);

  const handlePageChange = (page: number) => {
    if (upcomingMovies?.page !== page && !isLoading) {
      dispatch(fetchUpcomingMovies(page));
      setCurrentPage(page)
    }
  };

  return (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies?.total_results || 0)} Movies</h3>
        </div>
      </div>
      <MovieList
        movies={upcomingMovies?.results || []}
        templateCount={10}
      />
      {upcomingMovies && (
        <Pagination
          activePage={upcomingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={upcomingMovies.total_pages}
          totalPage={upcomingMovies.total_pages}
        />
      )}
    </Container>
  );
};

export default UpcomingMovies;
