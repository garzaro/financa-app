import React from 'react';
import { Box, Typography, IconButton, Paper, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CloseIcon from '@mui/icons-material/Close';
import {LiaBroomSolid} from "react-icons/lia";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const StickyHeader = ({ 
  filtersLabel, 
  onSearchClick, 
  onAddClick, 
  onClearClick, 
  onCancelClick,
  onSummaryClick 
}) => {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100, 
        borderRadius: 0,
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      {/* Line 1: Filter Summary */}
      <Box 
        onClick={onSummaryClick}
        sx={{ 
          py: 1, 
          px: 2, 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          cursor: 'pointer',
          '&:active': { backgroundColor: 'action.hover' }
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'primary.main', textAlign: 'center' }}>
          {filtersLabel || 'Toque para filtrar...'}
        </Typography>
      </Box>

      {/* Line 2: Actions */}
      <Stack 
        direction="row" 
        justifyContent="space-around" 
        alignItems="center" 
        sx={{ py: 0.5 }}
      >
        <IconButton onClick={onSearchClick} color="primary" aria-label="BUSCAR" sx={{ minWidth: 44, minHeight: 44 }}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={onClearClick} color="secondary" aria-label="LIMPAR" sx={{ minWidth: 44, minHeight: 44 }}>
          {/*<DeleteSweepIcon />*/}
          <CleaningServicesIcon size="small" />
          <LiaBroomSolid />
        </IconButton>
        <IconButton onClick={onCancelClick} color="default" aria-label="CANCELAR" sx={{ minWidth: 44, minHeight: 44 }}>
          <CloseIcon />
        </IconButton>
        <IconButton onClick={onAddClick} color="success" aria-label="ADICIONAR" sx={{ minWidth: 44, minHeight: 44 }}>
          <AddIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default StickyHeader;
