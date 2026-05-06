import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormGroup,
  Chip,
  Button
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Matches the active label and button color
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
          // Ensures the floating label has a white background so it doesn't overlap borders
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

// Helper component for rating rows
const RatingRow = ({ label, value, onChange }) => (
  <Box sx={{ py: 1.5, borderBottom: '1px dashed #e2e8f0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', minWidth: '200px', flex: 1 }}>
      {label}
    </Typography>
    <RadioGroup
      row
      value={value}
      onChange={onChange}
      sx={{ justifyContent: 'flex-end', flexWrap: 'nowrap' }}
    >
      {[2, 4, 6, 8, 10].map((num) => (
        <FormControlLabel
          key={num}
          value={num}
          control={<Radio size="small" />}
          label={<Typography variant="body2">{num}</Typography>}
          labelPlacement="top"
          sx={{ mx: 0.5, m: 0 }}
        />
      ))}
    </RadioGroup>
  </Box>
);

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
  const [services, setServices] = useState({});
  const [otherService, setOtherService] = useState(false);

  // State for Ratings
  const [ratings, setRatings] = useState({
    knowledge: null,
    time: null,
    quality: null,
    queries: null,
    ehs: null,
    reporting: null
  });

  const handleRatingChange = (field) => (event) => {
    setRatings(prev => ({
      ...prev,
      [field]: parseInt(event.target.value, 10)
    }));
  };

  const handleServiceChange = (event) => {
    setServices({ ...services, [event.target.name]: event.target.checked });
  };

  const serviceOptionsList = [
    "Factory Inspection", "Wind farm audits", "Inspection & Testing",
    "Project Management Services", "Training", "Design Review",
    "Engineering Consulting", "Conditional monitoring", "Operations & Maintenance"
  ];

  // Calculations for Average and Mandated Suggestions
  const { average, isSuggestionMandatory } = useMemo(() => {
    const validRatings = Object.values(ratings).filter(v => v !== null);
    const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
    const avg = validRatings.length > 0 ? (sum / validRatings.length).toFixed(1) : 0;
    
    // Suggestion is mandatory if any score is below 6
    const mandatory = validRatings.some(v => v < 6);
    
    return { average: avg, isSuggestionMandatory: mandatory };
  }, [ratings]);

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

          {/* Document Meta Details */}
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

          {/* Section A: General Details - 2-Column Grid */}
          <Typography variant="h6">A. General Details</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Name of Assignment" sx={{ width: '445px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" type="date" InputLabelProps={{ shrink: true }} sx={{ width: '445px'}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Customer Employee" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Site Name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="UGES Employee" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" variant="outlined" label="Location/Country" />
            </Grid>
          </Grid>

          {/* Section B: Type of Services */}
          <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Typography variant="h6" sx={{ mt: 0, mb: 2 }}>B. Type of Services</Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>(Please tick whichever is applicable)</Typography>
            
            <FormGroup>
              <Grid container spacing={2}>
                {serviceOptionsList.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service}>
                    <FormControlLabel 
                      control={<Checkbox size="small" checked={services[service] || false} onChange={handleServiceChange} name={service} />} 
                      label={<Typography variant="body2">{service}</Typography>} 
                    />
                  </Grid>
                ))}
                
                {/* Other (Specify) Field */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel 
                      control={<Checkbox size="small" checked={otherService} onChange={(e) => setOtherService(e.target.checked)} />} 
                      label={<Typography variant="body2">Other (Specify)</Typography>} 
                    />
                  </Box>
                </Grid>
                {otherService && (
                  <Grid item xs={12} sm={12} md={8}>
                     <TextField fullWidth size="small" label="Please specify other services..." variant="outlined" />
                  </Grid>
                )}
              </Grid>
            </FormGroup>
          </Box>

          {/* Section C: Guidelines */}
          <Typography variant="h6">C. Guidelines for Feedback Evaluation</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, p: 2, bgcolor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 2 }}>
             <InfoOutlinedIcon sx={{ color: '#3b82f6', alignSelf: 'center', mr: 1 }} />
             {[
               { val: '2', desc: 'Not up to the mark' },
               { val: '4', desc: 'Poor' },
               { val: '6', desc: 'Acceptable' },
               { val: '8', desc: 'Meeting Expectations' },
               { val: '10', desc: 'Exceeding Expectations' },
             ].map((item) => (
               <Chip 
                 key={item.val} 
                 label={<b>{item.val}: {item.desc}</b>} 
                 variant="outlined" 
                 sx={{ bgcolor: 'white', borderColor: '#bfdbfe', color: '#1e40af' }} 
               />
             ))}
          </Box>

          {/* Section D: Feedback Section */}
          <Typography variant="h6">D. Feedback Section</Typography>
          <Box sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0', p: 3 }}>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {/* Wrapped in a Grid item to strictly match the height and width of all other fields */}
              <Grid item xs={12} sm={6}>
                  <TextField fullWidth size="small" variant="outlined" label="Title / Description" sx={{ width: '300px'}}/>
              </Grid>
            </Grid>

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', borderBottom: '2px solid #e2e8f0', pb: 1, mb: 1, px: 2 }}>
               <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Score Ratings</Typography>
            </Box>

            <RatingRow label="Knowledge and Command UGES" value={ratings.knowledge} onChange={handleRatingChange('knowledge')} />
            <RatingRow label="Time/ Schedule Compliance" value={ratings.time} onChange={handleRatingChange('time')} />
            <RatingRow label="Quality of Service" value={ratings.quality} onChange={handleRatingChange('quality')} />
            <RatingRow label="Clarification of queries" value={ratings.queries} onChange={handleRatingChange('queries')} />
            <RatingRow label="EHS Practices and Compliances" value={ratings.ehs} onChange={handleRatingChange('ehs')} />
            <RatingRow label="Reporting Structure" value={ratings.reporting} onChange={handleRatingChange('reporting')} />

            <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Average of overall Feedback:</Typography>
              <Typography variant="h5" sx={{ color: '#2563eb' }}>{average}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontStyle: 'italic' }}>
            (In case of confidential feedback: you may write to "enquiry@uges.co.in")
          </Typography>

          {/* Section E: Participants & Authorization - Strict 2x2 Grid */}
          <Typography variant="h6">E. Participants & Authorization</Typography>
          <Box sx={{ mb: 4, p: 3, bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e2e8f0' }}>
            <Grid container spacing={3}>
              {/* Row 1 */}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" variant="outlined" label="Name of Participants (Optional)" sx={{ width: '420px'}} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  size="small" 
                  variant="outlined" 
                  label={`Suggestions ${isSuggestionMandatory ? '(Mandatory)' : '(Mandatory if assessment is below 6)'}`}
                  required={isSuggestionMandatory}
                  sx={{ width: '420px'}}
                />
              </Grid>
            </Grid>
          </Box>
              {/* Row 2 */}
              <Typography variant="h6">F. Authorization</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth size="small" variant="outlined" label="Authorization Name & Sign" sx={{ width: '320px'}} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    size="small" 
                    variant="outlined" 
                    type="date" 
                    InputLabelProps={{ shrink: true }}
                    sx={{ width: '320px'}}
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
//   Chip,
//   Button
// } from '@mui/material';
// import RateReviewIcon from '@mui/icons-material/RateReview';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import SendIcon from '@mui/icons-material/Send';

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
//           // Ensures the floating label has a white background so it doesn't overlap borders
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

// // Helper component using MUI's native floating labels
// // Note: Removed multiline/rows and external Box margins to ensure exactly the same height/width for all inputs
// const FormInput = ({ label, name, value, onChange, type = "text", required = false }) => (
//   <TextField
//     fullWidth
//     size="small"
//     variant="outlined"
//     label={label}
//     name={name}
//     value={value}
//     onChange={onChange}
//     type={type}
//     required={required}
//     InputLabelProps={type === 'date' || type === 'time' ? { shrink: true } : undefined}
//   />
// );

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
//   const [services, setServices] = useState({});
//   const [otherService, setOtherService] = useState(false);

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

//   const serviceOptionsList = [
//     "Factory Inspection", "Wind farm audits", "Inspection & Testing",
//     "Project Management Services", "Training", "Design Review",
//     "Engineering Consulting", "Conditional monitoring", "Operations & Maintenance"
//   ];

//   // Calculations for Average and Mandated Suggestions
//   const { average, isSuggestionMandatory } = useMemo(() => {
//     const validRatings = Object.values(ratings).filter(v => v !== null);
//     const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
//     const avg = validRatings.length > 0 ? (sum / validRatings.length).toFixed(1) : 0;
    
//     // Suggestion is mandatory if any score is below 6
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
//                 <FormInput 
//                   label="Doc. No." 
//                   name="docNo" 
//                   value={docDetails.docNo} 
//                   onChange={handleDocDetailChange} 
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormInput 
//                   label="Rev. No." 
//                   name="revNo" 
//                   value={docDetails.revNo} 
//                   onChange={handleDocDetailChange} 
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <FormInput 
//                   label="Eff. Dt." 
//                   type="date" 
//                   name="effDt" 
//                   value={docDetails.effDt} 
//                   onChange={handleDocDetailChange} 
//                 />
//               </Grid>
//             </Grid>
//           </Box>

//           {/* Section A: General Details - 2-Column Grid */}
//           <Typography variant="h6">A. General Details</Typography>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}><FormInput label="Name of Assignment" /></Grid>
//             <Grid item xs={12} sm={6}><FormInput label="Date" type="date" /></Grid>
//             <Grid item xs={12} sm={6}><FormInput label="Customer Employee" /></Grid>
//             <Grid item xs={12} sm={6}><FormInput label="Site Name" /></Grid>
//             <Grid item xs={12} sm={6}><FormInput label="UGES Employee" /></Grid>
//             <Grid item xs={12} sm={6}><FormInput label="Location/Country" /></Grid>
//           </Grid>

//           {/* Section B: Type of Services */}
//           <Box sx={{ mt: 4, mb: 4, p: 3, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
//             <Typography variant="h6" sx={{ mt: 0, mb: 2 }}>B. Type of Services</Typography>
//             <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>(Please tick whichever is applicable)</Typography>
            
//             <FormGroup>
//               <Grid container spacing={2}>
//                 {serviceOptionsList.map((service) => (
//                   <Grid item xs={12} sm={6} md={4} key={service}>
//                     <FormControlLabel 
//                       control={<Checkbox size="small" checked={services[service] || false} onChange={handleServiceChange} name={service} />} 
//                       label={<Typography variant="body2">{service}</Typography>} 
//                     />
//                   </Grid>
//                 ))}
                
//                 {/* Other (Specify) Field */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <FormControlLabel 
//                       control={<Checkbox size="small" checked={otherService} onChange={(e) => setOtherService(e.target.checked)} />} 
//                       label={<Typography variant="body2">Other (Specify)</Typography>} 
//                     />
//                   </Box>
//                 </Grid>
//                 {otherService && (
//                   <Grid item xs={12} sm={12} md={8}>
//                      <TextField fullWidth size="small" label="Please specify other services..." variant="outlined" />
//                   </Grid>
//                 )}
//               </Grid>
//             </FormGroup>
//           </Box>

//           {/* Section C: Guidelines */}
//           <Typography variant="h6">C. Guidelines for Feedback Evaluation</Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4, p: 2, bgcolor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 2 }}>
//              <InfoOutlinedIcon sx={{ color: '#3b82f6', alignSelf: 'center', mr: 1 }} />
//              {[
//                { val: '2', desc: 'Not up to the mark' },
//                { val: '4', desc: 'Poor' },
//                { val: '6', desc: 'Acceptable' },
//                { val: '8', desc: 'Meeting Expectations' },
//                { val: '10', desc: 'Exceeding Expectations' },
//              ].map((item) => (
//                <Chip 
//                  key={item.val} 
//                  label={<b>{item.val}: {item.desc}</b>} 
//                  variant="outlined" 
//                  sx={{ bgcolor: 'white', borderColor: '#bfdbfe', color: '#1e40af' }} 
//                />
//              ))}
//           </Box>

//           {/* Section D: Feedback Section */}
//           <Typography variant="h6">D. Feedback Section</Typography>
//           <Box sx={{ mb: 4, borderRadius: 2, border: '1px solid #e2e8f0', p: 3 }}>
            
//             <Grid container spacing={3} sx={{ mb: 3 }}>
//               {/* Wrapped in a Grid item to strictly match the height and width of all other fields */}
//               <Grid item xs={12} sm={6}>
//                   <FormInput label="Title / Description" />
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
//                 <FormInput label="Name of Participants (Optional)" />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormInput 
//                   label={`Suggestions ${isSuggestionMandatory ? '(Mandatory)' : '(Mandatory if < 6)'}`}
//                   required={isSuggestionMandatory}
//                 />
//               </Grid>
//             </Grid>
//           </Box>


//           <Typography variant="h6">F. Authorization</Typography>
//           <Box sx={{ mb: 4, p: 3, bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e2e8f0' }}>
//             <Grid container spacing={3}>
//               {/* Row 2 */}
//               <Grid item xs={12} sm={6}>
//                 <FormInput label="Authorization Name & Sign" />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormInput type="date" />
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


