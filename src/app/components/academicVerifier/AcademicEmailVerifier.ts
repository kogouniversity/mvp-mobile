import domainData from './univ.json';

interface DomainData {
    [country: string]: {
        [domain: string]: {
            institution_name: string;
        } | DomainData; 
    };
}

const typedDomainData = domainData as unknown as DomainData;

const isAcademic = (emailAddress: string): boolean => {
    const domainParts = extractDomainDetails(emailAddress);
    let currentLevel = typedDomainData;

    for (const part of domainParts) {
        if (part in currentLevel) {
            currentLevel = currentLevel[part] as DomainData;
        } else {
            return false;
        }
    }

    return true;
};

const getInstitutionName = (emailAddress: string): string => {
    const domainParts = extractDomainDetails(emailAddress);
    let currentLevel = typedDomainData;

    for (const part of domainParts) {
        if (part in currentLevel) {
            currentLevel = currentLevel[part] as DomainData;
        } else {
            return "";
        }
    }

    return (currentLevel as any).institution_name || "";
};

const extractDomainDetails = (emailAddress: string): string[] => {
    const domain = emailAddress.split("@").pop();
    if (!domain) {
        throw new Error("Invalid email address format.");
    }
    return domain.split('.').reverse(); 
};

export { isAcademic, getInstitutionName };
