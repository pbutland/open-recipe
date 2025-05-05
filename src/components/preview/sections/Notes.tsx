import React from 'react';
import { Divider, Typography } from '@mui/material';
import LabelValue from './LabelValue';
import Note from '../../../types/Note';

const Notes: React.FC<{ notes: Note[] | undefined }> = ({ notes }) => {
  return (
    <div>
      {notes !== undefined && notes.length > 0 && (
        <Typography id="preview-recipe-notes-title" variant="h5" color="primary">
          Notes
        </Typography>
      )}
      {notes?.map(note => {
        const step = note.index !== undefined ? `Note ${note.index}` : '';
        return <LabelValue label={step} value={note.text} />
      })}
      {notes && notes.length > 0 && (<Divider />)}
    </div>
  );
};

export default Notes;
