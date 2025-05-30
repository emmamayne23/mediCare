interface Doctor {
    id: string,
    name: string,
    bio: string
    specialty: string,
    image: string,
    profileImage: string,
    qualification: string,
    qualifications: string,
    email: string,
    experience: number,
    rating: number,
    phone: string
}

interface HomeCard {
    icon: React.ReactNode,
    title: string,
    subtitle: string
}

interface HealthBlogs {
    id: number;
    image: string | null | undefined;
    title: string;
    category: string;
    publisherName: string;
    description: string;
}

interface Specialties {
    id: string,
    specialty: string,
    description: string,
    icon_url :string,
}

interface SpecialtyDoctors {
    id: string,
    name: string,
    specialty: string,
    img: string,
    yearsExperience: number,
    qualifications: string
}

interface DoctorDetails {
    id: string,
    name: string,
    bio: string,
    qualifications: string,
    profileImage: string,
    experience: number,
    specialty: string,
    available: boolean,
}

interface Slots {
    id: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    isBooked: boolean | null
}

interface Timebook {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    doctorId: string;
    doctorName: string | null;
    doctorImage: string | null;
    doctorQualifications: string | null;
    doctorSpecialty: string | null;
}

interface UserProfile {
    id: string,
    name: string,
    email: string,
    profileImage: string
}

interface AllAppointments {
    appointmentId: string;
    status: "confirmed" | "cancelled" | "completed";
    doctorName: string;
    doctorProfileImage: string | null;
    appointmentDate: string;
    appointmentTime: string;
    specialty: string;
}