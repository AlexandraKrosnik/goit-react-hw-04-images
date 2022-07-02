import { useEffect, useState } from 'react';
import { useFirstMountState } from 'react-use';
import { Searchbar } from './Searchbar/Searchbar';
import * as API from '../data/API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  const isFirstMount = useFirstMountState();

  useEffect(() => {
    function fetchImages() {
      setIsLoading(true);
      setLoadMore(false);
      API.fetchImagesByQuery(value.replace(' ', '+'), page)
        .then(({ total, images: imagesArr }) => {
          if (total === 0) {
            setError(`По запиту ${value} світлин не знайдено!`);
            setImages([]);
          } else {
            setError(false);
            setTotalImages(total);
            setImages(prevImages => [...prevImages, ...imagesArr]);
          }
        })
        .catch(error => {
          if (!error) {
            setError('Щось пішло не так! Перевірте введені дані.');
            setLoadMore(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (isFirstMount) {
      return;
    }
    fetchImages();
  }, [page, value, isFirstMount]);

  useEffect(() => {
    scrollSmothly();
    setIsLoading(false);
    setLoadMore(images.length !== 0 && images.length !== totalImages);
  }, [images, totalImages]);

  const getDataOnRequest = query => {
    if (query !== value) {
      setValue(query);
      setPage(1);
      setImages([]);
    }
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderBody = () => {
    if (!!error) {
      return <p>{error}</p>;
    }
    if (!!images) {
      return <ImageGallery images={images} />;
    }
  };

  const scrollSmothly = () => {
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Searchbar onSubmit={getDataOnRequest} />
      {renderBody()}
      {isLoading && <Loader />}
      {loadMore && <Button onLoadMore={loadMoreImages} />}
    </>
  );
};
