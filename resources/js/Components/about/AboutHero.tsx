export function AboutHero() {
    return (
        <section
            className="relative flex min-h-[400px] flex-col justify-center overflow-hidden bg-cover bg-center px-4 py-20"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKNJ0ELa-YHkLYSipdJfBV1MAQNCZqe4175r62vzbM1_t92Qe71RdpmyZ4QoYe6xTdF5Vnpzp_pc5P45qJVU26JEwkna0y5q4pJkoDIypb7TN7jCTMY99w2JG-K2e6c6dmi9k9Zp8QsVnaA6qwB2-OdDmVrUzQds-HejRVkvIk5AGSR630wtJAfmiB5sdYhc8gd6SvOzloD2s5YraEUnAnEe9Rta3UhB2BjEc8--MaNiM03MraQfAIeuPQIrZfSzWn0kkmBRqVeA6Q")`,
            }}
        >
            <div className="mx-auto flex w-full max-w-[960px] flex-col text-center">
                <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                    Mengenal Lebih Dekat Dental Clinic
                </h1>
                <h2 className="mx-auto max-w-2xl text-lg font-normal leading-normal text-white/90">
                    Dedikasi kami untuk senyum sehat keluarga Anda dengan
                    teknologi terkini dan pelayanan sepenuh hati sejak 2010.
                </h2>
            </div>
        </section>
    );
}
