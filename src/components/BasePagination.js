import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BasePagination() {
  return (
    <div>
      <Stack spacing={3}>
        <Pagination count={10} shape="rounded" />
      </Stack>
    </div>
  );
}

export default BasePagination;
