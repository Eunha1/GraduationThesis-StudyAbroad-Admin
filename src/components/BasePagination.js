import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function BasePagination({ totalPage, currentPage, onPageChange }) {
  const handleChange = (event, page) => {
    onPageChange(page);
  };
  return (
    <div>
      <Stack spacing={3}>
        <Pagination
          count={totalPage}
          page={currentPage}
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}

export default BasePagination;
