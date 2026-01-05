'use client'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { productReset } from '@/api/products';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

export const useReset = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!window.location.pathname.includes('/products/')) {
      dispatch(productReset());
    }
  }, [productReset, dispatch]);
};
