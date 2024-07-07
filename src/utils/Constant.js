// role
export const ADMIN = 'ADMIN';
export const EDU_COUNSELLOR = 'EDU_COUNSELLOR';
export const ADMISSION_OFFICER = 'ADMISSION_OFFICER';

// evaluate for consultation
export const CONSULTATION_EVALUATE = {
  POTENTIAL: 1,
  NO_POTENTIAL: 0,
};
// status for consultation
export const CONSULTATION_STATUS = {
  NEW: 1,
  WATTING: 2,
  ACCEPT: 3,
  REFUSE: 0
}
// advise status
export const ADVISE_STATUS = {
  CLOSE: 0,
  NEWADVISE: 1,
  WATTING: 2,
  BEING_CONSULTED: 3,
  BEING_FILE: 4,
  UPLOADED_OFFERLETTER: 5,
  UPLOADED_VISA: 6,
  END_CONSULTATION: 7,
};
// task status
export const TASK_STATUS = {
  WATTING_CONFIRM: 1,
  ACCEPT: 2,
  REFUSE: 0,
};
