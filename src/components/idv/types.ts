// ---------------------------------------------------------------------------
// Verify Details gate
// ---------------------------------------------------------------------------

export interface UserProfile {
  firstName: string;
  lastName: string;
  middleName: string;
  residentialAddress: string;
  email: string;
  dateOfBirth: string;
  mobilePhone: string;
}

export interface VerifyDetailsState {
  confirmed: 'yes' | 'no' | '';
  edited: UserProfile;
}

// ---------------------------------------------------------------------------
// ID Verification gate
// ---------------------------------------------------------------------------

export type IDVDocument = 'drivers-licence' | 'medicare' | 'passport' | '';

// ---------------------------------------------------------------------------
// Offline ID upload
// ---------------------------------------------------------------------------

export type OtherIdMethod = 'selfie' | 'certified' | 'later' | '';

export interface OtherIdState {
  method: OtherIdMethod;
  /** Uploaded files (prototype only — not JSON-serialisable, won’t survive draft resume). */
  files: File[];
  laterConfirmed: boolean;
}

export interface IDVState {
  selectedDocument: IDVDocument;
  driversLicence: {
    stateOfIssue: string;
    licenceNumber: string;
    cardNumber: string;
    middleName: string;
    noMiddleName: boolean;
  };
  medicare: {
    cardColour: 'green' | 'yellow' | 'blue' | '';
    cardNumber: string;
    referenceNumber: string;
    nameOnCard: string;
    expiryDate: string;
  };
  passport: {
    referenceNumber: string;
    middleName: string;
    noMiddleName: boolean;
  };
}
