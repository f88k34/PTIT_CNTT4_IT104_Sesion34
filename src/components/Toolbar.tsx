import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

interface ToolbarProps {
  keyword: string;
  onSearch: (keyword: string) => void;
  onAdd: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ keyword, onSearch, onAdd }) => {
  const [localKeyword, setLocalKeyword] = useState(keyword);
  React.useEffect(() => {
    setLocalKeyword(keyword);
  }, [keyword]);
  const handleSearch = () => {
    onSearch(localKeyword.trim());
  
  };
  

  return (
    <div className="flex justify-between mb-4">
      <Button variant="contained" color="primary" onClick={onAdd}>
        Thêm mới sinh viên
      </Button>
      <div className="flex gap-2">
        <TextField
          size="small"
          placeholder="Tìm kiếm"
          value={localKeyword}
          onChange={(e) => setLocalKeyword(e.target.value)}
        
        />
        <Button
          variant="outlined"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
        <Button variant="outlined" disabled>
          Sắp xếp
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;