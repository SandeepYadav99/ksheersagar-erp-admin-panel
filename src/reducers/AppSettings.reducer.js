/**
 * Created by charnjeetelectrovese@gmail.com on 5/1/2020.
 */

import {
    APP_SETTINGS_UPDATE_GEOFENCE,
    APP_SETTINGS_DONE,
    APP_SETTINGS_INIT, APP_SETTINGS_CHANGE_THEME,APP_SETTINGS_UPDATE_POLICIES
} from "../actions/AppSettings.action";

const initialState = {
    error: false,
    is_calling: true,
    geofence: [],
    theme: 'dark',
    TERMS: '',
    PRIVACY: '',
    ACCEPTABLE_USE: '',
    COOKIES: '',
};

export default function (state = JSON.parse(JSON.stringify(initialState)), action) {
    switch (action.type) {
        case APP_SETTINGS_INIT: {
            return {...state, is_calling: true };
        }
        case APP_SETTINGS_DONE: {
            return {
                ...state,
                ...action.payload,
                is_calling: false
            }
        }
        case APP_SETTINGS_UPDATE_GEOFENCE: {
            if (action.payload) {
                return {...state, geofence: action.payload};
            }
        }
        case APP_SETTINGS_CHANGE_THEME: {
            if (action.payload) {
                return {...state, theme: action.payload};
            }
        }
        case APP_SETTINGS_UPDATE_POLICIES: {
            if (action.payload) {

                const { name, value } = action.payload;
                const data = JSON.parse(JSON.stringify(state));
                data[name] = value;
                return {
                    ...state,
                    ...data
                };
            }
        }
        default: {
            return state;
        }
    }
    return state;
}
