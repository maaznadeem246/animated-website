import { useContext } from 'react';
import appData from '../contexts/appDataContext';

const useAppData = () => useContext(appData);

export default useAppData;