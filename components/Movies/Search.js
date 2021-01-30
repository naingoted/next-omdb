import React, { useState, useRef } from "react";

const Search = React.memo(({ onSetTitle, placeholder }) => {
  const [enteredFilter, setEnteredFilter] = useState(placeholder);
  const inputRef = useRef();
  console.log("RENDERING Search");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSetTitle(enteredFilter);
    } else if (e.key === "Escape") {
      setEnteredFilter("");
      inputRef && inputRef.current.focus();
    }
  };
  return (
    <section className="search">
      <div className="search-input">
        <span className="search-icon">
          <img src="/images/loupe.svg" alt="" />
        </span>
        <input
          data-testid="input-box"
          className="input input--title"
          placeholder="Search Movies"
          ref={inputRef}
          type="text"
          value={enteredFilter}
          onChange={(event) => setEnteredFilter(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  );
});

export default Search;
