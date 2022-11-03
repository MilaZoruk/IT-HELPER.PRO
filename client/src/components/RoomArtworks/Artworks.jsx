import React, { useEffect, useState } from 'react';

export default function Artworks() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [image, setImage] = useState('');

  useEffect(() => {
    async function getBook() {
      const resp = await fetch(
        'https://api.artic.edu/api/v1/artworks?limit=5',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await resp.json();
      console.log(result);
      setItems(result.data);
      setImage(result.config);
    }
    getBook();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <ul>
      {items.map((el) => (
        <>
          <li key={el.id}>
            {el.title}, {el.place_of_origin}, {el.date_start}-{el.date_end}
          </li>
          <img
            src={`https://www.artic.edu/iiif/2/${el.image_id}/full/843,/0/default.jpg`}
            alt={el.title}
          />
        </>
      ))}
    </ul>
  );
}
