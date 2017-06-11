/**
 * Created by M on 11/06/17. With ❤
 */

import {NativeModules, DeviceEventEmitter, Platform} from 'react-native';

const FusedLocation = NativeModules.FusedLocation;
const eventNames = ['fusedLocation', 'fusedLocationError'];

const Location = {
    getFusedLocation: FusedLocation.getFusedLocation,
    startLocationUpdates: FusedLocation.startLocationUpdates,
    stopLocationUpdates: FusedLocation.stopLocationUpdates,
    on: (eventName, cb) => {
        if (eventNames.indexOf(eventName) === -1) {
            throw new Error('Event name has to be one of \'fusedLocationUpdate\' or \'fusedLocationErr\'');
        }
        return {listener: DeviceEventEmitter.addListener(eventName, cb).listener, eventName};
    },
    off: subscription => DeviceEventEmitter.removeListener(subscription.eventName, subscription.listener),
    setLocationPriority: priority => {
        if (priority < 0 || priority > 3) {
            throw new Error('Invalid priority set for fused api');
        }
        FusedLocation.setLocationPriority(priority);
    },
    setLocationInterval: FusedLocation.setLocationInterval,
    setFastestLocationInterval: FusedLocation.setFastestLocationInterval,
    setSmallestDisplacement: FusedLocation.setSmallestDisplacement,
    Constants: {
        HIGH_ACCURACY: 0,
        BALANCED: 1,
        LOW_POWER: 2,
        NO_POWER: 3
    }
};

const Dumb = {
    getFusedLocation: () => console.warn('Fused location cannot be used for iOS.'),
    startLocationUpdates: () => console.warn('Fused location cannot be used for iOS.'),
    stopLocationUpdates: () => console.warn('Fused location cannot be used for iOS.'),
    on: () => console.warn('Fused location cannot be used for iOS.'),
    off: () => console.warn('Fused location cannot be used for iOS.'),
    setLocationPriority: () => console.warn('Fused location cannot be used for iOS.'),
    setLocationInterval: () => console.warn('Fused location cannot be used for iOS.'),
    setFastestLocationInterval: () => console.warn('Fused location cannot be used for iOS.'),
    setSmallestDisplacement: () => console.warn('Fused location cannot be used for iOS.'),
};

export default Platform === 'ios' ? Dumb : Location;