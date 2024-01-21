import { useState } from 'react';
import { TextField, Container, Grid} from '@mui/material';
import axios from 'axios';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const App = () => {
  const [encodedText, setEncodedText] = useState('');
  const [password, setPassword] = useState('');
  const [decodedText, setDecodedText] = useState('');

  const handleEncode = async () => {
    if (!password) {
      alert('Please enter a password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/encode', {
        password,
        message: decodedText,
      });
      setEncodedText(response.data.encoded);
    } catch (error) {
      console.error('Error encoding message:', error);
    }
  };

  const handleDecode = async () => {
    if (!password) {
      alert('Please enter a password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/decode', {
        password,
        message: encodedText,
      });
      setDecodedText(response.data.decoded);
    } catch (error) {
      console.error('Error decoding message:', error);
    }
  };

  return (
    <Container>
      <h4 style={{margin:0}}>
        Encoded message
      </h4>
      <TextField
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        value={encodedText}
        onChange={(e) => setEncodedText(e.target.value)}
      />
      <Grid item>
        <TextField
          label="Enter Password"
          type="password"
          variant="outlined"
          value={password}
          sx={{ mt: 2, mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ArrowDownward onClick={handleDecode} sx={{ ml: 4, mt: 4, mb: 4, mr: 2 }} />
        <ArrowUpward onClick={handleEncode} sx={{ mt: 4, mb: 4 }} />
      </Grid>
      <h4 style={{margin:0}}>
        Decoded message
      </h4>
      <TextField
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        value={decodedText}
        onChange={(e) => setDecodedText(e.target.value)}
      />
    </Container>
  );
};

export default App;
