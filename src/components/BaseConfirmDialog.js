import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
function BaseConfirmDialog({ title, content, open, setOpen, event }) {
  const handleRemove = () => {
    event.emit('RemoveItem');
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{content}</p>
        </DialogContent>
        <DialogActions>
          <button
            className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 rounded-lg bg-[#D0021B] text-white hover:bg-red-700"
            onClick={handleRemove}
          >
            Remove
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BaseConfirmDialog;
