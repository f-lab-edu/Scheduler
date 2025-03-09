import ConfirmDialog from './ConfirmDialog';

export function createConfirmDialog(
  message: string,
  confirmButtonText: string,
  confirmHandler: () => void,
  cancelButtonText?: string,
  cancelHandler?: () => void,
): ConfirmDialog {
  const $dialog = document.createElement('confirm-dialog') as ConfirmDialog;
  $dialog.dialogMessage = message;
  $dialog.dialogConfirmText = confirmButtonText;
  $dialog.confirmHandler = confirmHandler;
  if (cancelButtonText) {
    $dialog.dialogCancelText = cancelButtonText;
  }
  if (cancelHandler) {
    $dialog.cancelHandler = cancelHandler;
  }
  return $dialog;
}
