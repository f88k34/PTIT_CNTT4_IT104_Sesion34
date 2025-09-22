import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from '@mui/material';

import React, { useEffect, useRef } from 'react';
import type { Student } from '../utils/types';
import CloseIcon from '@mui/icons-material/Close';

interface StudentFormProps {
  students: Student[];
  initialData: Student | null;
  onSubmit: (student: Student) => void;
  onClose: () => void;
}

const STUDENT: Student = {
  id: '',
  name: '',
  age: 0,
  gender: 'Nam',
  birthday: '',
  hometown: '',
  address: '',
};

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type FormChangeEvent = InputChangeEvent | SelectChangeEvent;

const StudentForm: React.FC<StudentFormProps> = ({ students, initialData, onSubmit, onClose }) => {
  const [form, setForm] = React.useState<Student>(STUDENT);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Student, string>>>({});
  const idInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(STUDENT);
    }
    setErrors({});
  }, [initialData]);

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = () => {
    const newErrors: Partial<Record<keyof Student, string>> = {};

    if (!isEditMode) {
      if (!form.id.trim()) {
        newErrors.id = 'Mã sinh viên không được để trống';
      } else if (students.some((s) => s.id === form.id)) {
        newErrors.id = 'Mã sinh viên không được phép trùng';
      }
    }

    if (!form.name.trim()) {
      newErrors.name = 'Tên sinh viên không được để trống';
    } else if (students.some((s) => s.name === form.name && s.id !== form.id)) {
      newErrors.name = 'Tên sinh viên không được phép trùng';
    }

    if (form.age <= 0) {
      newErrors.age = 'Tuổi của sinh viên phải lớn hơn 0';
    }

    if (!form.birthday) {
      newErrors.birthday = 'Ngày sinh không được để trống';
    } else {
      const birthDate = new Date(form.birthday);
      const today = new Date();
      if (birthDate > today) {
        newErrors.birthday = 'Ngày sinh không được là ngày trong tương lai';
      }
    }

    if (!form.hometown.trim()) {
      newErrors.hometown = 'Nơi sinh không được để trống';
    }

    if (!form.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit(form);
    if (!isEditMode) {
      setForm(STUDENT);
      idInputRef.current?.focus();
    }
  };

  return (
    <div className="w-1/3 p-4 border rounded-xl shadow relative">
      <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      <h2 className="font-semibold mb-4">{isEditMode ? 'Cập Nhật Sinh Viên' : 'Thông Tin Sinh Viên'}</h2>
      <div className="flex flex-col gap-4">
        <TextField
          label="Mã sinh viên"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
          inputRef={idInputRef}
          error={!!errors.id}
          helperText={errors.id}
          disabled={isEditMode}
        />
        <TextField
          label="Tên sinh viên"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Tuổi"
          name="age"
          type="number"
          value={form.age}
          onChange={handleChange}
          fullWidth
          error={!!errors.age}
          helperText={errors.age}
        />
        <Select name="gender" value={form.gender} onChange={handleChange} fullWidth>
          <MenuItem value="Nam">Nam</MenuItem>
          <MenuItem value="Nữ">Nữ</MenuItem>
        </Select>
        <TextField
          type="date"
          label="Ngày sinh"
          name="birthday"
          value={form.birthday}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors.birthday}
          helperText={errors.birthday}
        />
        <TextField
          label="Nơi sinh"
          name="hometown"
          value={form.hometown}
          onChange={handleChange}
          fullWidth
          error={!!errors.hometown}
          helperText={errors.hometown}
        />
        <TextField
          label="Địa chỉ"
          name="address"
          value={form.address}
          onChange={handleChange}
          fullWidth
          error={!!errors.address}
          helperText={errors.address}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default StudentForm;
