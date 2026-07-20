import mockData from "../data/mockData";

export const fetchSchedulerData = async () => {
   return new Promise(resolve => {
      setTimeout(() => {
          resolve(mockData);
      }, 500);
   });
};