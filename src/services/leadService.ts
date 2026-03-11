/**
 * leadService.ts
 * Manejo de leads y solicitudes de proyectos en Firestore.
 */

import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArchitectProject } from './geminiService';

export interface ProjectLead {
    userId?: string;
    userEmail?: string;
    userName?: string;
    project: ArchitectProject;
    status: 'pending' | 'reviewed' | 'contacted';
}

export const saveProjectLead = async (leadData: ProjectLead): Promise<{ success: boolean; id?: string; error?: string }> => {
    try {
        const docRef = await addDoc(collection(db, 'leads_proyectos'), {
            ...leadData,
            createdAt: serverTimestamp(),
        });

        console.log("Lead de proyecto guardado con ID:", docRef.id);

        return {
            success: true,
            id: docRef.id
        };
    } catch (error: any) {
        console.error("Error al guardar lead de proyecto:", error);
        return {
            success: false,
            error: error.message
        };
    }
};
