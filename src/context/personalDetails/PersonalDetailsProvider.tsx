"use client"
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { PersonalDetails, PersonalDetailsContextType, JobSeeker, Recruiter } from './types';
import { updateJobSeekerData, updateRecruiterData, updateRole ,getProgress,handlePreviousStep,handleNextStep} from './utils';
import { Role } from '@/constants/role';
import { Action } from './types';


const STORAGE_KEY = 'personalDetails';

const initialState: PersonalDetails = {
    role: undefined,
    jobSeeker: {
        experience: false,
        skills: [],
        education: [],
        prefrence: undefined,
        resume: undefined,
        resumeHeadline: undefined,
        tags: []
    },
    recruiter: {
        numberOfEmployees: undefined,
        companyAddress: undefined,
        companyDescription: undefined,
        companyLogo: undefined,
        companyName: undefined,
        companyWebsite: undefined,
        industryType: undefined,
    }
};

const PersonalDetailsContext = createContext<PersonalDetailsContextType | undefined>(undefined);


function reducer(state: PersonalDetails, action: Action): PersonalDetails {
    let newState: PersonalDetails;

    switch (action.type) {
        case 'SET_ROLE':
            newState = updateRole(state, action.payload);
            break;
        case 'UPDATE_JOB_SEEKER':
            newState = updateJobSeekerData(state, action.payload);
            break;
        case 'UPDATE_RECRUITER':
            newState = updateRecruiterData(state, action.payload);
            break;
        case 'INIT_FROM_STORAGE':
            newState = action.payload;
            break;
       
        default:
            return state;
    }


    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    }
    return newState;
}

export function PersonalDetailsProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsedData = JSON.parse(stored);
                    dispatch({ type: 'INIT_FROM_STORAGE', payload: parsedData });
                } catch (error) {
                    console.error('Error parsing stored personal details:', error);
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        }
    }, []);

    const setRole = (role: Role) => {
        dispatch({ type: 'SET_ROLE', payload: role });
    };

    const updateJobSeeker = (data: Partial<JobSeeker>) => {
        dispatch({ type: 'UPDATE_JOB_SEEKER', payload: data });
    };

    const updateRecruiter = (data: Partial<Recruiter>) => {
        dispatch({ type: 'UPDATE_RECRUITER', payload: data });
    };

    



    return (
        <PersonalDetailsContext.Provider
            value={{
                state,
                setRole,
                updateJobSeeker,
                updateRecruiter,
                handleNextStep,
                getProgress,
                handlePreviousStep
            }}
        >
            {children}
        </PersonalDetailsContext.Provider>
    );
}

export function usePersonalDetailsContext() {
    const context = useContext(PersonalDetailsContext);
    if (context === undefined) {
        throw new Error('usePersonalDetails must be used within a PersonalDetailsProvider');
    }
    return context;
} 