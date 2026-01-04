interface PatientFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    genderFilter: string;
    onGenderChange: (value: string) => void;
    onClearFilters: () => void;
}

export function PatientFilters({
    searchQuery,
    onSearchChange,
    genderFilter,
    onGenderChange,
    onClearFilters,
}: PatientFiltersProps) {
    return (
        <div className="rounded-t-xl border-b border-slate-100 bg-white p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search - Left Side */}
                <div className="relative w-full md:max-w-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-slate-400">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full rounded-lg border-none bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary"
                        placeholder="Cari Nama, NIK, atau WhatsApp..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>

                {/* Right Side - Filters */}
                <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                    {/* Gender Filter */}
                    <select
                        value={genderFilter}
                        onChange={(e) => onGenderChange(e.target.value)}
                        className="rounded-lg border-none bg-slate-50 py-2.5 pl-3 pr-8 text-sm text-slate-700 transition-all focus:bg-white focus:ring-2 focus:ring-primary"
                    >
                        <option value="">Semua Gender</option>
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                    </select>

                    {/* Clear Filters */}
                    {(searchQuery || genderFilter) && (
                        <button
                            onClick={onClearFilters}
                            className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-700"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                close
                            </span>
                            Reset
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
