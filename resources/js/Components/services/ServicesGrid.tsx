import { ServiceCard, ServiceData } from './ServiceCard';

const servicesData: ServiceData[] = [
    {
        id: '1',
        icon: 'medication',
        title: 'Pengobatan Sakit Gigi',
        description:
            'Penanganan berbagai keluhan sakit gigi dengan metode yang tepat dan aman.',
        category: 'general',
    },
    {
        id: '2',
        icon: 'local_hospital',
        title: 'Cabut Gigi Anak / Dewasa',
        description:
            'Pencabutan gigi yang aman dan nyaman untuk anak-anak maupun dewasa.',
        category: 'general',
    },
    {
        id: '3',
        icon: 'healing',
        title: 'Perawatan Syaraf Gigi dan Tambal Sementara',
        description:
            'Perawatan saluran akar gigi untuk mengatasi infeksi dan rasa nyeri.',
        category: 'general',
    },
    {
        id: '4',
        icon: 'sentiment_satisfied',
        title: 'Tambal Gigi Permanen',
        description:
            'Perbaikan gigi berlubang dengan bahan tambal berkualitas tinggi yang tahan lama.',
        category: 'general',
    },
    {
        id: '5',
        icon: 'dentistry',
        title: 'Scalling / Membersihkan Karang Gigi',
        description:
            'Pembersihan profesional untuk menghilangkan plak dan karang gigi.',
        category: 'general',
    },
    {
        id: '6',
        icon: 'medical_services',
        title: 'Pembuatan Gigi Palsu',
        description:
            'Solusi untuk gigi yang hilang dengan gigi palsu yang nyaman dan tampak alami.',
        category: 'general',
    },
    {
        id: '7',
        icon: 'grid_on',
        title: 'Bracket / Behel / Kawat Gigi',
        description:
            'Luruskan gigi Anda secara efektif dengan kawat gigi untuk senyum yang lebih rapi.',
        category: 'orthodontics',
    },
    {
        id: '8',
        icon: 'auto_awesome',
        title: 'Bleaching / Memutihkan Gigi',
        description:
            'Cerahkan senyum Anda dengan perawatan pemutihan gigi yang aman dan efektif.',
        category: 'cosmetic',
    },
    {
        id: '9',
        icon: 'diamond',
        title: 'Pasang Diamond Gigi',
        description:
            'Tambahkan aksen berlian pada gigi untuk tampilan yang lebih menarik dan stylish.',
        category: 'cosmetic',
    },
];

interface ServicesGridProps {
    selectedCategory: string;
}

export function ServicesGrid({ selectedCategory }: ServicesGridProps) {
    const filteredServices =
        selectedCategory === 'all'
            ? servicesData
            : servicesData.filter(
                  (service) => service.category === selectedCategory,
              );

    return (
        <section className="flex w-full justify-center px-4 pb-20 md:px-10">
            <div className="w-full max-w-[960px]">
                {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredServices.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <span className="material-symbols-outlined mb-4 text-6xl text-gray-300">
                            search_off
                        </span>
                        <p className="text-gray-500">
                            Tidak ada layanan ditemukan untuk kategori ini.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
