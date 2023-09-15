import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentImg, setCurrentImg] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [toSearch, setToSearch] = useState('');

  useEffect(() => {
    if (toSearch) {
      getData(toSearch, currentPage); // Pass currentPage to getData
    }
  }, [currentPage, toSearch]); // Update dependencies

  async function getData(value, page) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${value}&page=${page}&key=39007131-7339e45b97efcc367872ff842&image_type=photo&orientation=horizontal&per_page=12`
      );
      setTotal(data.total);
      setCurrentData(prev => [...prev, ...data.hits]);
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const onSubmit = e => {
    e.preventDefault();
    setCurrentPage(1);
    const { value } = e.target.elements.search;
    setToSearch(value);
    setCurrentData([]);
    // No need to reset the form here
  };

  const toggleModal = largeImageURL => {
    if (largeImageURL) {
      setCurrentImg(largeImageURL);
    }
    setModalOpen(prev => !prev);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {currentData.length > 0 && (
        <ImageGallery gallery={currentData} toggleModal={toggleModal} />
      )}

      {loading && <Loader />}

      {currentData.length > 0 && total / 12 > currentPage && (
        <LoadMore loadMore={loadMore} />
      )}

      {modalOpen && (
        <Modal
          currentImg={currentImg}
          toggleModal={toggleModal}
          modalOpen={modalOpen}
        />
      )}
    </div>
  );
};
