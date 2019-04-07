import AppStore, { IAppStoreData } from './AppStore';
import { getDataFromStorage, saveDataToStorage } from '../utils/StorageUtils';

const LOCAL_STORAGE_KEY = 'calorie-counter-data';

export default function() {
  const localData = getDataFromStorage(LOCAL_STORAGE_KEY);
  const onDataChange = (data: IAppStoreData) =>
    saveDataToStorage(LOCAL_STORAGE_KEY, data);

  return { appStore: new AppStore(localData, onDataChange) };
}
