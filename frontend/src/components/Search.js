import React, { useState } from "react";

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the data based on the search term
  //   const filteredData = data.filter((item) =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Blog..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <ul>
        {filteredData.map((item, index) => (
          <li key={index} style={{ padding: "10px 0" }}>
            {item.title}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default SearchBar;

// // Example usage of the SearchBar component
// const App = () => {
//   const blogPosts = [
//     { title: "React Basics" },
//     { title: "Understanding JavaScript" },
//     { title: "Advanced CSS Techniques" },
//     { title: "Learning Python" },
//     { title: "Web Development Trends" },
//   ];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Blog Posts</h1>
//       <SearchBar data={blogPosts} />
//     </div>
//   );
// };

// export default App;
