import { ServiceCard, ServiceData } from './ServiceCard';

const servicesData: ServiceData[] = [
    {
        id: '1',
        icon: 'auto_awesome',
        title: 'Pemutihan Gigi',
        description:
            'Cerahkan senyum Anda dengan aman menggunakan perawatan pemutihan canggih kami untuk hasil instan.',
        category: 'cosmetic',
    },
    {
        id: '2',
        icon: 'medical_services',
        title: 'Implan Gigi',
        description:
            'Solusi permanen dan tampak alami untuk gigi yang hilang dengan fungsi penuh.',
        category: 'general',
    },
    {
        id: '3',
        icon: 'healing',
        title: 'Perawatan Saluran Akar',
        description:
            'Selamatkan gigi alami Anda dengan teknik terapi saluran akar modern tanpa rasa sakit.',
        category: 'general',
    },
    {
        id: '4',
        icon: 'grid_on',
        title: 'Kawat Gigi & Aligner',
        description:
            'Luruskan gigi Anda secara efektif dengan kawat gigi tradisional atau aligner transparan.',
        category: 'orthodontics',
    },
    {
        id: '5',
        icon: 'child_care',
        title: 'Kedokteran Gigi Anak',
        description:
            'Perawatan gigi lembut yang dirancang khusus untuk kenyamanan dan kesehatan jangka panjang anak.',
        category: 'pediatric',
    },
    {
        id: '6',
        icon: 'dentistry',
        title: 'Scaling Rutin',
        description:
            'Pembersihan profesional untuk menghilangkan plak dan karang gigi untuk menjaga kesehatan gusi dan gigi.',
        category: 'general',
    },
    {
        id: '7',
        icon: 'diamond',
        title: 'Veneer Gigi',
        description:
            'Lapisan tipis porselen untuk menyempurnakan bentuk, warna, dan ukuran gigi Anda.',
        category: 'cosmetic',
    },
    {
        id: '8',
        icon: 'local_hospital',
        title: 'Cabut Gigi',
        description:
            'Pencabutan gigi yang aman dan nyaman dengan teknik minimal invasif.',
        category: 'general',
    },
    {
        id: '9',
        icon: 'sentiment_satisfied',
        title: 'Tambal Gigi',
        description:
            'Perbaikan gigi berlubang dengan bahan tambal berkualitas tinggi yang tahan lama.',
        category: 'general',
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
