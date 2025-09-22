import type { Student } from '../utils/types';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import Toolbar from '../components/Toolbar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const studentList = useSelector((store: any) => {
    console.log(store);
    return store.student;
  });
    
  useEffect(() => {
    setStudents(studentList);
  }, []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleAddStudent = (student: Student) => {
    setStudents([...students, student]);
    setIsFormOpen(false);
  };
  const handleSearch = (keyword: string) => {
    setStudents((prev) =>
      prev.filter((s) => s.name.toLowerCase().includes(keyword.toLowerCase())),
    );
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1">
        <Toolbar onSearch={handleSearch} onAdd={() => setIsFormOpen(true)} />
        <StudentList students={students} />
      </div>
      {isFormOpen && (
        <StudentForm
          onSubmit={handleAddStudent}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentManagement;
