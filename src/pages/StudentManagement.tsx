import type { Student } from '../utils/types';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import Toolbar from '../components/Toolbar';
import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StudentManagement = () => {
  const studentList = useSelector((state: any) => state.student);
  const dispatch = useDispatch();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleAddStudent = (student: Student) => {
    dispatch({ type: 'ADD', payload: student });
    setIsFormOpen(false);
  };

  const handleUpdateStudent = (student: Student) => {
    dispatch({ type: 'UPDATE', payload: student });
    setStudentToEdit(null);
    setIsFormOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (studentToEdit && studentToEdit.id === id) {
      handleCloseForm();
    }
    dispatch({ type: 'DELETE', payload: id });
  };

  const handleStartEdit = (student: Student) => {
    setStudentToEdit(student);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setStudentToEdit(null);
    setIsFormOpen(false);
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const filteredStudents = useMemo(() => {
    if (!searchKeyword) {
      return studentList;
    }
    return studentList.filter((student: Student) =>
      student.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [studentList, searchKeyword]);

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar
          keyword={searchKeyword}
          onSearch={handleSearch}
          onAdd={() => setIsFormOpen(true)}
        />
        <StudentList students={filteredStudents} onEdit={handleStartEdit} onDelete={handleDeleteStudent} />
      </div>
      {isFormOpen && (
        <StudentForm
          students={studentList}
          initialData={studentToEdit}
          onSubmit={studentToEdit ? handleUpdateStudent : handleAddStudent}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default StudentManagement;
