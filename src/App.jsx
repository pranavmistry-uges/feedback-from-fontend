import React, { useState, useMemo } from 'react';
import { Box, Typography, TextField, Grid, Paper, Divider, ThemeProvider, createTheme, CssBaseline, FormControlLabel, Checkbox, FormGroup, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb',
    },
    background: {
      default: '#f1f5f9',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#475569',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#1e293b',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    h6: {
      fontWeight: 600,
      color: '#334155',
      fontSize: '1.1rem',
      marginTop: '24px',
      marginBottom: '16px',
    },
    subtitle2: {
      fontWeight: 600,
      color: '#2563eb',
      marginBottom: '8px',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            '& fieldset': {
              borderColor: '#cbd5e1',
            },
            '&:hover fieldset': {
              borderColor: '#94a3b8',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#2563eb',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '6px',
          padding: '8px 24px',
        }
      }
    }
  },
});

export default function App() {
  // State for Document Details
  const [docDetails, setDocDetails] = useState({
    docNo: 'UGES-MR-F-19',
    revNo: '00',
    effDt: '2020-08-01' 
  });

  const handleDocDetailChange = (e) => {
    setDocDetails({ ...docDetails, [e.target.name]: e.target.value });
  };

  // State for Checkboxes
  const [services, setServices] = useState({
    'Factory Inspection': false,
    'Wind farm audits': false,
    'Inspection & Testing': false,
    'Project Management Services': false,
    'Training': false,
    'Design Review': false,
    'Engineering Consulting': false,
    'Conditional monitoring': false,
    'Operations & Maintenance': false
  });
  
  const [otherService, setOtherService] = useState(false);
  const [otherServiceText, setOtherServiceText] = useState('');

  // State for Ratings
  const [ratings, setRatings] = useState({
    knowledge: null,
    time: null,
    quality: null,
    queries: null,
    ehs: null,
    reporting: null
  });

  const handleServiceChange = (event) => {
    setServices({ ...services, [event.target.name]: event.target.checked });
  };

  // Calculations for Average and Mandated Suggestions
  const { average, isSuggestionMandatory } = useMemo(() => {
    const validRatings = Object.values(ratings).filter(v => v !== null);
    const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
    const avg = validRatings.length > 0 ? (sum / validRatings.length).toFixed(1) : 0;
    
    const mandatory = validRatings.some(v => v < 6);
    
    return { average: avg, isSuggestionMandatory: mandatory };
  }, [ratings]);

  const feedbackCriteria = [
    { id: 'knowledge', label: 'Knowledge and Command UGES' },
    { id: 'time', label: 'Time/ Schedule Compliance' },
    { id: 'quality', label: 'Quality of Service' },
    { id: 'queries', label: 'Clarification of queries' },
    { id: 'ehs', label: 'EHS Practices and Compliances' },
    { id: 'reporting', label: 'Reporting Structure' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Box sx={{ minHeight: '100vh', py: 4, px: 2, display: 'flex', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ width: '100%', maxWidth: '1000px', p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          
          {/* Header */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#1e40af' }}>
              <RateReviewIcon sx={{ fontSize: 32, mr: 1, color: '#3b82f6' }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Feedback Form
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box sx={{ mb: 4, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  label="Doc. No." 
                  name="docNo" 
                  value={docDetails.docNo} 
                  onChange={handleDocDetailChange} 
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  label="Rev. No." 
                  name="revNo" 
                  value={docDetails.revNo} 
                  onChange={handleDocDetailChange} 
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  label="Eff. Dt." 
                  type="date" 
                  name="effDt" 
                  value={docDetails.effDt} 
                  onChange={handleDocDetailChange} 
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Section A: General Details */}
          <Typography variant="h6">A. General Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Name of Assignment" sx={{ 'width': '447px'}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" type="date" InputLabelProps={{ shrink: true }} sx={{ 'width': '447px'}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Customer Employee" sx={{ 'width': '212px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Site Name" sx={{ 'width': '212px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="UGES Employee" sx={{ 'width': '211px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Location/Country" sx={{ 'width': '211px'}} />
            </Grid>
          </Grid>

          {/* Section B: Type of Services */}
          <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" sx={{ mt: 0, mb: 2 }}>B. Type of Services</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>(Please tick whichever is applicable)</Typography>
            
            <FormGroup>
              <Grid container spacing={2}>
                {/* Row 1 */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Factory Inspection']} onChange={handleServiceChange} name="Factory Inspection" />} 
                    label={<Typography variant="body2">Factory Inspection</Typography>} 
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Wind farm audits']} onChange={handleServiceChange} name="Wind farm audits" />} 
                    label={<Typography variant="body2">Wind farm audits</Typography>} 
                  />
              </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '20px'}}>
                  <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Inspection & Testing']} onChange={handleServiceChange} name="Inspection & Testing" />} 
                    label={<Typography variant="body2">Inspection & Testing</Typography>} 
                  />
                </Grid>
                 <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Project Management Services']} onChange={handleServiceChange} name="Project Management Services" />} 
                    label={<Typography variant="body2">Project Management Services</Typography>} 
                   />
                 </Grid>

                 {/* Row 2 */}
                <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '64px'}}>
                  <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Training']} onChange={handleServiceChange} name="Training" />} 
                     label={<Typography variant="body2">Training</Typography>} 
                  />
                 </Grid>
                <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '13px'}}>
                   <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Design Review']} onChange={handleServiceChange} name="Design Review" />} 
                    label={<Typography variant="body2">Design Review</Typography>} 
                   />
                </Grid>
              <Grid item xs={12} sm={6} md={3}>
                   <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Engineering Consulting']} onChange={handleServiceChange} name="Engineering Consulting" />} 
                   label={<Typography variant="body2">Engineering Consulting</Typography>} 
                  />
               </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Conditional monitoring']} onChange={handleServiceChange} name="Conditional monitoring" />} 
                    label={<Typography variant="body2">Conditional monitoring</Typography>} 
                  />
                </Grid>

                {/* Row 3 */}
                 <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '20px'}}>
                   <FormControlLabel 
                    control={<Checkbox size="medium" checked={otherService} onChange={(e) => setOtherService(e.target.checked)} />} 
                    label={<Typography variant="body2">Other (Specify)</Typography>} 
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControlLabel 
                    control={<Checkbox size="medium" checked={services['Operations & Maintenance']} onChange={handleServiceChange} name="Operations & Maintenance" />} 
                    label={<Typography variant="body2">Operations & Maintenance</Typography>} 
                  />
                </Grid>
                
                {otherService && (
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField 
                      fullWidth 
                      size="small" 
                      label="Please specify other services..." 
                      variant="outlined" 
                      value={otherServiceText}
                      onChange={(e) => setOtherServiceText(e.target.value)}
                    />
                  </Grid>
                )}
              </Grid>
            </FormGroup>
          </Box>

          {/* Section C: Guidelines */}
          <Typography variant="h6">C. Guidelines for Feedback Evaluation</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4, p: 1 }}>
             {[
               { val: '2', desc: 'Not up to the mark', icon: <SentimentVeryDissatisfiedIcon sx={{ color: '#ef4444' }} /> },
               { val: '4', desc: 'Poor', icon: <SentimentDissatisfiedIcon sx={{ color: '#f97316' }} /> },
               { val: '6', desc: 'Acceptable', icon: <SentimentNeutralIcon sx={{ color: '#eab308' }} /> },
               { val: '8', desc: 'Meeting Expectations', icon: <SentimentSatisfiedIcon sx={{ color: '#84cc16' }} /> },
               { val: '10', desc: 'Exceeding Expectations', icon: <SentimentVerySatisfiedIcon sx={{ color: '#22c55e' }} /> },
             ].map((item) => (
               <Box key={item.val} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 {item.icon}
                 <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>
                   <b>{item.val}:</b> {item.desc}
                 </Typography>
               </Box>
             ))}
          </Box>

          {/* Section D: Feedback Section */}
          <Typography variant="h6">D. Feedback Section</Typography>
          <Box sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0', p: 3 }}>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                  <TextField fullWidth size="small" variant="outlined" label="Title / Description" sx={{ 'width': '420px'}} />
              </Grid>
            </Grid>

            {/* Table replacing previous grid/radio logic */}
            <TableContainer component={Box} sx={{ border: '1px solid #e2e8f0', borderRadius: 1, mb: 3, overflowX: 'auto' }}>
              <Table size="small" aria-label="feedback ratings table">
                <TableHead sx={{ bgcolor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, color: '#64748b', borderBottom: '2px solid #e2e8f0' }}>
                      Score Ratings
                    </TableCell>
                    {[2, 4, 6, 8, 10].map((num) => (
                      <TableCell key={num} align="center" sx={{ fontWeight: 600, color: '#64748b', borderBottom: '2px solid #e2e8f0', width: '60px' }}>
                        {num}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {feedbackCriteria.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#f8fafc' } }}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: '#334155' }}>
                        {row.label}
                      </TableCell>
                      {[2, 4, 6, 8, 10].map((num) => (
                        <TableCell key={num} align="center">
                          <Checkbox
                            size="small"
                            color="primary"
                            checked={ratings[row.id] === num}
                            onChange={() => {
                              setRatings(prev => ({
                                ...prev,
                                [row.id]: prev[row.id] === num ? null : num
                              }));
                            }}
                            sx={{ p: 0.5 }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 0, p: 2, bgcolor: '#f8fafc', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Average of overall Feedback:</Typography>
              <Typography variant="h5" sx={{ color: '#2563eb' }}>{average}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontStyle: 'italic' }}>
            (In case of confidential feedback: you may write to "enquiry@uges.co.in")
          </Typography>

          {/* Section E: Participants & Authorization */}
          <Typography variant="h6">E. Participants & Authorization</Typography>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" variant="outlined" label="Name of Participants (Optional)" sx={{ 'width': '420px'}} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  label={`Suggestions ${isSuggestionMandatory ? '(Mandatory)' : '(Mandatory if < 6)'}`}
                  required={isSuggestionMandatory}
                  sx={{ 'width': '420px'}}
                />
              </Grid>
            </Grid>

          <Typography variant="h6">F. Authorization</Typography>
            <Grid container spacing={3}>
              {/* Row 2 */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" variant="outlined" label="Authorization Name & Sign" sx={{ 'width': '420px'}} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  type="date"
                  sx={{ 'width': '420px'}}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              startIcon={<SaveIcon />}
              size="large"
            >
              Save Draft
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<SendIcon />}
              size="large"
              disableElevation
            >
              Submit Feedback
            </Button>
          </Box>

        </Paper>
      </Box>
    </ThemeProvider>
  );
}


// import React, { useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Grid,
//   Paper,
//   Divider,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   FormControlLabel,
//   Checkbox,
//   Radio,
//   RadioGroup,
//   FormGroup,
//   Button
// } from '@mui/material';
// import RateReviewIcon from '@mui/icons-material/RateReview';
// import SaveIcon from '@mui/icons-material/Save';
// import SendIcon from '@mui/icons-material/Send';
// import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
// import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
// import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
// import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

// // Custom theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2563eb', // Matches the active label and button color
//     },
//     background: {
//       default: '#f1f5f9',
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#1e293b',
//       secondary: '#475569',
//     }
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
//     h5: {
//       fontWeight: 700,
//       color: '#1e293b',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//     },
//     h6: {
//       fontWeight: 600,
//       color: '#334155',
//       fontSize: '1.1rem',
//       marginTop: '24px',
//       marginBottom: '16px',
//     },
//     subtitle2: {
//       fontWeight: 600,
//       color: '#2563eb',
//       marginBottom: '8px',
//     }
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           '& .MuiOutlinedInput-root': {
//             backgroundColor: '#ffffff',
//             borderRadius: '6px',
//             '& fieldset': {
//               borderColor: '#cbd5e1',
//             },
//             '&:hover fieldset': {
//               borderColor: '#94a3b8',
//             },
//           },
//           '& .MuiInputLabel-root.Mui-focused': {
//             color: '#2563eb',
//           }
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontWeight: 600,
//           borderRadius: '6px',
//           padding: '8px 24px',
//         }
//       }
//     }
//   },
// });

// // Helper component for rating rows
// const RatingRow = ({ label, value, onChange }) => (
//   <Box sx={{ py: 1.5, borderBottom: '1px dashed #e2e8f0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
//     <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', minWidth: '200px', flex: 1 }}>
//       {label}
//     </Typography>
//     <RadioGroup
//       row
//       value={value}
//       onChange={onChange}
//       sx={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}
//     >
//       {[2, 4, 6, 8, 10].map((num) => (
//         <FormControlLabel
//           key={num}
//           value={num}
//           control={<Radio size="small" />}
//           label={<Typography variant="body2">{num}</Typography>}
//           labelPlacement="top"
//           sx={{ mx: 0.5, m: 0 }}
//         />
//       ))}
//     </RadioGroup>
//   </Box>
// );

// export default function App() {
//   // State for Document Details
//   const [docDetails, setDocDetails] = useState({
//     docNo: 'UGES-MR-F-19',
//     revNo: '00',
//     effDt: '2020-08-01' 
//   });

//   const handleDocDetailChange = (e) => {
//     setDocDetails({ ...docDetails, [e.target.name]: e.target.value });
//   };

//   // State for Checkboxes
//   const [services, setServices] = useState({
//     'Factory Inspection': false,
//     'Wind farm audits': false,
//     'Inspection & Testing': false,
//     'Project Management Services': false,
//     'Training': false,
//     'Design Review': false,
//     'Engineering Consulting': false,
//     'Conditional monitoring': false,
//     'Operations & Maintenance': false
//   });
  
//   const [otherService, setOtherService] = useState(false);
//   const [otherServiceText, setOtherServiceText] = useState('');

//   // State for Ratings
//   const [ratings, setRatings] = useState({
//     knowledge: null,
//     time: null,
//     quality: null,
//     queries: null,
//     ehs: null,
//     reporting: null
//   });

//   const handleRatingChange = (field) => (event) => {
//     setRatings(prev => ({
//       ...prev,
//       [field]: parseInt(event.target.value, 10)
//     }));
//   };

//   const handleServiceChange = (event) => {
//     setServices({ ...services, [event.target.name]: event.target.checked });
//   };

//   // Calculations for Average and Mandated Suggestions
//   const { average, isSuggestionMandatory } = useMemo(() => {
//     const validRatings = Object.values(ratings).filter(v => v !== null);
//     const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
//     const avg = validRatings.length > 0 ? (sum / validRatings.length).toFixed(1) : 0;
    
//     const mandatory = validRatings.some(v => v < 6);
    
//     return { average: avg, isSuggestionMandatory: mandatory };
//   }, [ratings]);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
      
//       <Box sx={{ minHeight: '100vh', py: 4, px: 2, display: 'flex', justifyContent: 'center' }}>
//         <Paper elevation={3} sx={{ width: '100%', maxWidth: '1000px', p: { xs: 3, md: 5 }, borderRadius: 2 }}>
          
//           {/* Header */}
//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', color: '#1e40af' }}>
//               <RateReviewIcon sx={{ fontSize: 32, mr: 1, color: '#3b82f6' }} />
//               <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1e293b' }}>
//                 Feedback Form
//               </Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 4 }} />

//           {/* Document Meta Details */}
//           <Box sx={{ mb: 4, p: 2, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={4}>
//                 <TextField 
//                   fullWidth 
//                   size="small" 
//                   variant="outlined" 
//                   label="Doc. No." 
//                   name="docNo" 
//                   value={docDetails.docNo} 
//                   onChange={handleDocDetailChange} 
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField 
//                   fullWidth 
//                   size="small" 
//                   variant="outlined" 
//                   label="Rev. No." 
//                   name="revNo" 
//                   value={docDetails.revNo} 
//                   onChange={handleDocDetailChange} 
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField 
//                   fullWidth 
//                   size="small" 
//                   variant="outlined" 
//                   label="Eff. Dt." 
//                   type="date" 
//                   name="effDt" 
//                   value={docDetails.effDt} 
//                   onChange={handleDocDetailChange} 
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Section A: General Details - 2-Column Grid */}
//           <Typography variant="h6">A. General Details</Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="Name of Assignment" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="Date" type="date" InputLabelProps={{ shrink: true }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="Customer Employee" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="Site Name" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="UGES Employee" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth size="small" variant="outlined" label="Location/Country" />
//             </Grid>
//           </Grid>

//           {/* Section B: Type of Services - Manual 4-Column Grid */}
//           <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
//             <Typography variant="h6" sx={{ mt: 0, mb: 2 }}>B. Type of Services</Typography>
//             <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>(Please tick whichever is applicable)</Typography>
            
//             <FormGroup>
//               <Grid container spacing={2}>
//                 {/* Row 1 */}
//               <Grid item xs={12} sm={6} md={3}>
//                 <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Factory Inspection']} onChange={handleServiceChange} name="Factory Inspection" />} 
//                     label={<Typography variant="body2">Factory Inspection</Typography>} 
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Wind farm audits']} onChange={handleServiceChange} name="Wind farm audits" />} 
//                     label={<Typography variant="body2">Wind farm audits</Typography>} 
//                   />
//               </Grid>
//                 <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '20px'}}>
//                   <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Inspection & Testing']} onChange={handleServiceChange} name="Inspection & Testing" />} 
//                     label={<Typography variant="body2">Inspection & Testing</Typography>} 
//                   />
//                 </Grid>
//                  <Grid item xs={12} sm={6} md={3}>
//                 <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Project Management Services']} onChange={handleServiceChange} name="Project Management Services" />} 
//                     label={<Typography variant="body2">Project Management Services</Typography>} 
//                    />
//                  </Grid>

//                  {/* Row 2 */}
//                 <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '64px'}}>
//                   <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Training']} onChange={handleServiceChange} name="Training" />} 
//                      label={<Typography variant="body2">Training</Typography>} 
//                   />
//                  </Grid>
//                 <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '13px'}}>
//                    <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Design Review']} onChange={handleServiceChange} name="Design Review" />} 
//                     label={<Typography variant="body2">Design Review</Typography>} 
//                    />
//                 </Grid>
//               <Grid item xs={12} sm={6} md={3}>
//                    <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Engineering Consulting']} onChange={handleServiceChange} name="Engineering Consulting" />} 
//                    label={<Typography variant="body2">Engineering Consulting</Typography>} 
//                   />
//                </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Conditional monitoring']} onChange={handleServiceChange} name="Conditional monitoring" />} 
//                     label={<Typography variant="body2">Conditional monitoring</Typography>} 
//                   />
//                 </Grid>

//                 {/* Row 3 */}
//                  <Grid item xs={12} sm={6} md={3} sx={{ marginRight: '20px'}}>
//                    <FormControlLabel 
//                     control={<Checkbox size="medium" checked={otherService} onChange={(e) => setOtherService(e.target.checked)} />} 
//                     label={<Typography variant="body2">Other (Specify)</Typography>} 
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <FormControlLabel 
//                     control={<Checkbox size="medium" checked={services['Operations & Maintenance']} onChange={handleServiceChange} name="Operations & Maintenance" />} 
//                     label={<Typography variant="body2">Operations & Maintenance</Typography>} 
//                   />
//                 </Grid>
                
//                 {/* The 'Other' text input conditionally fills the remaining columns (md={6}) of Row 3 */}
//                 {otherService && (
//                   <Grid item xs={12} sm={12} md={6}>
//                     <TextField 
//                       fullWidth 
//                       size="small" 
//                       label="Please specify other services..." 
//                       variant="outlined" 
//                       value={otherServiceText}
//                       onChange={(e) => setOtherServiceText(e.target.value)}
//                     />
//                   </Grid>
//                 )}
//               </Grid>
//             </FormGroup>
//           </Box>

//           {/* Section C: Guidelines */}
//           <Typography variant="h6">C. Guidelines for Feedback Evaluation</Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4, p: 1 }}>
//              {[
//                { val: '2', desc: 'Not up to the mark', icon: <SentimentVeryDissatisfiedIcon sx={{ color: '#ef4444' }} /> },
//                { val: '4', desc: 'Poor', icon: <SentimentDissatisfiedIcon sx={{ color: '#f97316' }} /> },
//                { val: '6', desc: 'Acceptable', icon: <SentimentNeutralIcon sx={{ color: '#eab308' }} /> },
//                { val: '8', desc: 'Meeting Expectations', icon: <SentimentSatisfiedIcon sx={{ color: '#84cc16' }} /> },
//                { val: '10', desc: 'Exceeding Expectations', icon: <SentimentVerySatisfiedIcon sx={{ color: '#22c55e' }} /> },
//              ].map((item) => (
//                <Box key={item.val} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                  {item.icon}
//                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155' }}>
//                    <b>{item.val}:</b> {item.desc}
//                  </Typography>
//                </Box>
//              ))}
//           </Box>

//           {/* Section D: Feedback Section */}
//           <Typography variant="h6">D. Feedback Section</Typography>
//           <Box sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0', p: 3 }}>
            
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               {/* Wrapped in a Grid item to strictly match the height and width of all other fields */}
//               <Grid item xs={12} sm={6}>
//                   <TextField fullWidth size="small" variant="outlined" label="Title / Description" />
//               </Grid>
//             </Grid>

//             <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', borderBottom: '2px solid #e2e8f0', pb: 1, mb: 1, px: 2 }}>
//                <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Score Ratings</Typography>
//             </Box>

//             <RatingRow label="Knowledge and Command UGES" value={ratings.knowledge} onChange={handleRatingChange('knowledge')} />
//             <RatingRow label="Time/ Schedule Compliance" value={ratings.time} onChange={handleRatingChange('time')} />
//             <RatingRow label="Quality of Service" value={ratings.quality} onChange={handleRatingChange('quality')} />
//             <RatingRow label="Clarification of queries" value={ratings.queries} onChange={handleRatingChange('queries')} />
//             <RatingRow label="EHS Practices and Compliances" value={ratings.ehs} onChange={handleRatingChange('ehs')} />
//             <RatingRow label="Reporting Structure" value={ratings.reporting} onChange={handleRatingChange('reporting')} />

//             <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Average of overall Feedback:</Typography>
//               <Typography variant="h5" sx={{ color: '#2563eb' }}>{average}</Typography>
//             </Box>
//           </Box>

//           <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontStyle: 'italic' }}>
//             (In case of confidential feedback: you may write to "enquiry@uges.co.in")
//           </Typography>

//           {/* Section E: Participants & Authorization - Strict 2x2 Grid */}
//           <Typography variant="h6">E. Participants & Authorization</Typography>
//           <Box sx={{ mb: 4, p: 3, bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e2e8f0' }}>
//             <Grid container spacing={3}>
//               {/* Row 1 */}
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth size="small" variant="outlined" label="Name of Participants (Optional)" />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField 
//                   fullWidth 
//                   size="small" 
//                   variant="outlined" 
//                   label={`Suggestions ${isSuggestionMandatory ? '(Mandatory)' : '(Mandatory if < 6)'}`}
//                   required={isSuggestionMandatory}
//                 />
//               </Grid>

//               {/* Row 2 */}
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth size="small" variant="outlined" label="Authorization Name & Sign" />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField 
//                   fullWidth 
//                   size="small" 
//                   variant="outlined" 
//                   label="Authorization Date" 
//                   type="date" 
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           <Divider sx={{ my: 4 }} />

//           {/* Action Buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, flexWrap: 'wrap' }}>
//             <Button 
//               variant="outlined" 
//               color="primary" 
//               startIcon={<SaveIcon />}
//               size="large"
//             >
//               Save Draft
//             </Button>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               startIcon={<SendIcon />}
//               size="large"
//               disableElevation
//             >
//               Submit Feedback
//             </Button>
//           </Box>

//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// }



