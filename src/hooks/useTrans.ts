"use client";
import { Dispatch, SetStateAction, useState } from "react";

const useTrans = (
  callback: (props: {
    args: any[];
    error: string;
    loading: boolean;
    setError: Dispatch<SetStateAction<string>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
  }) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const start = (...args: any[]) => {
    setError(null);
    setLoading(true);
    try {
      callback({ args, error, loading, setError, setLoading });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };
  return { start, loading, setLoading, error };
};

export default useTrans;
