"use client";

import Loader from '@/components/custom ui/Loader';
import CustomerForm from '@/components/customers/CustomerForm';
import React, { useEffect, useState } from 'react';

const CustomerDetails = ({ params }: { params: { customerId: string }}) => {
  const [loading, setLoading] = useState(true);
  const [customerDetails, setCustomerDetails] = useState<CustomerType | null>(null);

  const getCustomerDetails = async () => {
    try { 
      const res = await fetch(`/api/customers/${params.customerId}`, {
        method: "GET"
      });
      const data = await res.json();
      setCustomerDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[customerId_GET]", err);
    }
  };

  useEffect(() => {
    getCustomerDetails();
  }, []);

  return loading ? <Loader /> : (
    <CustomerForm initialData={customerDetails} />
  );
};

export default CustomerDetails;
