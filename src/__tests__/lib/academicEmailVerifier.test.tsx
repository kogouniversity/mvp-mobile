import {
    isAcademic,
    getInstitutionName,
} from '../../app/lib/academicEmailVerifier';

describe('Email Verification Tests', () => {
    it('correctly identifies an academic email', () => {
        expect(isAcademic('example@sfu.ca')).toBe(true);
        expect(isAcademic('example@ubc.ca')).toBe(true);
        expect(isAcademic('example@okanagan.bc.ca')).toBe(true);
        expect(isAcademic('example@mit.edu')).toBe(true);
        expect(isAcademic('example@gmail.com')).toBe(false);
    });

    it('returns the correct institution name', () => {
        expect(getInstitutionName('example@sfu.ca')).toBe(
            'Simon Fraser University',
        );
        expect(getInstitutionName('example@ubc.ca')).toBe(
            'University of British Columbia',
        );
        expect(getInstitutionName('example@okanagan.bc.ca')).toBe(
            'Okanagan University College',
        );
        expect(getInstitutionName('example@mit.edu')).toBe(
            'Massachusetts Institute of Technology',
        );
        expect(getInstitutionName('example@gmail.com')).toBe('');
    });
});
