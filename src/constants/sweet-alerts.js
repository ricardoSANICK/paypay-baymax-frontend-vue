import i18n from "@/local";

export const clearSwal = {
  title: i18n.t('view.commons.swal.clear.title')
  , text: i18n.t('view.commons.swal.clear.text')
  , type: i18n.t('view.commons.swal.clear.type')
  , showCancelButton: !!i18n.t('view.commons.swal.clear.showCancelButton')
  , confirmButtonColor: i18n.t('view.commons.swal.clear.confirmButtonColor')
  , cancelButtonColor: i18n.t('view.commons.swal.clear.cancelButtonColor')
  , confirmButtonText: i18n.t('view.commons.swal.clear.confirmButtonText')
  , cancelButtonText: i18n.t('view.commons.swal.clear.cancelButtonText')
  , reverseButtons: true
};
export const logOutSwal = {
  title: 'Close session',
  text: "Exit from the app",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#0077BC',
  cancelButtonColor: '#e7eaec',
  confirmButtonText: 'Aceptar',
  cancelButtonText: i18n.t('view.commons.swal.disable.cancelButtonText'),
  reverseButtons: true
};

export const deleteRecordSwal = {
  title: i18n.t('view.commons.swal.disable.title')
  , text: i18n.t('view.commons.swal.disable.text')
  , type: i18n.t('view.commons.swal.disable.type')
  , showCancelButton: !!i18n.t('view.commons.swal.disable.showCancelButton')
  , confirmButtonColor: i18n.t('view.commons.swal.disable.confirmButtonColor')
  , cancelButtonColor: i18n.t('view.commons.swal.disable.cancelButtonColor')
  , confirmButtonText: i18n.t('view.commons.swal.disable.confirmButtonText')
  , cancelButtonText: i18n.t('view.commons.swal.disable.cancelButtonText')
  , reverseButtons: true
};

export let maxFilesExceededSwal = {
  title: 'Advertencia',
  text: "",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#0077BC',
  cancelButtonColor: '#e7eaec',
  confirmButtonText: 'Aceptar',
  reverseButtons: true
};