import { fetchPortfolio, MOCK_PORTFOLIO, type Portfolio } from "@portfolio/shared";
import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio>(MOCK_PORTFOLIO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchPortfolio(createSupabaseClient()).then((data) => {
      if (!cancelled) {
        setPortfolio(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { portfolio, loading };
}
