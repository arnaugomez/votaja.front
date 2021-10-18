import { useEffect } from 'react';
import { useRouter } from "next/dist/client/router";

export function useMaintenance() {
  const r = useRouter()
  useEffect(() => {
    r.push('/sorry')
  }, [])
}