import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Search from '../Search/index';

export default function ReferenceDateDefaultBehavior() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DemoItem label="Data Inicial">
          <DatePicker/>
        </DemoItem>
        <DemoItem label="Data Final">
          <DatePicker />
        </DemoItem>
   
        
      </DemoContainer>
    </LocalizationProvider>
  );
}