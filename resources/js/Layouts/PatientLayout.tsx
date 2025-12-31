import { Footer } from '@/Components/layout/Footer';
import { Navbar } from '@/Components/layout/Navbar';
import { Head } from '@inertiajs/react';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Head title="Cantika Dental Care">
                <meta
                    name="description"
                    content="Webiste booking Dental Care "
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
