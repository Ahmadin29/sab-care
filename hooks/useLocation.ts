import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';

export default function useLocation() {

    const [isLocationGranted,setIsLocationGranted] = useState(false);
    const [currentPosition,setCurrentPosition] = useState<any>();

    const requestLocation = useCallback(async()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setIsLocationGranted(false);
            return;
        }

        setIsLocationGranted(true);
        let location = await Location.getCurrentPositionAsync({});
        setCurrentPosition(location);
    },[])

    useEffect(() => {
        requestLocation()
    }, []);

    return{
        isLocationGranted,
        currentPosition,
    }
}