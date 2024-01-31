export interface InstitutionInfo {
    institution_name: string;
  }
  
  export interface SubdomainData {
    [subdomain: string]: InstitutionInfo;
  }
  
  export interface DomainData {
    [tld: string]: SubdomainData;
  }
  