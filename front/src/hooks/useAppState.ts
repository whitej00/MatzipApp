import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

function useAppState() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isComeback, setIsComeBack] = useState(false);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsComeBack(true);
      }

      if(appState.current.match(/active/) && nextAppState === 'background') {
        setIsComeBack(false);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {isComeback, appStateVisible};
}

export {useAppState};