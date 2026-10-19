import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditSiswa = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nama, setNama] = useState('');
    const [umur, setUmur] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getSiswaById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/siswa/${id}`);
                setNama(response.data.nama);
                setUmur(response.data.umur);
            } catch (fetchError) {
                setError(fetchError.response?.data?.message || 'Data siswa gagal dimuat.');
            }
        };

        getSiswaById();
    }, [id]);

    const updateSiswa = async (event) => {
        event.preventDefault();
        setError('');

        try {
            await axios.put(`http://localhost:5000/siswa/${id}`, {
                nama,
                umur: Number(umur),
            });
            navigate('/');
        } catch (submitError) {
            setError(submitError.response?.data?.message || 'Data siswa gagal diperbarui.');
        }
    };

    return (
        <main className="min-h-screen bg-[linear-gradient(135deg,#f5f5f5_0%,#e5e5e5_100%)] px-4 py-10 text-neutral-950 sm:px-8">
            <div className="mx-auto max-w-2xl">
                <Link to="/" className="mb-8 inline-flex text-sm font-bold text-neutral-600 transition-colors hover:text-neutral-950">
                    ← Kembali ke daftar
                </Link>

                <section className="rounded-2xl border-2 border-neutral-950 bg-white shadow-[10px_10px_0_#111111]">
                    <div className="border-b-2 border-neutral-950 bg-neutral-950 px-6 py-6 text-white sm:px-8">
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-neutral-400">Data akademik</p>
                        <h1 className="text-3xl font-black tracking-tight">Edit siswa</h1>
                        <p className="mt-2 text-sm text-neutral-400">Perbarui informasi siswa di dalam database.</p>
                    </div>

                    <form onSubmit={updateSiswa} className="space-y-6 px-6 py-7 sm:px-8">
                        <div>
                            <label htmlFor="nama" className="mb-2 block text-sm font-black uppercase tracking-wide text-neutral-700">Nama</label>
                            <input id="nama" name="nama" type="text" value={nama} onChange={(event) => setNama(event.target.value)} placeholder="Masukkan nama siswa" required className="w-full border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white" />
                        </div>

                        <div>
                            <label htmlFor="umur" className="mb-2 block text-sm font-black uppercase tracking-wide text-neutral-700">Umur</label>
                            <input id="umur" name="umur" type="number" min="1" value={umur} onChange={(event) => setUmur(event.target.value)} placeholder="Masukkan umur siswa" required className="w-full border-2 border-neutral-300 bg-neutral-50 px-4 py-3 text-sm font-medium text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-950 focus:bg-white" />
                        </div>

                        {error && <p className="border-2 border-neutral-950 bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-700">{error}</p>}

                        <div className="flex flex-col-reverse gap-3 border-t-2 border-neutral-100 pt-6 sm:flex-row sm:justify-end">
                            <Link to="/" className="border-2 border-neutral-950 bg-white px-5 py-3 text-center text-sm font-black uppercase tracking-wide text-neutral-950 transition-colors hover:bg-neutral-100">Batal</Link>
                            <button type="submit" className="border-2 border-neutral-950 bg-neutral-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#a3a3a3] transition-all hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[5px_5px_0_#737373] active:translate-x-1 active:translate-y-1 active:shadow-none">Update Siswa</button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default EditSiswa;