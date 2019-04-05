import AppStore from './AppStore';

export default function() {
  const useLocalStorage = true;
  return { appStore: new AppStore(useLocalStorage) };
}
