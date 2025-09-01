export interface EducationItem {
    id: string | number;
    school: string;
    degree: string;
    field: string;
    startDate: string;        // ISO date string
    endDate?: string | null;  // null => Present
    location?: string;
    gpa?: string;
    highlights?: string[];
    logoUrl?: string;
}
