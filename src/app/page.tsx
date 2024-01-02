'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setData(data[0].name);
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading };
}

export default function Home() {
  const { data: agency, loading } = useFetch('/api/agency');

  if (loading) return 'Loading...';

  return (
    <main>
      <h1>Welcome to Twincitie</h1>
      <p>AgencyId: {agency}</p>
    </main>
  );
}