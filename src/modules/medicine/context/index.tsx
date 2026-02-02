import { createContext } from "react";

interface MedicineContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const MedicineContext = createContext({} as MedicineContextType);

export default MedicineContext;
