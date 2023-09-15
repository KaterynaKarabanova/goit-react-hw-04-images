import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import axios from 'axios';
import React, { Component } from 'react';
export class App extends Component {
  state = {
    currentData: [],
    currentPage: 1,
    total: 0,
    loading: false,
    currentImg: '',
    modalOpen: false,
    toSearch: '',
  };
  componentDidUpdate(_, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.toSearch !== this.state.toSearch
    ) {
      this.getData(this.state.toSearch);
    }
  }
  async getData(value) {
    this.setState({ loading: true });
    try {
      const data = await axios.get(
        `https://pixabay.com/api/?q=cat&page=${this.state.currentPage}&key=39007131-7339e45b97efcc367872ff842&image_type=photo&orientation=horizontal&per_page=12&q=${value}`
      );
      this.setState({
        total: data.data.total,
      });
      this.setState(prevState => ({
        currentData: [...prevState.currentData, ...data.data.hits],
      }));
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      this.setState({ loading: false });
    }
  }
  loadMore = e => {
    e.preventDefault();
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ currentPage: 1 });
    const value = e.target.elements.search.value;
    this.setState({ toSearch: value, currentPage: 1, currentData: [] });
    e.target.reset();
  };
  toggleModal = largeImageURL => {
    if (largeImageURL) {
      this.setState({ currentImg: largeImageURL });
    }
    this.setState(({ modalOpen }) => ({ modalOpen: !modalOpen }));
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.currentData && (
          <ImageGallery
            gallery={this.state.currentData}
            toggleModal={this.toggleModal}
          />
        )}

        {this.state.loading && <Loader />}

        {this.state.currentData?.length > 0 &&
          this.state.total / 12 > this.state.currentPage && (
            <LoadMore loadMore={this.loadMore} />
          )}
        {this.state.modalOpen && (
          <Modal
            currentImg={this.state.currentImg}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
