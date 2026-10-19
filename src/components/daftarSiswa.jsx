import { useState } from 'react';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
import { Link } from 'react-router-dom';


const fetcher = async (url) => {
    const response = await axios.get(url,{
        headers: {Accept: 'application/json'}
    })
    return response.data;
};



const DaftarSiswa = () => {
    const {mutate} = useSWRConfig();
    const {data, error} = useSWR('http://localhost:5000/siswa', fetcher);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    const deleteSiswa = async () => {
        if (!selectedSiswa) return;

        await axios.delete(`http://localhost:5000/siswa/${selectedSiswa.id}`);
        setSelectedSiswa(null);
        mutate('http://localhost:5000/siswa');
    };

    if (error) return <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 text-center text-sm text-neutral-600">Failed to fetch data</div>;
    if (!data) return <div className="flex min-h-screen items-center justify-center bg-neutral-100 px-6 text-center text-sm text-neutral-600">Loading...</div>;

    return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#f5f5f5_0%,#e5e5e5_100%)] px-4 py-10 text-neutral-950 sm:px-8">
        <div className="mx-auto max-w-5xl">
            <header className="mb-10 flex flex-col gap-5 border-b-2 border-neutral-950 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-neutral-500">Data akademik</p>
                    <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Daftar siswa</h1>
                    <p className="mt-3 text-sm text-neutral-600">Informasi siswa yang tersimpan di dalam sistem.</p>
                </div>
                <div className="flex w-fit items-center gap-3 rounded-lg border-2 border-neutral-950 bg-white px-4 py-3 shadow-[4px_4px_0_#111111]">
                    <span className="text-3xl font-black leading-none text-neutral-950">{data.length}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Siswa<br />terdaftar</span>
                </div>
            </header>

            <div className="flex justify-end mb-4">
                <Link
                    to="/tambah"
                    className="border-2 border-neutral-950 bg-neutral-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#a3a3a3] transition-all duration-150 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[5px_5px_0_#737373] active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                    + Tambah siswa
                </Link>
            </div>

            <section className="overflow-hidden rounded-2xl border-2 border-neutral-950 bg-white shadow-[10px_10px_0_#111111] transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between border-b-2 border-neutral-950 bg-neutral-950 px-5 py-5 text-white sm:px-7">
                    <div>
                        <h2 className="text-sm font-black uppercase tracking-[0.14em]">Data siswa</h2>
                        <p className="mt-1 text-xs text-neutral-400">Daftar siswa aktif</p>
                    </div>
                    <span className="rounded-full border border-neutral-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-300">Terbaru</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="border-b-2 border-neutral-950 bg-neutral-100 text-xs uppercase tracking-[0.14em] text-neutral-600">
                            <tr>
                                <th className="px-5 py-4 font-black sm:px-7">No</th>
                                <th className="px-5 py-4 font-black">Nama</th>
                                <th className="px-5 py-4 font-black">Umur</th>
                                <th className="px-5 py-4 font-black sm:px-7">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-neutral-100">
                            {data && data.map((siswa, idx) => (
                                <tr key={siswa.id} className="group transition-colors hover:bg-neutral-100">
                                    <td className="px-5 py-5 font-black text-neutral-400 sm:px-7">{String(idx + 1).padStart(2, '0')}</td>
                                    <td className="whitespace-nowrap px-5 py-5 font-bold text-neutral-950">{siswa.nama}</td>
                                    <td className="px-5 py-5 font-medium text-neutral-600">{siswa.umur} tahun</td>
                                    <td className="px-5 py-5 sm:px-7">
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/edit/${siswa.id}`}
                                                aria-label={`Edit data ${siswa.nama}`}
                                                className="border-2 border-neutral-950 bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-neutral-950 shadow-[2px_2px_0_#111111] transition-all duration-150 hover:-translate-y-0.5 hover:bg-neutral-950 hover:text-white hover:shadow-[3px_3px_0_#737373] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedSiswa(siswa)}
                                                aria-label={`Hapus data ${siswa.nama}`}
                                                className="border-2 border-neutral-950 bg-neutral-950 px-3 py-2 text-xs font-black uppercase tracking-wide text-white shadow-[2px_2px_0_#a3a3a3] transition-all duration-150 hover:-translate-y-0.5 hover:bg-neutral-700 hover:shadow-[3px_3px_0_#737373] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedSiswa && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm modal-fade-in" role="presentation">
                    <div className="w-full max-w-md rounded-2xl border-2 border-neutral-950 bg-white p-7 shadow-[10px_10px_0_#111111] modal-pop-in" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-950 bg-neutral-100 text-xl font-black">!</div>
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-neutral-500">Konfirmasi tindakan</p>
                        <h2 id="delete-dialog-title" className="text-2xl font-black tracking-tight text-neutral-950">Hapus data siswa?</h2>
                        <p className="mt-3 text-sm leading-6 text-neutral-600">Data <span className="font-bold text-neutral-950">{selectedSiswa.nama}</span> akan dihapus secara permanen.</p>
                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button" onClick={() => setSelectedSiswa(null)} className="border-2 border-neutral-950 bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-neutral-950 transition-colors hover:bg-neutral-100">Batal</button>
                            <button type="button" onClick={deleteSiswa} className="border-2 border-neutral-950 bg-neutral-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#a3a3a3] transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[5px_5px_0_#737373] active:translate-x-1 active:translate-y-1 active:shadow-none">Hapus data</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </main>
    )
}

export default DaftarSiswa;
