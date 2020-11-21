import React from 'react';
import './App.css';

const BookDetails = ({values, index}) => {
  if(values === null) return null;
  const {title, thumbnail, infoLink, authors, categories, pageCount, publishedDate, language} = values;
  return (
    <div className="img-box">
      <div><a href={infoLink}><img src={thumbnail} alt="Thumbnail"/></a></div>
      <div className={index % 2 ? "abs-box abs-2" : "abs-box abs-1"}>
        <div className="info">
          <p><span>Title:</span>{title}</p>
          <p><span>Authors:</span>{authors}</p>
          <p><span>Categories:</span>{categories}</p>
          <p><span>Page Count:</span>{pageCount}</p>
          <p><span>Published Date:</span>{publishedDate}</p>
          <p><span>Language:</span>{language}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;