interface Doctor {
    id: string,
    name: string,
    bio: string
    specialty: string,
    image: string,
    qualification: string,
    email: string,
    experience: number
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