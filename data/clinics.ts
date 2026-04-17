export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  rating?: number;
  featured: boolean;
  description?: string;
  services?: string[];
}

export const clinics: Clinic[] = [
  {
    id: '1',
    name: 'PhysioRehab Group',
    address: 'Brampton, ON',
    phone: '+1 (647) 490-4541',
    website: 'https://prgbrampton.ca/',
    latitude: 43.7315,
    longitude: -79.7624,
    rating: 4.7,
    featured: true,
    description:
      'PhysioRehab Group offers comprehensive physiotherapy and rehabilitation services in Brampton. Our team of experienced therapists provides personalized treatment plans.',
    services: ['Physiotherapy', 'Rehabilitation', 'Sports Injury', 'Manual Therapy'],
  },
  {
    id: '2',
    name: 'Brampton Physiotherapy + Wellness Institute',
    address: '160 Main St S Unit #6, Brampton, ON L6W 2E1',
    phone: '(416) 800-0762',
    website: 'https://bramptonphysio.ca/',
    latitude: 43.6896,
    longitude: -79.7592,
    rating: 4.5,
    featured: true,
    description:
      'A full-service physiotherapy and wellness clinic offering a wide range of treatments to help you recover from injury and improve your overall well-being.',
    services: ['Physiotherapy', 'Wellness', 'Acupuncture', 'Massage Therapy'],
  },
  {
    id: '3',
    name: 'Regain Rehab Centre',
    address: '6475 Mayfield Rd #107, Brampton, ON L6P 4N2',
    phone: '+1 905-793-9993',
    website: 'https://regainrehab.com/',
    latitude: 43.7785,
    longitude: -79.7998,
    rating: 4.6,
    featured: false,
    description:
      'Regain Rehab Centre specializes in helping patients recover from injuries and surgeries with state-of-the-art equipment and evidence-based treatment approaches.',
    services: ['Physiotherapy', 'Occupational Therapy', 'Chiropractic', 'Massage'],
  },
  {
    id: '4',
    name: 'CBI Health - Brampton Hurontario',
    address: '11670 Hurontario Street, Suite 1, Brampton, ON L7A 1R2',
    phone: '289-632-1700',
    website: 'https://www.cbihealth.ca/locations/brampton-hurontario',
    latitude: 43.7654,
    longitude: -79.8012,
    rating: 4.4,
    featured: false,
    description:
      'CBI Health is one of Canada\'s largest providers of healthcare services. Our Brampton Hurontario location offers a comprehensive range of rehabilitation services.',
    services: ['Physiotherapy', 'Occupational Therapy', 'Speech Therapy', 'Psychology'],
  },
  {
    id: '5',
    name: 'Physio Village Clinic',
    address: '10A-200 County Court Blvd, Brampton, ON',
    phone: '905-450-8800',
    website: 'https://www.physiovillage.ca/',
    latitude: 43.7123,
    longitude: -79.7401,
    rating: 4.8,
    featured: false,
    description:
      'Physio Village Clinic provides expert physiotherapy and rehabilitation services with a focus on personalized care and patient education.',
    services: ['Physiotherapy', 'Sports Rehab', 'Vestibular Therapy', 'Pelvic Floor'],
  },
  {
    id: '6',
    name: 'Health Plus Rehab Centre',
    address: 'Brampton, ON',
    phone: '905-794-3334',
    website: 'https://healthplusrehabcentre.com/',
    latitude: 43.7289,
    longitude: -79.7756,
    rating: 4.3,
    featured: false,
    description:
      'Health Plus Rehab Centre provides a holistic approach to rehabilitation with experienced therapists dedicated to your recovery journey.',
    services: ['Physiotherapy', 'Chiropractic', 'Massage Therapy', 'Acupuncture'],
  },
  {
    id: '7',
    name: 'Complete Rehab Centre',
    address: '10095 Bramalea Rd, Unit B7, Brampton, ON L6R 0K1',
    phone: '(905) 789-1290',
    website: 'https://completerehab.ca/',
    latitude: 43.7456,
    longitude: -79.7234,
    rating: 4.5,
    featured: false,
    description:
      'Complete Rehab Centre offers comprehensive rehabilitation services to help you return to your optimal level of function and well-being.',
    services: ['Physiotherapy', 'Kinesiology', 'Massage Therapy', 'Custom Orthotics'],
  },
  {
    id: '8',
    name: 'Brampton Ortho Neuro Physiocare',
    address: 'Brampton, ON',
    phone: '(905) 454-4975',
    website: 'https://www.bramptononphysio.com/',
    latitude: 43.7198,
    longitude: -79.7512,
    rating: 4.6,
    featured: false,
    description:
      'Specializing in orthopedic and neurological physiotherapy, we provide targeted treatment to help patients recover from complex injuries and conditions.',
    services: ['Orthopedic Physio', 'Neurological Rehab', 'Post-Surgical', 'Chronic Pain'],
  },
  {
    id: '9',
    name: 'Complete Physio & Sports Rehab',
    address: '2250 Bovaird Dr E, Unit 112, Brampton, ON L6R 0W3',
    phone: '(905) 595-2848',
    website: 'https://www.completephysiorehab.ca/',
    latitude: 43.7512,
    longitude: -79.7389,
    rating: 4.7,
    featured: false,
    description:
      'A specialized sports rehabilitation clinic offering cutting-edge treatments for athletes and active individuals looking to recover faster and perform better.',
    services: ['Sports Physio', 'Sports Massage', 'Injury Prevention', 'Performance Training'],
  },
  {
    id: '10',
    name: 'Physio Movement',
    address: 'Brampton, ON',
    phone: '',
    website: 'https://www.physiomovement.ca/',
    latitude: 43.7345,
    longitude: -79.7678,
    rating: 4.5,
    featured: false,
    description:
      'Physio Movement is dedicated to helping you move better, feel better, and live better through expert physiotherapy and personalized rehabilitation programs.',
    services: ['Physiotherapy', 'Exercise Therapy', 'Manual Therapy', 'Dry Needling'],
  },
  {
    id: '11',
    name: 'Planet Rehab',
    address: '200 County Court Blvd, Unit C, Brampton, ON',
    phone: '',
    website: '',
    latitude: 43.7120,
    longitude: -79.7395,
    rating: 4.5,
    featured: false,
    description:
      'Planet Rehab offers physiotherapy and rehabilitation services conveniently located on County Court Blvd in Brampton.',
    services: ['Physiotherapy', 'Rehabilitation', 'Massage Therapy'],
  },
  {
    id: '12',
    name: 'Heal360 Physio & Rehab',
    address: '284 Queen St E UNIT #215, Brampton, ON L6V 1C2',
    phone: '(905) 455-6699',
    website: '',
    latitude: 43.6912,
    longitude: -79.7567,
    rating: 4.4,
    featured: false,
    description:
      'Heal360 Physio & Rehab provides comprehensive physiotherapy and rehabilitation services to help patients recover from injuries and improve their quality of life.',
    services: ['Physiotherapy', 'Rehabilitation', 'Chiropractic', 'Massage Therapy'],
  },
  {
    id: '13',
    name: 'Progressive Rehab',
    address: 'Brampton, ON',
    phone: '(905) 970-8100',
    website: 'https://www.progressiverehab.ca/',
    latitude: 43.7267,
    longitude: -79.7712,
    rating: 4.3,
    featured: false,
    description:
      'Progressive Rehab offers evidence-based physiotherapy and rehabilitation programs tailored to each patient\'s unique needs and recovery goals.',
    services: ['Physiotherapy', 'Occupational Therapy', 'Massage Therapy', 'Acupuncture'],
  },
  {
    id: '14',
    name: 'MedRehab Group Physiotherapy – Brampton',
    address: '10 Earlsbridge Blvd, Unit 4, Brampton, ON',
    phone: '(289) 276-5248',
    website: '',
    latitude: 43.7489,
    longitude: -79.7834,
    rating: 4.5,
    featured: false,
    description:
      'MedRehab Group provides multidisciplinary physiotherapy services including assessment and treatment of musculoskeletal injuries and chronic conditions.',
    services: ['Physiotherapy', 'Chiropractic', 'Kinesiology', 'Massage Therapy'],
  },
  {
    id: '15',
    name: 'Care Plus Physiotherapy',
    address: '15 Fandor Way, Brampton, ON',
    phone: '(905) 840-2800',
    website: '',
    latitude: 43.7598,
    longitude: -79.8123,
    rating: 4.6,
    featured: false,
    description:
      'Care Plus Physiotherapy delivers patient-centered care with a team of highly skilled therapists focused on restoring function and reducing pain.',
    services: ['Physiotherapy', 'Sports Rehabilitation', 'Manual Therapy', 'Acupuncture'],
  },
  {
    id: '16',
    name: 'Health Plus Physiotherapy',
    address: 'Brampton, ON',
    phone: '',
    website: 'https://healthplusphysiotherapy.ca/',
    latitude: 43.7356,
    longitude: -79.7891,
    rating: 4.4,
    featured: false,
    description:
      'Health Plus Physiotherapy has multiple locations across Brampton, offering a wide range of physiotherapy and wellness services for all ages.',
    services: ['Physiotherapy', 'Wellness', 'Massage Therapy', 'Custom Orthotics'],
  },
  {
    id: '17',
    name: 'Sandalwood Physiotherapy & Wellness Centre',
    address: 'Brampton, ON (Sandalwood area)',
    phone: '',
    website: '',
    latitude: 43.7712,
    longitude: -79.7956,
    rating: 4.3,
    featured: false,
    description:
      'Sandalwood Physiotherapy & Wellness Centre serves the Sandalwood community in Brampton, providing personalized physiotherapy and wellness programs.',
    services: ['Physiotherapy', 'Wellness', 'Rehabilitation', 'Massage Therapy'],
  },
];

export const getFeaturedClinics = (): Clinic[] => clinics.filter((c) => c.featured);

export const getClinicById = (id: string): Clinic | undefined =>
  clinics.find((c) => c.id === id);

export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
};

export const getClinicsWithDistance = (
  userLat: number,
  userLng: number
): (Clinic & { distance: number })[] => {
  return clinics
    .map((clinic) => ({
      ...clinic,
      distance: getDistance(userLat, userLng, clinic.latitude, clinic.longitude),
    }))
    .sort((a, b) => a.distance - b.distance);
};
