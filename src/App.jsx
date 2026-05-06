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

// Helper component using MUI's native floating labels
const FormInput = ({ label, type = "text", multiline = false, rows = 1, fullWidth = true, required = false }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      fullWidth={fullWidth}
      size="small"
      variant="outlined"
      label={label}
      type={type}
      multiline={multiline}
      rows={rows}
      required={required}
      // Force label to stay at top for dates, otherwise use default floating behavior
      InputLabelProps={type === 'date' || type === 'time' ? { shrink: true } : undefined}
    />
  </Box>
);

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
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#1e40af' }}>
              <RateReviewIcon sx={{ fontSize: 32, mr: 1, color: '#3b82f6' }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                Feedback Form
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, color: '#64748b', fontSize: '0.8rem' }}>
              <Typography variant="caption" display="block">Doc. No.: UGES-MR-F-19</Typography>
              <Typography variant="caption" display="block">Rev. No.: 00</Typography>
              <Typography variant="caption" display="block">Eff. Dt.: 01/08/2020</Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Section A: General Details */}
          <Typography variant="h6">A. General Details</Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}><FormInput label="Name of Assignment" /></Grid>
            <Grid item xs={12} sm={6}><FormInput type="date" /></Grid>
            <Grid item xs={12} sm={6}><FormInput label="Customer Employee" /></Grid>
            <Grid item xs={12} sm={6}><FormInput label="Site Name" /></Grid>
            <Grid item xs={12} sm={6}><FormInput label="UGES Employee" /></Grid>
            <Grid item xs={12} sm={6}><FormInput label="Location/Country" /></Grid>
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
            
            <Box sx={{ mb: 4 }}>
                <FormInput label="Title / Description" />
            </Box>

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

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormInput label="Name of Participants (Optional)" />
            </Grid>
            <Grid item xs={12}>
              <FormInput 
                label={`Suggestions for Improvement ${isSuggestionMandatory ? '(Mandatory)' : '(Mandatory if assessment is below 6)'}`}
                multiline 
                rows={4} 
                required={isSuggestionMandatory}
              />
            </Grid>
          </Grid>

          {/* Signature Block */}
          <Box sx={{ mt: 5, p: 3, bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e2e8f0', width: { xs: '100%', md: '50%' } }}>
            <Typography variant="subtitle2" sx={{ color: '#1e293b', mb: 3 }}>Authorization</Typography>
            <FormInput label="Name" />
            <FormInput type="date" />
          </Box>

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
//   Chip
// } from '@mui/material';
// import RateReviewIcon from '@mui/icons-material/RateReview';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// // Reuse the identical custom theme to maintain design consistency
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#2563eb',
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
//         },
//       },
//     },
//   },
// });

// // Helper component for standardizing input layout
// const FormInput = ({ label, placeholder, type = "text", multiline = false, rows = 1, fullWidth = true, required = false }) => (
//   <Box sx={{ mb: 0 }}>
//     <Typography variant="body2" sx={{ mb: 0.5, color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}>
//       {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
//     </Typography>
//     <TextField
//       fullWidthyg={fullWidth}
//       size="small"
//       variant="outlined"
//       placeholder={placeholder}
//       type={type}
//       multiline={multiline}
//       rows={rows}
//       InputLabelProps={{ shrink: true }}
//     />
//   </Box>
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
//           <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', color: '#1e40af' }}>
//               <RateReviewIcon sx={{ fontSize: 32, mr: 1, color: '#3b82f6' }} />
//               <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1e293b' }}>
//                 Feedback Form
//               </Typography>
//             </Box>
            
//             {/* Document Details from Top Right of PDF */}
//             <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, color: '#64748b', fontSize: '0.8rem' }}>
//               <Typography variant="caption" display="block">Doc. No.: UGES-MR-F-19</Typography>
//               <Typography variant="caption" display="block">Rev. No.: 00</Typography>
//               <Typography variant="caption" display="block">Eff. Dt.: 01/08/2020</Typography>
//             </Box>
//           </Box>

//           <Divider sx={{ mb: 4 }} />

//           {/* Section A: General Details */}
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
//             <Typography variant="body2" sx={{ mb: 2, color: '#64748b' }}>(Please tick whichever is applicable)</Typography>
            
//             <FormGroup>
//               <Grid container spacing={1}>
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
//                      <TextField fullWidth size="small" placeholder="Please specify other services..." variant="standard" />
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
            
//             {/* Title / Description Field (Moved inside box for cleaner look) */}
//             <Box sx={{ mb: 3 }}>
//                 <FormInput label="Title/ Description" />
//             </Box>

//             {/* Ratings Header row */}
//             <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end', borderBottom: '2px solid #e2e8f0', pb: 1, mb: 1, px: 2 }}>
//                <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>Score Ratings</Typography>
//             </Box>

//             <RatingRow label="Knowledge and Command UGES" value={ratings.knowledge} onChange={handleRatingChange('knowledge')} />
//             <RatingRow label="Time/ Schedule Compliance" value={ratings.time} onChange={handleRatingChange('time')} />
//             <RatingRow label="Quality of Service" value={ratings.quality} onChange={handleRatingChange('quality')} />
//             <RatingRow label="Clarification of queries" value={ratings.queries} onChange={handleRatingChange('queries')} />
//             <RatingRow label="EHS Practices and Compliances" value={ratings.ehs} onChange={handleRatingChange('ehs')} />
//             <RatingRow label="Reporting Structure" value={ratings.reporting} onChange={handleRatingChange('reporting')} />

//             {/* Average Display */}
//             <Box sx={{ mt: 3, p: 2, bgcolor: '#f8fafc', borderRadius: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Average of overall Feedback:</Typography>
//               <Typography variant="h5" sx={{ color: '#2563eb' }}>{average}</Typography>
//             </Box>
//           </Box>

//           {/* Bottom Footer Details */}
//           <Typography variant="body2" sx={{ color: '#64748b', mb: 3, fontStyle: 'italic' }}>
//             (In case of confidential feedback: you may write to "enquiry@uges.co.in")
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormInput label="Name of Participants (Optional)" />
//             </Grid>
//             <Grid item xs={12}>
//               <FormInput 
//                 label={`Please Give below your Suggestions for Improvement ${isSuggestionMandatory ? '(Mandatory because an assessment is below 6)' : '(*Mandatory if assessment is below 6)'}`}
//                 multiline 
//                 rows={1}
                
//                 required={isSuggestionMandatory}
//               />
//             </Grid>
//           </Grid>

//           {/* Signature Block */}
//           <Box sx={{ mt: 5, p: 3, bgcolor: '#fafafa', borderRadius: 2, border: '1px solid #e2e8f0', width: { xs: '100%', md: '50%' } }}>
//             <Typography variant="subtitle2" sx={{ color: '#1e293b', mb: 3 }}>Authorization</Typography>
//             <FormInput label="Name" />
//             <FormInput label="Date" type="date" />
//           </Box>

          

//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// }