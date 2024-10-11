import { create } from 'zustand';

interface Coursework {
  id: string;
  title: string;
  type: string;
  subject: string;
  file: File;
  wordCount: number;
}

interface CourseworkState {
  courseworkList: Coursework[];
  addCoursework: (coursework: Coursework) => void;
  removeCoursework: (id: string) => void;
}

const useCourseworkStore = create<CourseworkState>((set) => ({
  courseworkList: [],
  addCoursework: (coursework) => set((state) => ({
    courseworkList: [...state.courseworkList, coursework],
  })),
  removeCoursework: (id: string) => set((state) => ({
    courseworkList: state.courseworkList.filter((cw) => cw.id !== id),
  })),
}));

export default useCourseworkStore;
