import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import apiClient from '../../lib/ApiClient';
import validateAndSetKey from '../../utils/validateAndSetKey';
import { modalStyle } from '../../utils/modalStyle';

export const CreateFlagModal = ({isOpen, setFormOpen}) => {
  const [audiences, setAudiences] = useState([]);
  const [displayName, setDisplayName] = useState('');
  const [flagKey, setFlagKey] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [selectedAudiences, setSelectedAudiences] = useState([]);

  useEffect(() => {
    const fetchAudiences = async () => {
      const a = await apiClient.getAudiences();
      console.log('fetch audiences')
      setAudiences(a);
    }
    fetchAudiences();
  }, [])

  const onKeyInput = (e) => {
    validateAndSetKey(e.target.value, setFlagKey, setKeyError);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: submit to manager backend
  };


  return (
    <Modal
      style={{ overflow: 'scroll' }}
      open={isOpen}
      onClose={() => setFormOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
    <Fade in={isOpen}>
      <Box sx={modalStyle}>
        <Stack container spacing={2}>
          <Stack>
            <Typography variant="h5">Create a new flag</Typography>
          </Stack>
          <Stack>
            <TextField required 
              id="outlined-basic" 
              label="Flag Name" 
              variant="outlined" 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)} 
            />
          </Stack>
          <Stack>
            <TextField required 
              error={keyError}
              id="outlined-basic" 
              label="Flag Key" 
              variant="outlined"
              value={flagKey}
              onChange={onKeyInput}
            />
          <FormHelperText>Alphanumeric and underscores only. This cannot be changed after creation</FormHelperText>
          </Stack>
          <Typography variant="h6">Targeted Audiences</Typography>
          <FormControl sx={{ minWidth: 300 }}>
            <InputLabel id="audience-dropdown-label">Select Audiences</InputLabel>
            <Select multiple
              labelId="audience-dropdown-label"
              value={selectedAudiences}
              onChange={(e) => setSelectedAudiences(e.target.value)}
              input={<OutlinedInput label="Select Audiences" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}>
              {audiences.map((a) => (
                <MenuItem key={a.key} value={a.key}>{a.displayName}</MenuItem>
              ))}
            </Select>
            <FormHelperText>This flag will serve to ANY selected audience</FormHelperText>
          </FormControl>
          <Button variant="outlined" onClick={handleSubmit}>Create</Button>
        </Stack>
      </Box>
    </Fade>
  </Modal>
  )
}