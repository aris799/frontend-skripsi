import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer'; 
import '../styles/Bookmark.css';  

const LocalStorageManager = {
  getBookmarks: () => {
    try {
      const savedBookmarks = localStorage.getItem('bookmarks');
      return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    } catch (error) {
      console.error('Error parsing bookmarks:', error);
      return [];
    }
  },
  
  saveBookmarks: (bookmarks) => {
    try {
      const sanitizedBookmarks = bookmarks.map(bookmark => ({
        judul: bookmark.judul || '',
        penulis: bookmark.penulis || '',
        tahun: bookmark.tahun || '',
        abstrak: bookmark.abstrak || ''
      }));

      const limitedBookmarks = sanitizedBookmarks.slice(-50);
      
      localStorage.setItem('bookmarks', JSON.stringify(limitedBookmarks));
      return limitedBookmarks;
    } catch (error) {
      console.error('Error saving bookmarks:', error);
      return bookmarks;
    }
  }
};

const Bookmark = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(bookmarks.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedBookmarks = bookmarks.slice(startIndex, endIndex);

    return {
      totalPages,
      paginatedBookmarks
    };
  }, [bookmarks, currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    const savedBookmarks = LocalStorageManager.getBookmarks();
    setBookmarks(savedBookmarks);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRemoveBookmark = (thesisToRemove) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.judul !== thesisToRemove.judul
    );
    
    const savedBookmarks = LocalStorageManager.saveBookmarks(updatedBookmarks);
    setBookmarks(savedBookmarks);

    const newTotalPages = Math.ceil(savedBookmarks.length / ITEMS_PER_PAGE);
    if (currentPage > newTotalPages) {
      setCurrentPage(Math.max(1, newTotalPages));
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  return (
    <div className="bookmark-page">
      <Header />
      
      <div className="bookmark-header-container">
        <div className="back-button">
          <button onClick={handleBack} className="back-button-style">
            <img 
              src="https://res.cloudinary.com/diogvlobw/image/upload/v1762320371/back_e45dbs.svg" 
              alt="Back" 
            />
          </button>
        </div>
        <h1 className="bookmark-title">Bookmark Skripsi</h1>
      </div>

      <div className="bookmark-content-container">
        {bookmarks.length === 0 ? (
          <div className="no-bookmarks">
            <p>Belum ada skripsi yang di-bookmark</p>
          </div>
        ) : (
          <div className="results-list">
            {paginationData.paginatedBookmarks.map((thesis, index) => (
              <div key={`${thesis.judul}-${index}`} className="thesis-card">
                <div className="thesis-card-header">
                  <h3 className="thesis-title">{thesis.judul}</h3>
                  {/* Kembalikan icon bookmark persis seperti sebelumnya */}
                  <img 
                    src="https://res.cloudinary.com/diogvlobw/image/upload/v1762702266/bookmark-black_wrrkzl.svg"
                    alt="Remove Bookmark" 
                    className="bookmark-icon"
                    onClick={() => handleRemoveBookmark(thesis)}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      position: 'absolute',
                      top: '10px',
                      right: '10px'
                    }}
                  />
                </div>
                <div className="thesis-meta">
                  <div className="author">
                    <img 
                      src="https://res.cloudinary.com/diogvlobw/image/upload/v1762664218/user_dehlla.svg" 
                      alt="Penulis Icon" 
                      className="icon" 
                    />
                    <p 
                      className="author-name" 
                      style={{ marginTop: '13px' }}
                    >
                      {thesis.penulis}
                    </p>
                  </div>
                  <div className="year">
                    <img 
                      src="https://res.cloudinary.com/diogvlobw/image/upload/v1762664201/calendar_1_xpism5.svg" 
                      alt="Year Icon" 
                      className="icon" 
                    />
                    <span>{thesis.tahun}</span>
                  </div>
                </div>
                <p className="thesis-abstract">{thesis.abstrak}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {paginationData.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            {'<'} Previous
          </button>
          <span>{currentPage} of {paginationData.totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === paginationData.totalPages}
            className="pagination-btn"
          >
            Next {'>'}
          </button>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Bookmark;
