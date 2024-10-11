import { create } from 'zustand';

interface UploadFile {
  name: string;
  size: number;
  type: string;
}

interface UploadStore {
  uploadedFiles: UploadFile[];
  addFile: (file: UploadFile) => void;
}

const useUploadStore = create<UploadStore>((set) => ({
  uploadedFiles: [],
  addFile: (file) => set((state) => {
    // Check if the file already exists in the store
    if (state.uploadedFiles.some(existingFile => existingFile.name === file.name)) {
      return state;
    }
    const updatedFiles = [...state.uploadedFiles, file];
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
    return { uploadedFiles: updatedFiles };
  }),
}));

if (typeof window !== 'undefined') {
  const storedFiles = localStorage.getItem('uploadedFiles');
  if (storedFiles) {
    useUploadStore.setState({ uploadedFiles: JSON.parse(storedFiles) });
  }
}

export default useUploadStore;
