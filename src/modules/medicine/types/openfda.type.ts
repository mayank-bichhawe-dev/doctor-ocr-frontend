export interface DrugLabel {
  splProductDataElements: string[];
  activeIngredient: string;
  purpose: string;
  indicationsAndUsage: string;
  warnings: string[];
  doNotUse: string;
  askDoctor: string;
  askDoctorOrPharmacist: string[];
  whenUsing: string;
  stopUse: string;
  pregnancyOrBreastFeeding: string[];
  keepOutOfReachOfChildren: string[];
  dosageAndAdministration: string[];
  storageAndHandling: string;
  packageLabelPrincipalDisplayPanel: string[];

  setId: string;
  id: string;
  effectiveTime: string; // YYYYMMDD
  version: string;

  brandName: string[];
  genericName: string[];
  manufacturerName: string[];
}

export interface MedicineSearchApiRes {
  success: boolean;
  data: DrugLabel[];
}
