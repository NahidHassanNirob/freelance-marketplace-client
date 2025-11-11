import { create } from 'zustand';

export const useJobStore = create((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs }),
  
  acceptedTasks: JSON.parse(localStorage.getItem('acceptedTasks') || '[]'),
  
  addAcceptedTask: (jobId) => set((state) => {
    const newTasks = [...state.acceptedTasks, { jobId, acceptedAt: new Date().toISOString() }];
    localStorage.setItem('acceptedTasks', JSON.stringify(newTasks));
    return { acceptedTasks: newTasks };
  }),
  
  removeAcceptedTask: (jobId) => set((state) => {
    const newTasks = state.acceptedTasks.filter(task => task.jobId !== jobId);
    localStorage.setItem('acceptedTasks', JSON.stringify(newTasks));
    return { acceptedTasks: newTasks };
  }),
}));
