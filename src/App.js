import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/hiclipart.png';
import Axios from 'axios';
import BookDetails from './BookDetails.js';

function App() {
  const [name, setName] = useState("");
  const [maxResults, setMaxResults] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [list, setList] = useState([]);
	
  useEffect(() => {
    if(name) {
      Axios
        .get(`https://www.googleapis.com/books/v1/volumes?
					q=${name}&maxResults=${maxResults}&startIndex=${startIndex}`)
        .then(result => setList(result.data.items));
    }
  }, [name, maxResults, startIndex]);
	
  const valuesContainer = list.map((book, index) => {
    const values = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      categories: book.volumeInfo.categories,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      infoLink: book.volumeInfo.infoLink,
      language: book.volumeInfo.language,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate
    };
    return values;
  });
	
	const customStyle = {
		fontSize: "16px",
		color: "#fff",
		left: "50%",
		top: "0",
		transform: "translateX(-50%)"
	}

  var mapResult = [];
  for(let p = 0; p < list.length - 1; p += 2) {
    mapResult.push(
      <div className="parallel-div">
        <BookDetails
					values={valuesContainer[p]}
					index={p}
					key={p}
				/>
        <BookDetails
					values={valuesContainer[p + 1]}
					index={p + 1}
					key={p + 1}
				/>
      </div>
    )
  }

  if(list.length % 2) {
    mapResult.push(
      <div className="parallel-div">
        <BookDetails
					values={valuesContainer[mapResult.length]}
					index={list.length}
					key={list.length}
				/>
      </div>
    );
  }

  return (
    <div className="App">
    	<div className="container"></div>
      <div className="heading">
        <img src={logo} alt="logo"/>
        <span>Book Finder</span>
      </div>
      <div className="input-group">
      	<div class="placeholder">
					<input
						value={name}
						type="text"
						onChange={e => setName(e.target.value)}
					/>
					<label style={name ? customStyle : null}>Search books</label>
      	</div>
      	<div class="placeholder">
					<input
						type="number"
						min="1"
						max="40"
						value={maxResults}
						onChange={e => setMaxResults(e.target.value)}
					/>
					<label style={maxResults ? customStyle : null}>Show items per page</label>
      	</div>
      	<div class="placeholder paging">
      		<div class="button-grp">
						<button
							class="back"
							disabled={startIndex <= 0}
							onClick={() => setStartIndex(startIndex - 1)}
						>
							Back
						</button>
						<button
							class="next"
							onClick={() => setStartIndex(startIndex + 1)}
						>
							Next
						</button>
					</div>
				</div>
      </div>
      <div className="gallery">
        {name ? mapResult : null}        
      </div>
    </div>
  );
}

export default App;