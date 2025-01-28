"use client";

import Loader from '@/components/custom ui/Loader';
import CollectionForm from '@/components/collections/CollectionForm';
import React, { useEffect, useState } from 'react';

const CollectionDetails = ({ params }: { params: { collectionId: string }}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try { 
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET"
      });
      const data = await res.json();
      const { price, expense, category, tags, colors, sizes, ...filteredData } = data;
      setCollectionDetails(filteredData);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? <Loader /> : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
