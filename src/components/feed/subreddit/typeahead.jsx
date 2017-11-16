  import React from 'react'

  export default const Typeahead = results => {
    if (results.length) {
      return (
        <ul className={"typeahead"} >
          {results.map((sub, idx) => 
          <li key={`${sub + idx}`} data={sub}>
            {sub}
          </li>)}
        </ul>
      );
    }
  }