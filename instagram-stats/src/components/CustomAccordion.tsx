import * as React from 'react';
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CustomAccordionProps {
    items: {label: string, content: React.ReactNode}[];

}
export const CustomAccordion: React.FC<CustomAccordionProps> = ({items}) => {
  return (
    <div>
     {items.map((item, index) => (
        <Accordion defaultExpanded key={index}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header" 
        >
          <Typography sx={{fontWeight: "bold"}} component="span">{item.label}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item.content}
        </AccordionDetails>
      </Accordion>
     )) }
    </div>
  );
}
