import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {
  const [data, setData] = useState(null);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };

  const [search, setSearch] = useState('');
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/products?page=${page - 1}&search=${search}`)
      .then((resp) => setData(resp.data));
  }, [page, search]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">NAME</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">STOCK</TableCell>
              <TableCell align="center">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.content.map((item, index) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" align="center">
                    {data && data.size * data.number + index + 1}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.stock}</TableCell>
                  <TableCell align="center">{item.status ? 'Hoạt động' : 'Không hoạt động'}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChangeSearch} />
      <Pagination
        count={data && data.totalPages}
        color="primary"
        onChange={handleChange}
        hideNextButton
        hidePrevButton
      />
    </>
  );
}

export default App;
