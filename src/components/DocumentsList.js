// components/DocumentsList.js

// Either as a default export:
const DocumentsList = ({documents}) => {
  return (
    <ul>
      {documents.map((doc) => (
        <li key={doc.Id}>{doc.Title}</li>
      ))}
    </ul>
  );
};

export default DocumentsList;


