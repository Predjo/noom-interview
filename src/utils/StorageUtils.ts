import { IAppStoreData } from '../stores/AppStore';

export function dataToJSON(data: IAppStoreData) {
  return JSON.stringify(data);
}

export function JSONtoData(json: string) {
  try {
    const data = JSON.parse(json) as IAppStoreData;
    return data;
  } catch (e) {
    return undefined;
  }
}

export function getDataFromStorage(storageKey: string) {
  const json = window.localStorage.getItem(storageKey);
  const data = JSONtoData(json || '');

  if (data && data.dayList && data.dayList.length) {
    return data;
  }

  return undefined;
}

export function saveDataToStorage(storageKey: string, data: IAppStoreData) {
  const json = dataToJSON(data);
  window.localStorage.setItem(storageKey, json);
}
