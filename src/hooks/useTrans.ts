"use client";
import { Dispatch, SetStateAction, useState } from "react";

const useTrans = <$Values extends any>(
  callback: (props: {
    values: $Values;
    error: string;
    loading: boolean;
    setError: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const start = async (values: any) => {
    setError(null);
    setLoading(true);
    try {
      await callback({ values, error, loading, setError, setLoading });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return { start, loading, setLoading, error };
};

export default useTrans;
