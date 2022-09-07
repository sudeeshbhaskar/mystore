import { useMemo } from "react";
import { useStoreContext } from "../context/StoreContext";
import { formatCurrency } from "../utilities/common";

function useCurrency(price: number) {
  const {
    state: { country },
  } = useStoreContext();
  const memorizedPrice = useMemo(() => {
    return formatCurrency(price, country);
  }, [country]);

  return [memorizedPrice];
}

export default useCurrency;
