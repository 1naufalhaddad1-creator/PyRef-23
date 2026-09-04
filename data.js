const SECTIONS = [
// ═══════════════════════════════════════════════════════════
// 1. I/O & INTERAKSI
// ═══════════════════════════════════════════════════════════
{
  id: 'io-funcs', title: 'I/O & Interaksi', icon: '💬', color: COLORS.builtin, type: 'builtin',
  desc: 'print, input, open, repr, ascii — fungsi untuk komunikasi dengan user dan file',
  commands: [
    {
      name: 'print()', tag: 'builtin',
      short: 'Menampilkan output ke konsol atau stream.',
      desc: 'Fungsi paling dasar untuk menampilkan teks, angka, atau objek ke layar. Mendukung multiple argumen, separator custom, end character, dan output ke file. Nilai default file=None (menggunakan sys.stdout saat runtime).',
      uses: ['Debug & logging','Output ke user','Monitoring program','Cetak tabel'],
      syntax: `<span class="fn">print</span>(<span class="st">"Hello, World!"</span>)
<span class="fn">print</span>(<span class="st">"Nama:"</span>, <span class="st">"Budi"</span>, <span class="nm">25</span>, sep=<span class="st">" | "</span>)   <span class="cm"># Nama: | Budi | 25</span>
<span class="fn">print</span>(<span class="st">"Loading"</span>, end=<span class="st">"..."</span>)              <span class="cm"># Tanpa newline di akhir</span>
nama = <span class="st">"Siti"</span>
<span class="fn">print</span>(<span class="st">f"Halo <span class="dc">{nama}</span>!"</span>)                   <span class="cm"># f-string: "Halo Siti!"</span>`,
      params: 'print(*objects, sep=" ", end="\\n", file=None, flush=False)'
    },
    {
      name: 'input()', tag: 'builtin',
      short: 'Membaca input dari keyboard.',
      desc: 'Menampilkan prompt lalu menunggu user mengetik Enter. Selalu mengembalikan string — konversi manual diperlukan untuk tipe lain.',
      uses: ['CLI interaktif','Games teks','Form runtime','Konfigurasi user'],
      syntax: `nama = <span class="fn">input</span>(<span class="st">"Nama kamu: "</span>)
umur = <span class="fn">int</span>(<span class="fn">input</span>(<span class="st">"Umur: "</span>))   <span class="cm"># konversi ke int</span>
a, b = <span class="fn">map</span>(<span class="fn">int</span>, <span class="fn">input</span>().split())  <span class="cm"># dua angka sekaligus</span>`,
      params: 'input(prompt="")'
    },
    {
      name: 'open()', tag: 'builtin',
      short: 'Membuka file untuk membaca atau menulis.',
      desc: 'Mengembalikan file object. Mode: r (baca), w (tulis/hapus isi lama), a (tambah di akhir), x (buat baru — gagal jika sudah ada), b (binary), + (baca+tulis). Selalu gunakan with statement untuk menutup otomatis.',
      uses: ['Baca/tulis file','CSV/JSON processing','Log file','Config file'],
      syntax: `<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"data.txt"</span>, <span class="st">"r"</span>, encoding=<span class="st">"utf-8"</span>) <span class="kw">as</span> f:
    isi = f.read()
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"data.txt"</span>, <span class="st">"r"</span>, encoding=<span class="st">"utf-8"</span>) <span class="kw">as</span> f:
    baris = f.readlines()    <span class="cm"># list of lines — termasuk \\n</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"output.txt"</span>, <span class="st">"w"</span>) <span class="kw">as</span> f:
    f.write(<span class="st">"Hello!\\n"</span>)
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"baru.txt"</span>, <span class="st">"x"</span>) <span class="kw">as</span> f:  <span class="cm"># x = buat baru, error jika ada</span>
    f.write(<span class="st">"Konten baru\\n"</span>)`,
      params: 'open(file, mode="r", buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)'
    },
    {
      name: 'repr()', tag: 'builtin',
      short: 'Mengembalikan representasi string teknis/resmi dari objek.',
      desc: 'Memanggil __repr__() dari objek. Berbeda dari str() — repr() bertujuan untuk representasi yang <strong>tidak ambigu</strong>, ideal untuk debugging dan logging. Idealnya, eval(repr(x)) == x.',
      uses: ['Debugging','Logging objek','REPL output','Serialisasi debug'],
      syntax: `<span class="fn">repr</span>(<span class="st">"hello"</span>)     <span class="cm"># "'hello'"  (dengan tanda kutip)</span>
<span class="fn">repr</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>])    <span class="cm"># '[1, 2, 3]'</span>
<span class="fn">repr</span>(<span class="bl">None</span>)        <span class="cm"># 'None'</span>

<span class="kw">class</span> <span class="cls">Poin</span>:
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"Poin(<span class="dc">{self.x}</span>, <span class="dc">{self.y}</span>)"</span>`,
      params: 'repr(object)'
    },
    {
      name: 'ascii()', tag: 'builtin',
      short: 'Seperti repr() tapi semua non-ASCII di-escape.',
      desc: 'Mengembalikan string representasi objek, tetapi karakter non-ASCII (di luar range 0–127) akan di-escape menggunakan \\x, \\u, atau \\U. Berguna untuk output yang harus ASCII-safe.',
      uses: ['ASCII-safe output','Log ke sistem lama','Debug karakter Unicode','Protokol terbatas ASCII'],
      syntax: `<span class="fn">ascii</span>(<span class="st">"hello"</span>)          <span class="cm"># "'hello'"</span>
<span class="fn">ascii</span>(<span class="st">"café"</span>)          <span class="cm"># "'caf\\xe9'"</span>
<span class="fn">ascii</span>(<span class="st">"こんにちは"</span>)     <span class="cm"># "'\\u3053\\u3093...'"</span>
<span class="fn">ascii</span>([<span class="st">"α"</span>, <span class="st">"β"</span>])     <span class="cm"># "['\\u03b1', '\\u03b2']"</span>`,
      params: 'ascii(object)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 2. TIPE DATA DASAR
// ═══════════════════════════════════════════════════════════
{
  id: 'types-basic', title: 'Tipe Data Numerik & Boolean', icon: '🔢', color: COLORS.type, type: 'type',
  desc: 'int, float, complex, bool — tipe data numerik bawaan Python',
  commands: [
    {
      name: 'int()', tag: 'type',
      short: 'Tipe bilangan bulat — presisi tak terbatas.',
      desc: 'Integer Python bisa sangat besar (tidak ada overflow). Bisa mengkonversi string, float, atau bilangan dari basis lain. Mendukung semua operasi aritmatika.',
      uses: ['Konversi tipe','Parsing angka','Basis bilangan','Counting'],
      syntax: `<span class="fn">int</span>(<span class="st">"42"</span>)           <span class="cm"># 42</span>
<span class="fn">int</span>(<span class="nm">3.99</span>)          <span class="cm"># 3  (truncate, bukan round)</span>
<span class="fn">int</span>(<span class="st">"ff"</span>, <span class="nm">16</span>)      <span class="cm"># 255 (heksadesimal)</span>
<span class="fn">int</span>(<span class="st">"101"</span>, <span class="nm">2</span>)      <span class="cm"># 5   (biner)</span>
<span class="fn">int</span>(<span class="st">"77"</span>, <span class="nm">8</span>)       <span class="cm"># 63  (oktal)</span>
<span class="nm">10</span> <span class="op">**</span> <span class="nm">100</span>          <span class="cm"># googol — tidak overflow!</span>`,
      params: 'int(x=0) / int(x, base=10)'
    },
    {
      name: 'float()', tag: 'type',
      short: 'Tipe bilangan desimal (floating point 64-bit).',
      desc: 'Implementasi IEEE 754 double precision. Presisi ~15–17 digit desimal. Hati-hati dengan floating point errors (0.1 + 0.2 != 0.3). Untuk presisi tinggi gunakan decimal.Decimal.',
      uses: ['Perhitungan saintifik','Koordinat','Persentase','Konversi numerik'],
      syntax: `<span class="fn">float</span>(<span class="st">"3.14"</span>)      <span class="cm"># 3.14</span>
<span class="fn">float</span>(<span class="nm">42</span>)          <span class="cm"># 42.0</span>
<span class="fn">float</span>(<span class="st">"inf"</span>)       <span class="cm"># inf</span>
<span class="fn">float</span>(<span class="st">"nan"</span>)       <span class="cm"># nan</span>
<span class="nm">0.1</span> <span class="op">+</span> <span class="nm">0.2</span>          <span class="cm"># 0.30000000000000004 ⚠</span>
<span class="kw">import</span> decimal
decimal.<span class="cls">Decimal</span>(<span class="st">"0.1"</span>) <span class="op">+</span> decimal.<span class="cls">Decimal</span>(<span class="st">"0.2"</span>) <span class="cm"># 0.3 ✓</span>`,
      params: 'float(x=0.0)'
    },
    {
      name: 'complex()', tag: 'type',
      short: 'Tipe bilangan kompleks (real + imaginer).',
      desc: 'Bilangan kompleks dengan bagian real dan imajiner. Notasi literal: 3+4j. Mendukung semua operasi aritmatika. Berguna untuk matematika dan DSP.',
      uses: ['Matematika kompleks','DSP/FFT','Geometri 2D','Fisika komputasi'],
      syntax: `<span class="fn">complex</span>(<span class="nm">3</span>, <span class="nm">4</span>)       <span class="cm"># (3+4j)</span>
<span class="fn">complex</span>(<span class="st">"3+4j"</span>)    <span class="cm"># (3+4j)</span>
c = <span class="nm">3</span> <span class="op">+</span> <span class="nm">4j</span>
c.real             <span class="cm"># 3.0</span>
c.imag             <span class="cm"># 4.0</span>
<span class="fn">abs</span>(c)             <span class="cm"># 5.0 (modulus)</span>
c.conjugate()      <span class="cm"># (3-4j)</span>`,
      params: 'complex(real=0, imag=0) / complex(string)'
    },
    {
      name: 'bool()', tag: 'type',
      short: 'Tipe boolean — subclass dari int.',
      desc: 'True dan False adalah satu-satunya instance bool. bool adalah subclass int sehingga True==1 dan False==0. Nilai falsy: None, 0, 0.0, "", [], {}, set(), (). Semua lainnya truthy.',
      uses: ['Konversi ke bool','Truthy/falsy check','Flag','Kondisi boolean'],
      syntax: `<span class="fn">bool</span>(<span class="nm">0</span>)          <span class="cm"># False</span>
<span class="fn">bool</span>(<span class="nm">42</span>)         <span class="cm"># True</span>
<span class="fn">bool</span>(<span class="st">""</span>)         <span class="cm"># False</span>
<span class="fn">bool</span>([])         <span class="cm"># False</span>
<span class="fn">bool</span>([<span class="nm">0</span>])        <span class="cm"># True (list tidak kosong)</span>
<span class="fn">bool</span>(<span class="bl">None</span>)       <span class="cm"># False</span>
<span class="bl">True</span> <span class="op">+</span> <span class="bl">True</span>      <span class="cm"># 2 (True == 1)</span>`,
      params: 'bool(x=False)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 3. TIPE DATA TEKS & BYTES
// ═══════════════════════════════════════════════════════════
{
  id: 'types-text', title: 'Tipe Teks, Bytes & Buffer', icon: '📝', color: COLORS.type, type: 'type',
  desc: 'str, bytes, bytearray, memoryview — tipe data untuk teks dan data biner',
  commands: [
    {
      name: 'str()', tag: 'type',
      short: 'Tipe string Unicode — urutan karakter immutable.',
      desc: 'String Python adalah Unicode (UTF-8 secara konseptual). Immutable. Mendukung f-string, slicing, dan ratusan method. Untuk konversi memanggil __str__() objek.',
      uses: ['Teks & Unicode','Format output','Parsing teks','Konversi ke string'],
      syntax: `<span class="fn">str</span>(<span class="nm">42</span>)           <span class="cm"># '42'</span>
<span class="fn">str</span>(<span class="nm">3.14</span>)         <span class="cm"># '3.14'</span>
<span class="fn">str</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>])      <span class="cm"># '[1, 2, 3]'</span>
s = <span class="st">"Python"</span>
s[<span class="nm">0</span>]              <span class="cm"># 'P'</span>
s[<span class="op">-</span><span class="nm">1</span>]             <span class="cm"># 'n'</span>
s[<span class="nm">1</span>:<span class="nm">4</span>]            <span class="cm"># 'yth'</span>
s.upper()          <span class="cm"># 'PYTHON'</span>
<span class="st">f"Halo <span class="dc">{s}</span>!"</span>       <span class="cm"># 'Halo Python!'</span>`,
      params: 'str(object="") / str(object=b"", encoding="utf-8", errors="strict")'
    },
    {
      name: 'bytes()', tag: 'type',
      short: 'Urutan byte immutable (0–255).',
      desc: 'Immutable sequence of integers (0–255). Digunakan untuk data biner, encoding, dan komunikasi jaringan. Prefix literal b"...".',
      uses: ['Data biner','Network protokol','Encoding/decoding','File biner'],
      syntax: `<span class="fn">bytes</span>(<span class="nm">5</span>)                   <span class="cm"># b'\\x00\\x00\\x00\\x00\\x00'</span>
<span class="fn">bytes</span>([<span class="nm">72</span>,<span class="nm">101</span>,<span class="nm">108</span>,<span class="nm">108</span>,<span class="nm">111</span>]) <span class="cm"># b'Hello'</span>
<span class="fn">bytes</span>(<span class="st">"hello"</span>, <span class="st">"utf-8"</span>)    <span class="cm"># b'hello'</span>
b = <span class="st">b"Hello"</span>
b[<span class="nm">0</span>]                      <span class="cm"># 72 (integer!)</span>
b.decode(<span class="st">"utf-8"</span>)         <span class="cm"># 'Hello'</span>
<span class="st">"café"</span>.encode(<span class="st">"utf-8"</span>)   <span class="cm"># b'caf\\xc3\\xa9'</span>`,
      params: 'bytes(source) / bytes(length) / bytes(iterable) / bytes(string, encoding)'
    },
    {
      name: 'bytearray()', tag: 'type',
      short: 'Urutan byte MUTABLE (versi mutable dari bytes).',
      desc: 'Seperti bytes tapi bisa dimodifikasi (mutable). Sangat efisien untuk operasi append/insert byte. Cocok untuk manipulasi data biner in-place.',
      uses: ['Manipulasi biner','Buffer jaringan','Protokol kustom','In-place encoding'],
      syntax: `ba = <span class="fn">bytearray</span>(<span class="nm">5</span>)          <span class="cm"># bytearray(b'\\x00\\x00...')</span>
ba = <span class="fn">bytearray</span>(<span class="st">b"Hello"</span>)
ba[<span class="nm">0</span>] = <span class="nm">104</span>                <span class="cm"># ubah 'H' → 'h'</span>
ba.append(<span class="nm">33</span>)              <span class="cm"># tambah '!'</span>
<span class="fn">bytes</span>(ba)                  <span class="cm"># konversi kembali ke bytes</span>
ba.extend(<span class="st">b" World"</span>)       <span class="cm"># gabungkan byte</span>
ba.decode(<span class="st">"utf-8"</span>)         <span class="cm"># 'hello World!'</span>`,
      params: 'bytearray(source) / bytearray(length) / bytearray(iterable)'
    },
    {
      name: 'memoryview()', tag: 'type',
      short: 'View ke buffer internal objek tanpa menyalin data.',
      desc: 'Membuat tampilan (view) ke buffer memori objek lain (bytes, bytearray, array) tanpa mengkopi data. Sangat efisien untuk zero-copy data slicing terutama pada data besar.',
      uses: ['Zero-copy slicing','Performa tinggi','NumPy interop','Socket buffer'],
      syntax: `data = <span class="fn">bytearray</span>(<span class="st">b"Hello, World!"</span>)
mv = <span class="fn">memoryview</span>(data)
<span class="fn">bytes</span>(mv[<span class="nm">0</span>:<span class="nm">5</span>])    <span class="cm"># b'Hello' — tanpa copy!</span>
mv[<span class="nm">7</span>] = <span class="nm">87</span>        <span class="cm"># modifikasi 'W' in-place</span>

<span class="cm"># Casting tipe view</span>
b = <span class="fn">bytes</span>([<span class="nm">0</span>,<span class="nm">1</span>,<span class="nm">0</span>,<span class="nm">2</span>])
mv = <span class="fn">memoryview</span>(b).cast(<span class="st">"H"</span>)  <span class="cm"># unsigned short</span>
<span class="fn">list</span>(mv)          <span class="cm"># [256, 512]</span>`,
      params: 'memoryview(object)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 4. TIPE DATA KOLEKSI
// ═══════════════════════════════════════════════════════════
{
  id: 'types-collection', title: 'Tipe Koleksi', icon: '📦', color: COLORS.type, type: 'type',
  desc: 'list, tuple, dict, set, frozenset — tipe koleksi bawaan Python',
  commands: [
    {
      name: 'list()', tag: 'type',
      short: 'Koleksi terurut, mutable, bisa duplikat.',
      desc: 'Implementasi dynamic array. Mendukung append, insert, delete, slicing. Akses O(1) berdasarkan indeks, insert/delete O(n) di tengah.',
      uses: ['Koleksi data','Stack/Queue','Komprehensi','Sorting'],
      syntax: `lst = <span class="fn">list</span>(<span class="fn">range</span>(<span class="nm">5</span>))    <span class="cm"># [0,1,2,3,4]</span>
lst = <span class="fn">list</span>(<span class="st">"abc"</span>)        <span class="cm"># ['a','b','c']</span>
lst.append(<span class="nm">5</span>)
lst.extend([<span class="nm">6</span>,<span class="nm">7</span>])
lst.insert(<span class="nm">0</span>, <span class="nm">-1</span>)
lst.pop()                 <span class="cm"># hapus & kembalikan elemen terakhir</span>
lst.sort()
lst.reverse()
[x<span class="op">**</span><span class="nm">2</span> <span class="kw">for</span> x <span class="kw">in</span> <span class="fn">range</span>(<span class="nm">5</span>)]  <span class="cm"># list comprehension</span>`,
      params: 'list(iterable=())'
    },
    {
      name: 'tuple()', tag: 'type',
      short: 'Koleksi terurut, immutable, bisa duplikat.',
      desc: 'Seperti list tapi tidak bisa dimodifikasi. Hashable (jika isinya hashable), sehingga bisa jadi dict key atau set member. Lebih hemat memori dari list.',
      uses: ['Multiple return value','Dict key','Named record','Packing/unpacking'],
      syntax: `t = (<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>)
t = <span class="fn">tuple</span>(<span class="fn">range</span>(<span class="nm">3</span>))     <span class="cm"># (0, 1, 2)</span>
x, y, z = t              <span class="cm"># unpacking</span>
a, *b, c = (<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>,<span class="nm">4</span>,<span class="nm">5</span>)   <span class="cm"># a=1, b=[2,3,4], c=5</span>
koordinat = (<span class="nm">3.0</span>, <span class="nm">4.0</span>)   <span class="cm"># hashable — bisa jadi key dict</span>
<span class="fn">len</span>(t)                   <span class="cm"># 3</span>`,
      params: 'tuple(iterable=())'
    },
    {
      name: 'dict()', tag: 'type',
      short: 'Key-value store terurut, mutable. (Ordered sejak Python 3.7)',
      desc: 'Hash map — lookup O(1) rata-rata. Key harus hashable. Sejak Python 3.7+ mempertahankan urutan insertion. Sangat sering digunakan untuk representasi objek dan konfigurasi.',
      uses: ['Key-value store','Config','JSON mapping','Counter','Caching'],
      syntax: `d = {<span class="st">"nama"</span>: <span class="st">"Budi"</span>, <span class="st">"umur"</span>: <span class="nm">25</span>}
d = <span class="fn">dict</span>(nama=<span class="st">"Budi"</span>, umur=<span class="nm">25</span>)
d[<span class="st">"email"</span>] = <span class="st">"b@mail.com"</span>   <span class="cm"># tambah key</span>
d.get(<span class="st">"phone"</span>, <span class="st">"N/A"</span>)        <span class="cm"># akses aman</span>
d.keys(); d.values(); d.items()
{k: v <span class="kw">for</span> k,v <span class="kw">in</span> d.items()}  <span class="cm"># dict comprehension</span>
d1 | d2                       <span class="cm"># merge (Python 3.9+)</span>`,
      params: 'dict(**kwargs) / dict(mapping) / dict(iterable)'
    },
    {
      name: 'set()', tag: 'type',
      short: 'Koleksi tidak terurut, unik, mutable.',
      desc: 'Implementasi hash set. Tidak ada duplikat, tidak ada urutan. Lookup/add/remove O(1). Mendukung operasi himpunan: union, intersection, difference.',
      uses: ['Deduplikasi','Cek keanggotaan cepat','Operasi himpunan','Unique values'],
      syntax: `s = {<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>, <span class="nm">2</span>, <span class="nm">1</span>}    <span class="cm"># {1, 2, 3}</span>
s = <span class="fn">set</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">2</span>,<span class="nm">3</span>])
s.add(<span class="nm">4</span>)
s.discard(<span class="nm">99</span>)               <span class="cm"># aman, tidak raise</span>
a | b   <span class="cm"># union</span>
a &amp; b   <span class="cm"># intersection</span>
a - b   <span class="cm"># difference</span>
a ^ b   <span class="cm"># symmetric difference</span>`,
      params: 'set(iterable=())'
    },
    {
      name: 'frozenset()', tag: 'type',
      short: 'Set immutable — hashable dan bisa jadi dict key.',
      desc: 'Seperti set tapi tidak bisa dimodifikasi. Hashable sehingga bisa dijadikan elemen set lain atau key dict. Mendukung semua operasi himpunan kecuali penambahan/penghapusan elemen.',
      uses: ['Hashable set','Dict key set','Konstanta himpunan','Keamanan data'],
      syntax: `fs = <span class="fn">frozenset</span>([<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>])
<span class="fn">hash</span>(fs)                  <span class="cm"># hashable!</span>
d = {fs: <span class="st">"nilai"</span>}         <span class="cm"># bisa jadi dict key</span>
fs | <span class="fn">frozenset</span>([<span class="nm">4</span>,<span class="nm">5</span>])    <span class="cm"># union (buat baru)</span>
<span class="nm">2</span> <span class="kw">in</span> fs                   <span class="cm"># True</span>
<span class="cm"># fs.add(4)  → AttributeError!</span>`,
      params: 'frozenset(iterable=())'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 5. ITERASI & SEQUENCE
// ═══════════════════════════════════════════════════════════
{
  id: 'iter-funcs', title: 'Iterasi & Sequence', icon: '🔄', color: COLORS.builtin, type: 'builtin',
  desc: 'range, enumerate, zip, map, filter, sorted, reversed, iter, next, slice, len',
  commands: [
    {
      name: 'range()', tag: 'builtin',
      short: 'Menghasilkan sequence bilangan (lazy, hemat memori).',
      desc: 'Range adalah tipe sequence (bukan iterator). Mendukung indexing, len, in, slicing. Tidak menyimpan semua angka di memori — dihitung on-demand. Sangat efisien untuk loop.',
      uses: ['For loop','Index sequence','Slice range','Numerik sequence'],
      syntax: `<span class="fn">range</span>(<span class="nm">5</span>)           <span class="cm"># 0,1,2,3,4</span>
<span class="fn">range</span>(<span class="nm">2</span>, <span class="nm">8</span>)        <span class="cm"># 2,3,4,5,6,7</span>
<span class="fn">range</span>(<span class="nm">0</span>, <span class="nm">10</span>, <span class="nm">2</span>)   <span class="cm"># 0,2,4,6,8</span>
<span class="fn">range</span>(<span class="nm">5</span>, <span class="nm">0</span>, <span class="op">-</span><span class="nm">1</span>)   <span class="cm"># 5,4,3,2,1</span>
r = <span class="fn">range</span>(<span class="nm">100</span>)
r[<span class="nm">50</span>]             <span class="cm"># 50 — O(1)!</span>
<span class="nm">50</span> <span class="kw">in</span> r            <span class="cm"># True — O(1)!</span>`,
      params: 'range(stop) / range(start, stop[, step])'
    },
    {
      name: 'len()', tag: 'builtin',
      short: 'Mengembalikan jumlah elemen dalam koleksi.',
      desc: 'Memanggil __len__() dari objek. Bekerja pada string, list, tuple, dict, set, dan objek custom yang mengimplementasikan __len__(). Hasil O(1) untuk built-in types.',
      uses: ['Panjang string','Ukuran koleksi','Validasi ukuran','Indexing'],
      syntax: `<span class="fn">len</span>(<span class="st">"hello"</span>)      <span class="cm"># 5</span>
<span class="fn">len</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>])      <span class="cm"># 3</span>
<span class="fn">len</span>({<span class="st">"a"</span>:<span class="nm">1</span>})       <span class="cm"># 1</span>
<span class="fn">len</span>(())            <span class="cm"># 0</span>
<span class="fn">len</span>(<span class="fn">range</span>(<span class="nm">100</span>))    <span class="cm"># 100</span>`,
      params: 'len(s)'
    },
    {
      name: 'enumerate()', tag: 'builtin',
      short: 'Menambahkan counter ke iterable.',
      desc: 'Menghasilkan pasangan (index, value). Lebih idiomatis dari range(len(x)). Bisa menentukan start index. Mengembalikan enumerate object (lazy iterator).',
      uses: ['Akses index + nilai','Numbering output','Indexed loop','Pandas-like index'],
      syntax: `buah = [<span class="st">"apel"</span>, <span class="st">"mangga"</span>, <span class="st">"jeruk"</span>]
<span class="kw">for</span> i, b <span class="kw">in</span> <span class="fn">enumerate</span>(buah):
    <span class="fn">print</span>(<span class="st">f"<span class="dc">{i}</span>: <span class="dc">{b}</span>"</span>)

<span class="kw">for</span> i, b <span class="kw">in</span> <span class="fn">enumerate</span>(buah, start=<span class="nm">1</span>):
    <span class="fn">print</span>(<span class="st">f"<span class="dc">{i}</span>. <span class="dc">{b}</span>"</span>)    <span class="cm"># mulai dari 1</span>

<span class="fn">list</span>(<span class="fn">enumerate</span>([<span class="st">"a"</span>,<span class="st">"b"</span>]))   <span class="cm"># [(0,'a'),(1,'b')]</span>`,
      params: 'enumerate(iterable, start=0)'
    },
    {
      name: 'zip()', tag: 'builtin',
      short: 'Menggabungkan beberapa iterable menjadi tuple berpasangan.',
      desc: 'Menghasilkan iterator tuple. Berhenti saat iterable terpendek habis. Untuk menangani iterable berbeda panjang gunakan itertools.zip_longest. Bisa di-"unzip" dengan zip(*zipped). Parameter <strong>strict=True</strong> (Python 3.10+) melempar ValueError jika panjang tidak sama.',
      uses: ['Pasangkan dua list','Transpose matrix','Parallel iteration','Unzip'],
      syntax: `nama = [<span class="st">"Andi"</span>, <span class="st">"Budi"</span>]
nilai = [<span class="nm">90</span>, <span class="nm">85</span>]
<span class="fn">list</span>(<span class="fn">zip</span>(nama, nilai))    <span class="cm"># [('Andi',90),('Budi',85)]</span>

<span class="cm"># Unzip</span>
pasangan = [(<span class="nm">1</span>,<span class="st">"a"</span>), (<span class="nm">2</span>,<span class="st">"b"</span>)]
angka, huruf = <span class="fn">zip</span>(*pasangan)

<span class="cm"># Dict dari dua list</span>
d = <span class="fn">dict</span>(<span class="fn">zip</span>(nama, nilai))`,
      params: 'zip(*iterables, strict=False)'
    },
    {
      name: 'map()', tag: 'builtin',
      short: 'Menerapkan fungsi ke setiap elemen iterable.',
      desc: 'Mengembalikan iterator. Lebih cepat dari list comprehension untuk fungsi built-in sederhana. Bisa menerima beberapa iterable (fungsi harus menerima sebanyak iterable).',
      uses: ['Transformasi data','Parse banyak nilai','Batch processing','Functional programming'],
      syntax: `<span class="fn">list</span>(<span class="fn">map</span>(<span class="kw">lambda</span> x: x<span class="op">*</span><span class="nm">2</span>, [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]))  <span class="cm"># [2,4,6]</span>
a, b = <span class="fn">map</span>(<span class="fn">int</span>, <span class="fn">input</span>().split())   <span class="cm"># parse input</span>
<span class="fn">list</span>(<span class="fn">map</span>(<span class="fn">str</span>, [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]))            <span class="cm"># ['1','2','3']</span>
<span class="cm"># Dua iterable</span>
<span class="fn">list</span>(<span class="fn">map</span>(<span class="kw">lambda</span> x,y: x+y, [<span class="nm">1</span>,<span class="nm">2</span>], [<span class="nm">3</span>,<span class="nm">4</span>])) <span class="cm"># [4,6]</span>`,
      params: 'map(function, iterable, ...)'
    },
    {
      name: 'filter()', tag: 'builtin',
      short: 'Menyaring elemen berdasarkan fungsi kondisi.',
      desc: 'Mengembalikan iterator dengan elemen yang membuat fungsi bernilai True. Jika fungsi None, menyaring nilai falsy. Lebih idiomatis dengan list comprehension untuk kondisi kompleks.',
      uses: ['Filter data','Seleksi valid','Query sederhana','Sanitasi input'],
      syntax: `<span class="fn">list</span>(<span class="fn">filter</span>(<span class="kw">lambda</span> x: x<span class="op">%</span><span class="nm">2</span><span class="op">==</span><span class="nm">0</span>, [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>,<span class="nm">4</span>]))
<span class="cm"># [2, 4]</span>
data = [<span class="st">"ok"</span>, <span class="st">""</span>, <span class="bl">None</span>, <span class="st">"halo"</span>]
<span class="fn">list</span>(<span class="fn">filter</span>(<span class="bl">None</span>, data))   <span class="cm"># ['ok', 'halo']</span>`,
      params: 'filter(function, iterable)'
    },
    {
      name: 'sorted()', tag: 'builtin',
      short: 'Mengembalikan list baru yang terurut.',
      desc: 'Mengembalikan list baru tanpa mengubah iterable asli. Mendukung key function untuk sorting custom. Algoritmanya Timsort (stabil, O(n log n)).',
      uses: ['Urutkan data','Leaderboard','Sort berdasarkan atribut','Ranking'],
      syntax: `<span class="fn">sorted</span>([<span class="nm">3</span>,<span class="nm">1</span>,<span class="nm">4</span>])               <span class="cm"># [1,3,4]</span>
<span class="fn">sorted</span>([<span class="nm">3</span>,<span class="nm">1</span>,<span class="nm">4</span>], reverse=<span class="bl">True</span>) <span class="cm"># [4,3,1]</span>
<span class="fn">sorted</span>([<span class="st">"py"</span>,<span class="st">"ai"</span>,<span class="st">"code"</span>], key=<span class="fn">len</span>) <span class="cm"># ['ai','py','code']</span>
siswa = [(<span class="st">"Budi"</span>,<span class="nm">92</span>),(<span class="st">"Andi"</span>,<span class="nm">85</span>)]
<span class="fn">sorted</span>(siswa, key=<span class="kw">lambda</span> x: x[<span class="nm">1</span>], reverse=<span class="bl">True</span>)`,
      params: 'sorted(iterable, *, key=None, reverse=False)'
    },
    {
      name: 'reversed()', tag: 'builtin',
      short: 'Mengembalikan iterator terbalik dari sequence.',
      desc: 'Bekerja pada objek yang mendukung __reversed__() atau __len__() dan __getitem__(). Tidak menyalin data. Untuk string, gunakan s[::-1] atau "".join(reversed(s)).',
      uses: ['Traverse terbalik','Undo stack','Palindrome check','Reverse tanpa copy'],
      syntax: `<span class="fn">list</span>(<span class="fn">reversed</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]))   <span class="cm"># [3, 2, 1]</span>
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">reversed</span>(<span class="fn">range</span>(<span class="nm">5</span>)):
    <span class="fn">print</span>(i)   <span class="cm"># 4 3 2 1 0</span>
<span class="st">""</span>.join(<span class="fn">reversed</span>(<span class="st">"abcde"</span>))   <span class="cm"># "edcba"</span>`,
      params: 'reversed(seq)'
    },
    {
      name: 'iter() / next()', tag: 'builtin',
      short: 'Membuat iterator dan mengambil elemen berikutnya.',
      desc: 'iter() mengkonversi iterable ke iterator. next() mengambil satu elemen berikutnya dan melempar StopIteration (atau default) saat habis.',
      uses: ['Manual iteration','Lazy evaluation','Protokol iterator','Streaming data'],
      syntax: `it = <span class="fn">iter</span>([<span class="nm">10</span>, <span class="nm">20</span>, <span class="nm">30</span>])
<span class="fn">next</span>(it)              <span class="cm"># 10</span>
<span class="fn">next</span>(it)              <span class="cm"># 20</span>
<span class="fn">next</span>(it, <span class="st">"habis"</span>)    <span class="cm"># 30</span>
<span class="fn">next</span>(it, <span class="st">"habis"</span>)    <span class="cm"># "habis" (default)</span>
<span class="cm"># iter dengan sentinel — baca baris sampai ""</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"file.txt"</span>, <span class="st">"r"</span>) <span class="kw">as</span> f:
    <span class="kw">for</span> line <span class="kw">in</span> <span class="fn">iter</span>(f.readline, <span class="st">""</span>):
        <span class="fn">print</span>(line, end=<span class="st">""</span>)`,
      params: 'iter(object) / iter(callable, sentinel) / next(iterator[, default])'
    },
    {
      name: 'slice()', tag: 'builtin',
      short: 'Membuat objek slice untuk indexing programatik.',
      desc: 'Membuat objek slice yang bisa digunakan sebagai indeks. Berguna saat perlu menyimpan atau memanipulasi slice secara dinamis — tidak bisa dengan sintaks [a:b] biasa.',
      uses: ['Slice dinamis','Reusable slice','NumPy indexing','Custom __getitem__'],
      syntax: `s = <span class="fn">slice</span>(<span class="nm">1</span>, <span class="nm">5</span>, <span class="nm">2</span>)
lst = [<span class="nm">0</span>,<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>,<span class="nm">4</span>,<span class="nm">5</span>]
lst[s]     <span class="cm"># [1, 3] — setara lst[1:5:2]</span>
HEADER = <span class="fn">slice</span>(<span class="nm">0</span>, <span class="nm">3</span>)   <span class="cm"># reuse sebagai variabel</span>
baris[HEADER]`,
      params: 'slice(stop) / slice(start, stop[, step])'
    },
    {
      name: 'aiter() / anext()', tag: 'builtin', ver: '3.10',
      short: 'Iterator asinkron — versi async dari iter()/next().',
      desc: 'aiter() (Python 3.10+) mengembalikan async iterator dari async iterable. anext() mengambil item berikutnya dari async iterator, mendukung nilai default.',
      uses: ['Async streaming','WebSocket data','Async generator','Async protokol'],
      syntax: `<span class="kw">import</span> asyncio

<span class="kw">async def</span> <span class="fn">contoh</span>():
    <span class="kw">async def</span> <span class="fn">async_gen</span>():
        <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="nm">3</span>):
            <span class="kw">yield</span> i

    ait = <span class="fn">aiter</span>(<span class="fn">async_gen</span>())
    <span class="fn">print</span>(<span class="kw">await</span> <span class="fn">anext</span>(ait))      <span class="cm"># 0</span>
    <span class="fn">print</span>(<span class="kw">await</span> <span class="fn">anext</span>(ait))      <span class="cm"># 1</span>
    <span class="fn">print</span>(<span class="kw">await</span> <span class="fn">anext</span>(ait, <span class="st">"end"</span>)) <span class="cm"># 2</span>

asyncio.run(<span class="fn">contoh</span>())`,
      params: 'aiter(async_iterable) / anext(async_iterator[, default])'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 6. FUNGSI NUMERIK & MATEMATIKA
// ═══════════════════════════════════════════════════════════
{
  id: 'math-funcs', title: 'Fungsi Numerik & Matematis', icon: '🧮', color: COLORS.builtin, type: 'builtin',
  desc: 'abs, round, pow, divmod, sum, min, max, bin, oct, hex, ord, chr, hash',
  commands: [
    {
      name: 'abs()', tag: 'builtin',
      short: 'Mengembalikan nilai absolut (mutlak) suatu angka.',
      desc: 'Bekerja pada int, float, dan complex. Untuk complex mengembalikan modulusnya (panjang vektor). Memanggil __abs__().',
      uses: ['Jarak/selisih','Error analysis','Geometri','Validasi batas'],
      syntax: `<span class="fn">abs</span>(<span class="op">-</span><span class="nm">42</span>)       <span class="cm"># 42</span>
<span class="fn">abs</span>(<span class="op">-</span><span class="nm">3.14</span>)     <span class="cm"># 3.14</span>
<span class="fn">abs</span>(<span class="nm">3</span> <span class="op">+</span> <span class="nm">4j</span>)    <span class="cm"># 5.0 (modulus)</span>
selisih = <span class="fn">abs</span>(target <span class="op">-</span> aktual)`,
      params: 'abs(x)'
    },
    {
      name: 'round()', tag: 'builtin',
      short: 'Membulatkan angka ke presisi tertentu.',
      desc: 'Membulatkan ke ndigits desimal. Menggunakan "banker\'s rounding" (round half to even) — 2.5 → 2 dan 3.5 → 4. Standar IEEE 754. Untuk pembulatan konvensional gunakan math.ceil/floor atau decimal.ROUND_HALF_UP.',
      uses: ['Format harga','Presisi ilmiah','Pembulatan desimal','Display angka'],
      syntax: `<span class="fn">round</span>(<span class="nm">3.14159</span>, <span class="nm">2</span>)  <span class="cm"># 3.14</span>
<span class="fn">round</span>(<span class="nm">2.5</span>)          <span class="cm"># 2 (banker's rounding!)</span>
<span class="fn">round</span>(<span class="nm">3.5</span>)          <span class="cm"># 4</span>
<span class="fn">round</span>(<span class="nm">1234</span>, <span class="op">-</span><span class="nm">2</span>)     <span class="cm"># 1200 (ke ratusan)</span>`,
      params: 'round(number, ndigits=None)'
    },
    {
      name: 'pow()', tag: 'builtin',
      short: 'Menghitung pangkat, dengan opsional modulo efisien.',
      desc: 'pow(x, y) setara x**y. pow(x, y, z) menghitung (x**y) % z secara efisien — jauh lebih cepat untuk bilangan besar. pow(3, -1, 7) = modular inverse (Python 3.8+).',
      uses: ['Perpangkatan','Kriptografi RSA','Modular arithmetic','Kombinatorik'],
      syntax: `<span class="fn">pow</span>(<span class="nm">2</span>, <span class="nm">10</span>)           <span class="cm"># 1024</span>
<span class="fn">pow</span>(<span class="nm">2</span>, <span class="op">-</span><span class="nm">1</span>)           <span class="cm"># 0.5</span>
<span class="fn">pow</span>(<span class="nm">2</span>, <span class="nm">10</span>, <span class="nm">1000</span>)     <span class="cm"># 24 → (2**10)%1000</span>
<span class="fn">pow</span>(<span class="nm">3</span>, <span class="op">-</span><span class="nm">1</span>, <span class="nm">7</span>)         <span class="cm"># 5 (modular inverse, 3.8+)</span>`,
      params: 'pow(base, exp, mod=None)'
    },
    {
      name: 'divmod()', tag: 'builtin',
      short: 'Mengembalikan hasil bagi dan sisa pembagian sekaligus.',
      desc: 'Setara (a//b, a%b) tapi lebih efisien karena satu operasi divisi. Berguna untuk konversi satuan waktu.',
      uses: ['Konversi waktu','Konversi satuan','Algoritma numerik','Format angka'],
      syntax: `<span class="fn">divmod</span>(<span class="nm">17</span>, <span class="nm">5</span>)     <span class="cm"># (3, 2)</span>
total = <span class="nm">3725</span>
jam, sisa = <span class="fn">divmod</span>(total, <span class="nm">3600</span>)
menit, detik = <span class="fn">divmod</span>(sisa, <span class="nm">60</span>)
<span class="fn">print</span>(<span class="st">f"<span class="dc">{jam}</span>:<span class="dc">{menit:02}</span>:<span class="dc">{detik:02}</span>"</span>)   <span class="cm"># 1:02:05</span>`,
      params: 'divmod(a, b)'
    },
    {
      name: 'sum()', tag: 'builtin',
      short: 'Menjumlahkan semua elemen dalam iterable.',
      desc: 'Menjumlahkan dari nilai start (default 0). Untuk string gunakan "".join() — lebih efisien. sum([[1,2],[3,4]], []) bisa flatten list tapi lambat untuk list besar.',
      uses: ['Total harga','Rata-rata','Statistik dasar','Agregasi data'],
      syntax: `<span class="fn">sum</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>,<span class="nm">4</span>,<span class="nm">5</span>])          <span class="cm"># 15</span>
<span class="fn">sum</span>(<span class="fn">range</span>(<span class="nm">101</span>))             <span class="cm"># 5050</span>
<span class="fn">sum</span>([<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>], <span class="nm">10</span>)            <span class="cm"># 16 (start=10)</span>
rata = <span class="fn">sum</span>(nilai) / <span class="fn">len</span>(nilai)`,
      params: 'sum(iterable, /, start=0)'
    },
    {
      name: 'min() / max()', tag: 'builtin',
      short: 'Mengembalikan nilai terkecil atau terbesar.',
      desc: 'Bisa menerima iterable atau argumen terpisah. Mendukung key function. Parameter default (Python 3.4+) mencegah ValueError saat iterable kosong.',
      uses: ['Nilai ekstrem','Leaderboard','Batas valid','Normalisasi data'],
      syntax: `<span class="fn">min</span>([<span class="nm">3</span>,<span class="nm">1</span>,<span class="nm">4</span>])              <span class="cm"># 1</span>
<span class="fn">max</span>(<span class="nm">3</span>, <span class="nm">7</span>, <span class="nm">2</span>)              <span class="cm"># 7</span>
<span class="fn">min</span>([], default=<span class="nm">0</span>)        <span class="cm"># 0 — aman!</span>
<span class="fn">min</span>([])                    <span class="cm"># ⚠ ValueError!</span>
siswa = [(<span class="st">"Budi"</span>,<span class="nm">92</span>),(<span class="st">"Andi"</span>,<span class="nm">85</span>)]
<span class="fn">max</span>(siswa, key=<span class="kw">lambda</span> x: x[<span class="nm">1</span>])  <span class="cm"># ('Budi',92)</span>`,
      params: 'min(iterable, *, key=None, default=...) / max(...)'
    },
    {
      name: 'bin() / oct() / hex()', tag: 'builtin',
      short: 'Konversi integer ke string basis 2/8/16.',
      desc: 'Menghasilkan string dengan prefix: 0b (biner), 0o (oktal), 0x (heksadesimal). Untuk format tanpa prefix gunakan format(n, "b"), format(n, "o"), format(n, "x").',
      uses: ['Bitmask','Debugging memory','Warna hex','Protokol biner'],
      syntax: `<span class="fn">bin</span>(<span class="nm">42</span>)     <span class="cm"># '0b101010'</span>
<span class="fn">oct</span>(<span class="nm">42</span>)     <span class="cm"># '0o52'</span>
<span class="fn">hex</span>(<span class="nm">255</span>)    <span class="cm"># '0xff'</span>
<span class="fn">format</span>(<span class="nm">255</span>, <span class="st">"x"</span>)   <span class="cm"># 'ff' (tanpa prefix)</span>
<span class="fn">format</span>(<span class="nm">255</span>, <span class="st">"b"</span>)   <span class="cm"># '11111111'</span>`,
      params: 'bin(x) / oct(x) / hex(x)'
    },
    {
      name: 'ord() / chr()', tag: 'builtin',
      short: 'Konversi antara karakter dan kode Unicode.',
      desc: 'ord() mengambil karakter tunggal, mengembalikan code point Unicode. chr() kebalikannya — dari integer ke karakter Unicode.',
      uses: ['Enkripsi sederhana','Caesar cipher','Manipulasi karakter','Unicode processing'],
      syntax: `<span class="fn">ord</span>(<span class="st">'A'</span>)    <span class="cm"># 65</span>
<span class="fn">ord</span>(<span class="st">'π'</span>)    <span class="cm"># 960</span>
<span class="fn">chr</span>(<span class="nm">65</span>)     <span class="cm"># 'A'</span>
<span class="fn">chr</span>(<span class="nm">9829</span>)   <span class="cm"># '♥'</span>
<span class="fn">chr</span>(<span class="fn">ord</span>(<span class="st">'A'</span>) <span class="op">+</span> <span class="nm">3</span>)   <span class="cm"># 'D' (Caesar cipher)</span>`,
      params: 'ord(c) / chr(i)'
    },
    {
      name: 'hash()', tag: 'builtin',
      short: 'Mengembalikan nilai hash integer dari objek.',
      desc: 'Digunakan oleh dict dan set. Hash string diacak per-proses (PYTHONHASHSEED). hash(42)==42 selalu. Objek mutable (list, dict) tidak hashable. Jangan gunakan untuk password — gunakan hashlib.',
      uses: ['Dict internals','Caching','Deduplication','Set membership'],
      syntax: `<span class="fn">hash</span>(<span class="st">"hello"</span>)   <span class="cm"># acak per proses (PYTHONHASHSEED)</span>
<span class="fn">hash</span>(<span class="nm">42</span>)         <span class="cm"># 42 (selalu)</span>
<span class="fn">hash</span>((<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>))    <span class="cm"># hashable</span>
<span class="fn">hash</span>([<span class="nm">1</span>,<span class="nm">2</span>])      <span class="cm"># TypeError! list tidak hashable</span>
<span class="cm"># ⚠ Bukan untuk password! Gunakan hashlib/bcrypt.</span>`,
      params: 'hash(object)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 7. INTROSPEKSI & REFLEKSI
// ═══════════════════════════════════════════════════════════
{
  id: 'introspect', title: 'Introspeksi & Refleksi', icon: '🔍', color: COLORS.builtin, type: 'builtin',
  desc: 'type, isinstance, issubclass, id, dir, vars, getattr, setattr, delattr, hasattr, callable, locals, globals',
  commands: [
    {
      name: 'type()', tag: 'builtin',
      short: 'Mengembalikan tipe/class suatu objek.',
      desc: 'Dengan 1 argumen mengembalikan tipe objek. Dengan 3 argumen membuat kelas baru secara dinamis (metaprogramming). Gunakan isinstance() untuk type checking yang mempertimbangkan inheritance.',
      uses: ['Type checking','Debugging','Class dinamis','Dispatch'],
      syntax: `<span class="fn">type</span>(<span class="nm">42</span>)           <span class="cm"># &lt;class 'int'&gt;</span>
<span class="fn">type</span>(<span class="st">"halo"</span>)        <span class="cm"># &lt;class 'str'&gt;</span>
<span class="kw">if</span> <span class="fn">type</span>(x) <span class="kw">is</span> <span class="cls">int</span>: ...   <span class="cm"># exact type check</span>
<span class="cm"># Buat kelas dinamis:</span>
Anjing = <span class="fn">type</span>(<span class="st">"Anjing"</span>, (<span class="cls">object</span>,), {<span class="st">"nama"</span>: <span class="st">"Rex"</span>})`,
      params: 'type(object) / type(name, bases, dict)'
    },
    {
      name: 'isinstance()', tag: 'builtin',
      short: 'Mengecek apakah objek adalah instance dari class tertentu.',
      desc: 'Lebih aman dari type() karena mempertimbangkan inheritance. Bisa menerima tuple of types. Cara idiomatis untuk type checking di Python.',
      uses: ['Type checking aman','Validasi parameter','OOP dispatch','Duck typing'],
      syntax: `<span class="fn">isinstance</span>(<span class="nm">42</span>, <span class="cls">int</span>)             <span class="cm"># True</span>
<span class="fn">isinstance</span>(<span class="bl">True</span>, <span class="cls">int</span>)           <span class="cm"># True (bool subclass int)</span>
<span class="fn">isinstance</span>(<span class="nm">3.14</span>, (<span class="cls">int</span>, <span class="cls">float</span>))  <span class="cm"># True</span>
<span class="kw">def</span> <span class="fn">proses</span>(data):
    <span class="kw">if</span> <span class="fn">isinstance</span>(data, <span class="cls">str</span>):
        <span class="kw">return</span> data.upper()`,
      params: 'isinstance(object, classinfo)'
    },
    {
      name: 'issubclass()', tag: 'builtin',
      short: 'Mengecek apakah suatu class adalah subclass dari class lain.',
      desc: 'Mengembalikan True jika class pertama adalah subclass dari class kedua. Sebuah class dianggap subclass dari dirinya sendiri.',
      uses: ['Validasi hierarki','Plugin system','OOP design','Framework'],
      syntax: `<span class="fn">issubclass</span>(<span class="cls">bool</span>, <span class="cls">int</span>)         <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="cls">int</span>, (<span class="cls">int</span>, <span class="cls">float</span>))  <span class="cm"># True</span>
<span class="kw">class</span> <span class="cls">Hewan</span>: <span class="kw">pass</span>
<span class="kw">class</span> <span class="cls">Kucing</span>(<span class="cls">Hewan</span>): <span class="kw">pass</span>
<span class="fn">issubclass</span>(<span class="cls">Kucing</span>, <span class="cls">Hewan</span>)      <span class="cm"># True</span>`,
      params: 'issubclass(class, classinfo)'
    },
    {
      name: 'id()', tag: 'builtin',
      short: 'Mengembalikan identitas unik (alamat memori) objek.',
      desc: 'Mengembalikan integer unik dan konstan selama objek hidup. Di CPython, ini adalah alamat memori. Digunakan oleh operator is untuk cek identitas.',
      uses: ['Debug aliasing','Cek identitas objek','Memory profiling','Interning'],
      syntax: `a = [<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>]; b = a; c = [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]
<span class="fn">id</span>(a) <span class="op">==</span> <span class="fn">id</span>(b)   <span class="cm"># True  (sama objek)</span>
<span class="fn">id</span>(a) <span class="op">==</span> <span class="fn">id</span>(c)   <span class="cm"># False (objek berbeda)</span>
a <span class="kw">is</span> b           <span class="cm"># True</span>
a <span class="kw">is</span> c           <span class="cm"># False</span>`,
      params: 'id(object)'
    },
    {
      name: 'dir()', tag: 'builtin',
      short: 'Mengembalikan list atribut dan method suatu objek.',
      desc: 'Tanpa argumen mengembalikan nama di scope lokal. Dengan argumen mengembalikan atribut objek termasuk yang diwarisi. Berguna untuk eksplorasi API interaktif.',
      uses: ['Eksplorasi API','Auto-complete','Introspeksi','Debug REPL'],
      syntax: `<span class="fn">dir</span>()               <span class="cm"># nama di scope lokal</span>
<span class="fn">dir</span>(<span class="nm">42</span>)             <span class="cm"># method integer</span>
<span class="fn">dir</span>(<span class="st">"hello"</span>)        <span class="cm"># method string</span>
<span class="cm"># Lihat method publik (tanpa underscore)</span>
[m <span class="kw">for</span> m <span class="kw">in</span> <span class="fn">dir</span>(x) <span class="kw">if</span> <span class="kw">not</span> m.startswith(<span class="st">"_"</span>)]`,
      params: 'dir([object])'
    },
    {
      name: 'vars()', tag: 'builtin',
      short: 'Mengembalikan __dict__ dari objek atau scope lokal.',
      desc: 'Tanpa argumen setara dengan locals(). Dengan argumen mengembalikan __dict__ objek berisi semua atribut instance-nya.',
      uses: ['Inspect objek','Serialisasi','ORM','Template engine'],
      syntax: `<span class="kw">class</span> <span class="cls">Orang</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nama, umur):
        <span class="bl">self</span>.nama = nama; <span class="bl">self</span>.umur = umur
o = <span class="cls">Orang</span>(<span class="st">"Budi"</span>, <span class="nm">25</span>)
<span class="fn">vars</span>(o)    <span class="cm"># {'nama': 'Budi', 'umur': 25}</span>
<span class="fn">vars</span>()     <span class="cm"># variabel lokal saat ini</span>`,
      params: 'vars([object])'
    },
    {
      name: 'locals() / globals()', tag: 'builtin',
      short: 'Mengembalikan dict variabel lokal dan global saat ini.',
      desc: 'locals() mengembalikan dict variabel di scope lokal saat ini (snapshot — memodifikasi dict tidak selalu mengubah variabel lokal). globals() mengembalikan dict namespace modul global saat ini (bisa dimodifikasi).',
      uses: ['Introspeksi namespace','Template engine','Debug','Dynamic variable access'],
      syntax: `x = <span class="nm">10</span>
<span class="fn">print</span>(<span class="st">"x"</span> <span class="kw">in</span> <span class="fn">globals</span>())    <span class="cm"># True</span>

<span class="kw">def</span> <span class="fn">f</span>():
    a = <span class="nm">1</span>; b = <span class="nm">2</span>
    <span class="fn">print</span>(<span class="fn">locals</span>())    <span class="cm"># {'a': 1, 'b': 2}</span>

<span class="cm"># Akses global via string nama</span>
<span class="fn">globals</span>()[<span class="st">"y"</span>] = <span class="nm">99</span>     <span class="cm"># sama dengan y = 99</span>`,
      params: 'locals() / globals()'
    },
    {
      name: 'getattr() / setattr() / delattr() / hasattr()', tag: 'builtin',
      short: 'Operasi atribut dinamis pada objek.',
      desc: 'Memungkinkan akses, pengubahan, penghapusan, dan pengecekan atribut secara dinamis menggunakan string nama. Inti dari duck typing dan metaprogramming Python.',
      uses: ['Akses dinamis','Plugin/extension','ORM','Config loader'],
      syntax: `k = <span class="cls">Kucing</span>()
<span class="fn">getattr</span>(k, <span class="st">"nama"</span>)             <span class="cm"># akses atribut</span>
<span class="fn">getattr</span>(k, <span class="st">"warna"</span>, <span class="st">"hitam"</span>)  <span class="cm"># default jika tak ada</span>
<span class="fn">setattr</span>(k, <span class="st">"umur"</span>, <span class="nm">3</span>)          <span class="cm"># k.umur = 3</span>
<span class="fn">hasattr</span>(k, <span class="st">"nama"</span>)             <span class="cm"># True</span>
<span class="fn">delattr</span>(k, <span class="st">"umur"</span>)             <span class="cm"># del k.umur</span>`,
      params: 'getattr(obj, name[, default]) / setattr(obj, name, value) / ...'
    },
    {
      name: 'callable()', tag: 'builtin',
      short: 'Mengecek apakah objek bisa dipanggil (callable).',
      desc: 'Mengembalikan True jika objek memiliki __call__(). Fungsi, kelas, lambda, method, dan objek dengan __call__ semuanya callable.',
      uses: ['Validasi callback','Plugin system','Duck typing','Dispatch'],
      syntax: `<span class="fn">callable</span>(<span class="fn">print</span>)      <span class="cm"># True</span>
<span class="fn">callable</span>(<span class="nm">42</span>)          <span class="cm"># False</span>
<span class="fn">callable</span>(<span class="cls">int</span>)         <span class="cm"># True (class bisa dipanggil)</span>
<span class="kw">class</span> <span class="cls">X</span>:
    <span class="kw">def</span> <span class="fn">__call__</span>(<span class="bl">self</span>): ...
<span class="fn">callable</span>(<span class="cls">X</span>())         <span class="cm"># True</span>`,
      params: 'callable(object)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 8. OOP & CLASS TOOLS
// ═══════════════════════════════════════════════════════════
{
  id: 'oop-funcs', title: 'OOP & Class Tools', icon: '🧱', color: COLORS.builtin, type: 'builtin',
  desc: 'object, super, property, classmethod, staticmethod, format, help',
  commands: [
    {
      name: 'object()', tag: 'builtin',
      short: 'Base class dari semua class Python.',
      desc: 'Kelas dasar yang diwarisi semua class. Menyediakan implementasi default __hash__, __eq__, __str__, __repr__. Berguna sebagai base explicit dan untuk sentinel unik.',
      uses: ['Base class explicit','Sentinels','Mixin base','Default behavior'],
      syntax: `<span class="kw">class</span> <span class="cls">Kucing</span>(<span class="cls">object</span>):   <span class="cm"># identik dengan class Kucing:</span>
    <span class="kw">pass</span>
<span class="cm"># Sentinel unik (lebih eksplisit dari None)</span>
_KOSONG = <span class="cls">object</span>()
<span class="kw">def</span> <span class="fn">f</span>(val=_KOSONG):
    <span class="kw">if</span> val <span class="kw">is</span> _KOSONG: <span class="fn">print</span>(<span class="st">"tidak diisi"</span>)`,
      params: 'object()'
    },
    {
      name: 'property()', tag: 'builtin',
      short: 'Membuat managed attribute dengan getter/setter/deleter.',
      desc: 'Memungkinkan metode diperlakukan seperti atribut. Membuat encapsulation tanpa mengubah API. Digunakan sebagai decorator @property.',
      uses: ['Enkapsulasi','Komputasi lazy','Validasi saat set','ORM field'],
      syntax: `<span class="kw">class</span> <span class="cls">Lingkaran</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, r): <span class="bl">self</span>._r = r
    <span class="op">@</span><span class="fn">property</span>
    <span class="kw">def</span> <span class="fn">radius</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="bl">self</span>._r
    <span class="op">@</span>radius.<span class="fn">setter</span>
    <span class="kw">def</span> <span class="fn">radius</span>(<span class="bl">self</span>, val):
        <span class="kw">if</span> val <span class="op">&lt;</span> <span class="nm">0</span>: <span class="kw">raise</span> <span class="ex">ValueError</span>
        <span class="bl">self</span>._r = val`,
      params: 'property(fget=None, fset=None, fdel=None, doc=None)'
    },
    {
      name: 'classmethod() / staticmethod()', tag: 'builtin',
      short: 'Decorator untuk method class dan method statis.',
      desc: '@classmethod menerima class (cls) sebagai argumen pertama, bukan instance. @staticmethod tidak menerima class atau instance — fungsi biasa di namespace class.',
      uses: ['Factory method','Alternative constructor','Utility function','Namespace grouping'],
      syntax: `<span class="kw">class</span> <span class="cls">Tanggal</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, y, m, d):
        <span class="bl">self</span>.y, <span class="bl">self</span>.m, <span class="bl">self</span>.d = y, m, d
    <span class="op">@</span><span class="fn">classmethod</span>
    <span class="kw">def</span> <span class="fn">dari_string</span>(cls, s):
        y, m, d = s.split(<span class="st">"-"</span>)
        <span class="kw">return</span> cls(<span class="fn">int</span>(y), <span class="fn">int</span>(m), <span class="fn">int</span>(d))
    <span class="op">@</span><span class="fn">staticmethod</span>
    <span class="kw">def</span> <span class="fn">validasi</span>(s): <span class="kw">return</span> <span class="st">"-"</span> <span class="kw">in</span> s`,
      params: '@classmethod / @staticmethod'
    },
    {
      name: 'super()', tag: 'builtin',
      short: 'Mengembalikan proxy ke class induk (parent).',
      desc: 'Memanggil method dari class induk mengikuti MRO (Method Resolution Order). Paling sering dipakai di __init__ untuk memanggil constructor parent.',
      uses: ['Inheritance','Override method','Multiple inheritance','__init__ parent'],
      syntax: `<span class="kw">class</span> <span class="cls">Kucing</span>(<span class="cls">Hewan</span>):
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nama, warna):
        <span class="fn">super</span>().__init__(nama)   <span class="cm"># panggil Hewan.__init__</span>
        <span class="bl">self</span>.warna = warna
    <span class="kw">def</span> <span class="fn">suara</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"<span class="dc">{super().suara()}</span> Meow!"</span>`,
      params: 'super() / super(type, obj)'
    },
    {
      name: 'format()', tag: 'builtin',
      short: 'Memformat nilai menggunakan format spec.',
      desc: 'Memanggil __format__() dari objek. Lebih fleksibel dari f-string untuk spec dinamis. Mendukung format angka, padding, alignment.',
      uses: ['Format angka','Padding teks','Tabel output','Custom format'],
      syntax: `<span class="fn">format</span>(<span class="nm">3.14159</span>, <span class="st">".2f"</span>)   <span class="cm"># '3.14'</span>
<span class="fn">format</span>(<span class="nm">1000000</span>, <span class="st">","</span>)      <span class="cm"># '1,000,000'</span>
<span class="fn">format</span>(<span class="nm">42</span>, <span class="st">"08b"</span>)         <span class="cm"># '00101010'</span>
<span class="fn">format</span>(<span class="st">"halo"</span>, <span class="st">"&gt;10"</span>)     <span class="cm"># '      halo'</span>
<span class="fn">format</span>(<span class="nm">0.85</span>, <span class="st">".1%"</span>)       <span class="cm"># '85.0%'</span>`,
      params: 'format(value, format_spec="")'
    },
    {
      name: 'help()', tag: 'builtin',
      short: 'Menampilkan dokumentasi bantuan interaktif.',
      desc: 'Membuka sistem bantuan interaktif Python. Dengan argumen menampilkan docstring dari modul, fungsi, class, atau keyword. Sangat berguna di REPL/shell.',
      uses: ['Eksplorasi API','Belajar Python','Dokumentasi cepat','REPL learning'],
      syntax: `<span class="fn">help</span>()             <span class="cm"># mode bantuan interaktif</span>
<span class="fn">help</span>(<span class="fn">print</span>)        <span class="cm"># dokumen fungsi print</span>
<span class="fn">help</span>(<span class="cls">str</span>)          <span class="cm"># dokumen class str</span>
<span class="fn">help</span>(<span class="st">"keywords"</span>)   <span class="cm"># list semua keyword</span>`,
      params: 'help([object])'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 9. FUNGSI FUNGSIONAL & MISC
// ═══════════════════════════════════════════════════════════
{
  id: 'functional', title: 'Fungsi Fungsional & Misc', icon: '⚙️', color: COLORS.builtin, type: 'builtin',
  desc: 'any, all, eval, exec, compile, __import__, breakpoint, exit, quit',
  commands: [
    {
      name: 'any() / all()', tag: 'builtin',
      short: 'Cek apakah ada atau semua elemen yang True.',
      desc: 'any() True jika minimal satu elemen True (short-circuit). all() True jika semua elemen True (short-circuit). all([]) == True (vacuous truth), any([]) == False.',
      uses: ['Validasi form','Cek kondisi massal','Guard logic','Data QA'],
      syntax: `<span class="fn">any</span>([<span class="nm">0</span>, <span class="nm">0</span>, <span class="nm">1</span>, <span class="nm">0</span>])       <span class="cm"># True</span>
<span class="fn">all</span>([<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>])            <span class="cm"># True</span>
<span class="fn">all</span>([])                   <span class="cm"># True (vacuous truth!)</span>
<span class="fn">any</span>([])                   <span class="cm"># False</span>
form = {<span class="st">"nama"</span>: <span class="st">"Andi"</span>, <span class="st">"email"</span>: <span class="st">""</span>}
<span class="fn">all</span>(form.values())        <span class="cm"># False</span>`,
      params: 'any(iterable) / all(iterable)'
    },
    {
      name: 'eval()', tag: 'builtin',
      short: 'Mengevaluasi ekspresi Python dari string.',
      desc: 'Mengevaluasi string sebagai ekspresi Python. BERBAHAYA dengan input user! Gunakan ast.literal_eval() untuk literal Python yang aman.',
      uses: ['Calculator dinamis','Config parser','REPL sederhana','Ekspresi matematis'],
      syntax: `<span class="fn">eval</span>(<span class="st">"2 + 3 * 4"</span>)        <span class="cm"># 14</span>
<span class="fn">eval</span>(<span class="st">"[1,2,3]"</span>)           <span class="cm"># [1, 2, 3]</span>
<span class="cm"># Batasi namespace (lebih aman)</span>
<span class="fn">eval</span>(<span class="st">"2+2"</span>, {<span class="st">"__builtins__"</span>: {}})
<span class="cm"># Aman untuk literal: gunakan ast.literal_eval!</span>
<span class="kw">import</span> ast
ast.<span class="fn">literal_eval</span>(<span class="st">"[1,2,3]"</span>)   <span class="cm"># aman</span>`,
      params: 'eval(expression, globals=None, locals=None)'
    },
    {
      name: 'exec()', tag: 'builtin',
      short: 'Menjalankan kode Python dinamis (statements).',
      desc: 'Seperti eval() tapi untuk statements (blok kode lengkap). SANGAT BERBAHAYA dengan input user. Selalu jalankan di namespace terpisah.',
      uses: ['Code generation','Plugin system','REPL','Dynamic class creation'],
      syntax: `<span class="fn">exec</span>(<span class="st">"x = 10"</span>)
<span class="fn">exec</span>(<span class="st">"for i in range(3): print(i)"</span>)
<span class="cm"># Jalankan di namespace terpisah (aman)</span>
ns = {}
<span class="fn">exec</span>(<span class="st">"def f(x): return x*2"</span>, ns)
ns[<span class="st">"f"</span>](<span class="nm">5</span>)   <span class="cm"># 10</span>`,
      params: 'exec(object, globals=None, locals=None)'
    },
    {
      name: 'compile()', tag: 'builtin',
      short: 'Mengkompilasi source code menjadi code object.',
      desc: 'Mengkompilasi string/AST ke bytecode yang bisa dijalankan dengan eval() atau exec(). Lebih efisien jika kode yang sama dijalankan berulang kali.',
      uses: ['Precompile kode','AST manipulation','Template engine','Optimization'],
      syntax: `kode = <span class="fn">compile</span>(<span class="st">"x + y"</span>, <span class="st">"&lt;string&gt;"</span>, <span class="st">"eval"</span>)
<span class="fn">eval</span>(kode, {<span class="st">"x"</span>: <span class="nm">10</span>, <span class="st">"y"</span>: <span class="nm">20</span>})   <span class="cm"># 30</span>
blok = <span class="fn">compile</span>(<span class="st">"print('hi')"</span>, <span class="st">"&lt;s&gt;"</span>, <span class="st">"exec"</span>)
<span class="fn">exec</span>(blok)`,
      params: 'compile(source, filename, mode, flags=0, ...)'
    },
    {
      name: 'breakpoint()', tag: 'builtin', ver: '3.7',
      short: 'Memulai debugger di titik pemanggilan (Python 3.7+).',
      desc: 'Memanggil sys.breakpointhook() yang defaultnya membuka pdb. Dikonfigurasi lewat env var PYTHONBREAKPOINT. Set PYTHONBREAKPOINT=0 untuk disable semua breakpoint.',
      uses: ['Debugging','Post-mortem analysis','Inspeksi variabel','Step-through code'],
      syntax: `<span class="kw">def</span> <span class="fn">hitung</span>(a, b):
    hasil = a <span class="op">+</span> b
    <span class="fn">breakpoint</span>()   <span class="cm"># buka pdb di sini</span>
    <span class="kw">return</span> hasil
<span class="cm"># Disable: PYTHONBREAKPOINT=0 python app.py</span>
<span class="cm"># Ganti debugger: PYTHONBREAKPOINT=pudb.set_trace</span>`,
      params: 'breakpoint(*args, **kwargs)'
    },
    {
      name: '__import__()', tag: 'builtin',
      short: 'Import modul secara dinamis (low-level).',
      desc: 'Fungsi tingkat rendah yang dipanggil oleh statement import. Lebih disarankan menggunakan importlib.import_module() untuk import dinamis.',
      uses: ['Import dinamis','Plugin loader','Conditional import','Module discovery'],
      syntax: `<span class="cm"># Cara yang disarankan:</span>
<span class="kw">import</span> importlib
mod = importlib.<span class="fn">import_module</span>(<span class="st">"os.path"</span>)
<span class="cm"># Cara lama (tidak disarankan):</span>
os = <span class="fn">__import__</span>(<span class="st">"os"</span>)`,
      params: '__import__(name, globals, locals, fromlist, level)'
    },
    {
      name: 'exit() / quit()', tag: 'builtin',
      short: 'Keluar dari interpreter Python.',
      desc: 'Mengangkat SystemExit. Dirancang untuk digunakan interaktif di REPL. Untuk kode produksi, gunakan sys.exit(code) — lebih eksplisit dan bekerja tanpa modul site.',
      uses: ['Keluar REPL','Script sederhana','Quick exit','Interactive use'],
      syntax: `<span class="fn">exit</span>()       <span class="cm"># keluar dari interpreter</span>
<span class="fn">exit</span>(<span class="nm">1</span>)      <span class="cm"># keluar dengan kode error</span>
<span class="fn">quit</span>()       <span class="cm"># identik dengan exit()</span>
<span class="cm"># Di kode produksi, lebih baik:</span>
<span class="kw">import</span> sys
sys.<span class="fn">exit</span>(<span class="nm">0</span>)  <span class="cm"># eksplisit dan lebih portabel</span>`,
      params: 'exit([code]) / quit([code])'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 10. KEYWORDS PYTHON
// ═══════════════════════════════════════════════════════════
{
  id: 'keywords', title: 'Keywords Python', icon: '🔑', color: COLORS.keyword, type: 'keyword',
  desc: 'if/elif/else, for/while, def/class, async/await, yield, match/case, try/except, with, import, dan lainnya',
  commands: [
    {
      name: 'if / elif / else', tag: 'keyword',
      short: 'Percabangan kondisional.',
      desc: 'Kontrol alur berdasarkan kondisi boolean. Python menggunakan indentasi untuk blok kode. Mendukung ternary expression: value_if_true if condition else value_if_false.',
      uses: ['Logika kondisional','Validasi','Guard clause','State machine'],
      syntax: `nilai = <span class="nm">75</span>
<span class="kw">if</span> nilai <span class="op">>=</span> <span class="nm">90</span>:
    <span class="fn">print</span>(<span class="st">"A"</span>)
<span class="kw">elif</span> nilai <span class="op">>=</span> <span class="nm">75</span>:
    <span class="fn">print</span>(<span class="st">"B"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="st">"C"</span>)
<span class="cm"># Ternary operator</span>
status = <span class="st">"lulus"</span> <span class="kw">if</span> nilai <span class="op">>=</span> <span class="nm">60</span> <span class="kw">else</span> <span class="st">"gagal"</span>`,
      params: 'if/elif/else'
    },
    {
      name: 'for / while / break / continue / else', tag: 'keyword',
      short: 'Perulangan dan kontrol alur loop.',
      desc: 'for mengiterasi urutan. while berulang selama kondisi True. break keluar loop. continue lanjut iterasi berikutnya. else di loop dijalankan jika tidak ada break.',
      uses: ['Iterasi data','Polling','Game loop','Search dengan break'],
      syntax: `<span class="kw">for</span> x <span class="kw">in</span> [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]:
    <span class="kw">if</span> x <span class="op">==</span> <span class="nm">2</span>: <span class="kw">continue</span>
    <span class="fn">print</span>(x)
n = <span class="nm">0</span>
<span class="kw">while</span> n <span class="op">&lt;</span> <span class="nm">3</span>: n <span class="op">+=</span> <span class="nm">1</span>
<span class="kw">for</span> x <span class="kw">in</span> [<span class="nm">1</span>,<span class="nm">2</span>]:
    <span class="kw">pass</span>
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="st">"selesai tanpa break"</span>)`,
      params: 'for item in iterable: / while condition:'
    },
    {
      name: 'def / return / lambda', tag: 'keyword',
      short: 'Mendefinisikan fungsi dan nilai kembali.',
      desc: 'def membuat fungsi bernama. return mengembalikan nilai. lambda membuat fungsi anonim satu ekspresi. Fungsi Python adalah first-class objects.',
      uses: ['Abstraksi kode','Reuse logic','Callback','Higher-order functions'],
      syntax: `<span class="kw">def</span> <span class="fn">sapa</span>(nama, salam=<span class="st">"Halo"</span>):
    <span class="kw">return</span> <span class="st">f"<span class="dc">{salam}</span>, <span class="dc">{nama}</span>!"</span>
<span class="kw">def</span> <span class="fn">banyak</span>(*args, **kwargs):
    <span class="kw">return</span> args, kwargs
kuadrat = <span class="kw">lambda</span> x: x <span class="op">**</span> <span class="nm">2</span>
<span class="fn">sorted</span>(data, key=<span class="kw">lambda</span> x: x[<span class="nm">1</span>])`,
      params: 'def name(params): / lambda args: expression'
    },
    {
      name: 'class', tag: 'keyword',
      short: 'Mendefinisikan kelas/tipe data baru.',
      desc: 'Membuat kelas — blueprint untuk objek. Python mendukung multiple inheritance, method resolution order (MRO), dan metaclass.',
      uses: ['OOP','Data modeling','Abstraksi','Library API'],
      syntax: `<span class="kw">class</span> <span class="cls">Hewan</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nama):
        <span class="bl">self</span>.nama = nama
    <span class="kw">def</span> <span class="fn">suara</span>(<span class="bl">self</span>):
        <span class="kw">raise</span> <span class="ex">NotImplementedError</span>
<span class="kw">class</span> <span class="cls">Kucing</span>(<span class="cls">Hewan</span>):
    <span class="kw">def</span> <span class="fn">suara</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">"Meow"</span>`,
      params: 'class ClassName(BaseClass):'
    },
    {
      name: 'try / except / finally / raise / else', tag: 'keyword',
      short: 'Penanganan error dan eksepsi.',
      desc: 'try menjalankan kode berisiko. except menangkap eksepsi spesifik. finally selalu dijalankan (cleanup). else dijalankan jika tidak ada exception. raise melempar exception. <strong>raise X from Y</strong> untuk exception chaining — menyimpan konteks original.',
      uses: ['Error handling','Resource cleanup','Validasi','Robust code'],
      syntax: `<span class="kw">try</span>:
    hasil = <span class="nm">10</span> <span class="op">/</span> <span class="nm">0</span>
<span class="kw">except</span> <span class="ex">ZeroDivisionError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"Error: <span class="dc">{e}</span>"</span>)
<span class="kw">except</span> (<span class="ex">ValueError</span>, <span class="ex">TypeError</span>):
    <span class="fn">print</span>(<span class="st">"Nilai/Tipe salah"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="st">"Sukses!"</span>)
<span class="kw">finally</span>:
    <span class="fn">print</span>(<span class="st">"Selalu dijalankan"</span>)
<span class="cm"># Exception chaining — raise X from Y</span>
<span class="kw">try</span>:
    <span class="fn">int</span>(<span class="st">"abc"</span>)
<span class="kw">except</span> <span class="ex">ValueError</span> <span class="kw">as</span> e:
    <span class="kw">raise</span> <span class="ex">RuntimeError</span>(<span class="st">"Parsing gagal"</span>) <span class="kw">from</span> e
<span class="cm"># raise X from None — sembunyikan konteks asli</span>`,
      params: 'try/except/finally/raise/else'
    },
    {
      name: 'with / as', tag: 'keyword',
      short: 'Context manager untuk resource management.',
      desc: 'Memastikan setup dan cleanup dijalankan otomatis via __enter__ dan __exit__. Ideal untuk file, database, lock, dan koneksi jaringan.',
      uses: ['File handling','Database transaction','Threading lock','Koneksi network'],
      syntax: `<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"file.txt"</span>) <span class="kw">as</span> f:
    data = f.read()
<span class="cm"># Multiple context managers</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"in.txt"</span>) <span class="kw">as</span> src, \
     <span class="fn">open</span>(<span class="st">"out.txt"</span>, <span class="st">"w"</span>) <span class="kw">as</span> dst:
    dst.write(src.read())`,
      params: 'with expression as variable:'
    },
    {
      name: 'import / from / as', tag: 'keyword',
      short: 'Mengimpor modul dan nama dari modul.',
      desc: 'Memuat modul Python ke dalam namespace. from...import mengimpor nama spesifik. as membuat alias. Hindari "from x import *" di production code.',
      uses: ['Pakai library','Modularisasi','Alias modul','Lazy import'],
      syntax: `<span class="kw">import</span> os
<span class="kw">import</span> numpy <span class="kw">as</span> np
<span class="kw">from</span> datetime <span class="kw">import</span> datetime, timedelta
<span class="kw">from</span> pathlib <span class="kw">import</span> Path <span class="kw">as</span> P
<span class="kw">def</span> <span class="fn">f</span>():
    <span class="kw">import</span> json       <span class="cm"># lazy import</span>
    <span class="kw">return</span> json.dumps({})`,
      params: 'import module / from module import name'
    },
    {
      name: 'global / nonlocal', tag: 'keyword',
      short: 'Mengakses variabel dari scope luar.',
      desc: 'global mendeklarasikan variabel merujuk ke namespace modul. nonlocal (Python 3) merujuk ke variabel di enclosing function.',
      uses: ['Shared state','Counter','Closure','Config global'],
      syntax: `counter = <span class="nm">0</span>
<span class="kw">def</span> <span class="fn">tambah</span>():
    <span class="kw">global</span> counter
    counter <span class="op">+=</span> <span class="nm">1</span>
<span class="kw">def</span> <span class="fn">luar</span>():
    x = <span class="nm">0</span>
    <span class="kw">def</span> <span class="fn">dalam</span>():
        <span class="kw">nonlocal</span> x
        x <span class="op">+=</span> <span class="nm">1</span>
    <span class="fn">dalam</span>(); <span class="fn">print</span>(x)   <span class="cm"># 1</span>`,
      params: 'global name / nonlocal name'
    },
    {
      name: 'yield / yield from', tag: 'keyword',
      short: 'Membuat generator — fungsi lazy yang menghasilkan nilai satu per satu.',
      desc: 'yield menjadikan fungsi sebagai generator. Eksekusi dijeda di setiap yield dan dilanjutkan saat next() dipanggil. yield from mendelegasikan ke generator lain. Hemat memori untuk data besar.',
      uses: ['Lazy sequence','Pipeline data','Infinite sequence','Coroutine'],
      syntax: `<span class="kw">def</span> <span class="fn">hitung</span>(n):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
        <span class="kw">yield</span> i <span class="op">**</span> <span class="nm">2</span>
<span class="kw">for</span> x <span class="kw">in</span> <span class="fn">hitung</span>(<span class="nm">5</span>):
    <span class="fn">print</span>(x)   <span class="cm"># 0, 1, 4, 9, 16</span>
<span class="kw">def</span> <span class="fn">chain</span>(*iters):
    <span class="kw">for</span> it <span class="kw">in</span> iters:
        <span class="kw">yield from</span> it`,
      params: 'yield value / yield from iterable'
    },
    {
      name: 'async / await / async for / async with', tag: 'keyword', ver: '3.5',
      short: 'Pemrograman asinkron (Python 3.5+).',
      desc: 'async def mendefinisikan coroutine. await menjeda eksekusi sampai coroutine selesai. Digunakan dengan event loop (asyncio) untuk I/O non-blocking dan concurrency.',
      uses: ['Web scraping async','API concurrent','WebSocket','Database async'],
      syntax: `<span class="kw">import</span> asyncio
<span class="kw">async def</span> <span class="fn">fetch</span>(url):
    <span class="kw">await</span> asyncio.sleep(<span class="nm">1</span>)
    <span class="kw">return</span> <span class="st">f"data dari <span class="dc">{url}</span>"</span>
<span class="kw">async def</span> <span class="fn">main</span>():
    hasil = <span class="kw">await</span> asyncio.gather(
        <span class="fn">fetch</span>(<span class="st">"url1"</span>), <span class="fn">fetch</span>(<span class="st">"url2"</span>)
    )
asyncio.run(<span class="fn">main</span>())`,
      params: 'async def / await coro / async for / async with'
    },
    {
      name: 'match / case (Python 3.10+)', tag: 'keyword', ver: '3.10',
      short: 'Structural pattern matching — switch/case yang sangat kuat.',
      desc: 'Mencocokkan nilai terhadap pola struktural. Jauh lebih kuat dari switch: bisa mencocokkan tipe, struktur data, guard condition, dan melakukan destructuring.',
      uses: ['Command parser','HTTP status handler','AST processing','State machine'],
      syntax: `<span class="kw">def</span> <span class="fn">handle</span>(perintah):
    <span class="kw">match</span> perintah.split():
        <span class="kw">case</span> [<span class="st">"quit"</span>]:
            <span class="kw">return</span> <span class="st">"keluar"</span>
        <span class="kw">case</span> [<span class="st">"go"</span>, arah]:
            <span class="kw">return</span> <span class="st">f"pergi ke <span class="dc">{arah}</span>"</span>
        <span class="kw">case</span> _:
            <span class="kw">return</span> <span class="st">"tidak dikenal"</span>`,
      params: 'match subject: / case pattern [if guard]:'
    },
    {
      name: 'type (Python 3.12+)', tag: 'keyword', ver: '3.12',
      short: 'Mendefinisikan type alias eksplisit.',
      desc: 'Keyword baru Python 3.12 untuk membuat type alias yang benar. Mendukung generic type alias lebih kuat dari typing.TypeAlias.',
      uses: ['Type alias','Generic types','Readability','Type checking'],
      syntax: `<span class="kw">type</span> <span class="cls">Vector</span> = <span class="fn">list</span>[<span class="cls">float</span>]
<span class="kw">type</span> <span class="cls">Matrix</span>[T] = <span class="fn">list</span>[<span class="fn">list</span>[T]]
<span class="cm"># Sebelum 3.12:</span>
<span class="kw">from</span> typing <span class="kw">import</span> TypeAlias
<span class="cls">Vector</span>: TypeAlias = <span class="fn">list</span>[<span class="cls">float</span>]`,
      params: 'type Name = TypeExpression'
    },
    {
      name: 'assert', tag: 'keyword',
      short: 'Menegaskan kondisi True, raise AssertionError jika tidak.',
      desc: 'Digunakan untuk debugging dan testing. Bisa dimatikan dengan flag -O. Jangan gunakan untuk validasi input user — gunakan exceptions.',
      uses: ['Unit testing','Debug assumptions','Pre/post conditions','Dokumentasi intent'],
      syntax: `x = <span class="nm">10</span>
<span class="kw">assert</span> x <span class="op">></span> <span class="nm">0</span>              <span class="cm"># OK</span>
<span class="kw">assert</span> x <span class="op">></span> <span class="nm">20</span>, <span class="st">"x harus > 20"</span>
<span class="cm"># AssertionError: x harus > 20</span>
<span class="cm"># Disable: python -O script.py</span>`,
      params: 'assert expression [, message]'
    },
    {
      name: 'del', tag: 'keyword',
      short: 'Menghapus nama, item, atau atribut.',
      desc: 'Menghapus binding nama ke objek. Objek dihapus dari memori jika tidak ada referensi lain. Bisa menghapus slice dari list atau key dari dict.',
      uses: ['Hapus variabel','Free memori','Hapus item dict','Cleanup cache'],
      syntax: `x = <span class="nm">10</span>
<span class="kw">del</span> x             <span class="cm"># x tidak ada lagi</span>
lst = [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>,<span class="nm">4</span>]
<span class="kw">del</span> lst[<span class="nm">1</span>]        <span class="cm"># [1, 3, 4]</span>
<span class="kw">del</span> lst[<span class="nm">1</span>:<span class="nm">3</span>]      <span class="cm"># hapus slice</span>
d = {<span class="st">"a"</span>:<span class="nm">1</span>}
<span class="kw">del</span> d[<span class="st">"a"</span>]       <span class="cm"># hapus key</span>`,
      params: 'del name / del obj[key] / del obj.attr'
    },
    {
      name: 'pass', tag: 'keyword',
      short: 'Placeholder — tidak melakukan apa-apa.',
      desc: 'Digunakan di mana blok kode diperlukan secara sintaksis tapi tidak ada kode yang perlu dieksekusi. Berguna untuk stub dan todo.',
      uses: ['Stub class','TODO placeholder','Abstract method','Empty handler'],
      syntax: `<span class="kw">class</span> <span class="cls">TodoClass</span>:
    <span class="kw">pass</span>   <span class="cm"># isi nanti</span>
<span class="kw">def</span> <span class="fn">fungsi_belum_selesai</span>():
    <span class="kw">pass</span>
<span class="kw">try</span>:
    risky_operation()
<span class="kw">except</span> <span class="ex">Exception</span>:
    <span class="kw">pass</span>   <span class="cm"># abaikan error</span>`,
      params: 'pass'
    },
    {
      name: 'in / not in', tag: 'keyword',
      short: 'Mengecek keanggotaan dalam sequence atau koleksi.',
      desc: 'in mengembalikan True jika elemen ada. Efisiensi: O(1) untuk set/dict, O(n) untuk list/tuple. Juga digunakan sebagai bagian dari for loop.',
      uses: ['Cek keanggotaan','Validasi','Search','Guard condition'],
      syntax: `<span class="nm">3</span> <span class="kw">in</span> [<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>]          <span class="cm"># True</span>
<span class="st">"py"</span> <span class="kw">in</span> <span class="st">"python"</span>       <span class="cm"># True</span>
<span class="st">"a"</span> <span class="kw">in</span> {<span class="st">"a"</span>: <span class="nm">1</span>}        <span class="cm"># True (cek key)</span>
<span class="nm">5</span> <span class="kw">not in</span> {<span class="nm">1</span>,<span class="nm">2</span>,<span class="nm">3</span>}       <span class="cm"># True O(1)!</span>`,
      params: 'x in iterable / x not in iterable'
    },
    {
      name: 'is / is not', tag: 'keyword',
      short: 'Mengecek identitas objek (bukan kesamaan nilai).',
      desc: 'Berbeda dari ==. is memeriksa apakah dua variabel merujuk ke objek yang sama di memori (id() sama). Gunakan is untuk None, True, False — jangan == untuk perbandingan singleton.',
      uses: ['Cek None','Cek singleton','Debug aliasing','Identity check'],
      syntax: `x = <span class="bl">None</span>
x <span class="kw">is</span> <span class="bl">None</span>          <span class="cm"># True (selalu pakai is untuk None)</span>
x <span class="kw">is not</span> <span class="bl">None</span>      <span class="cm"># False</span>
a = [<span class="nm">1</span>,<span class="nm">2</span>]; b = a
a <span class="kw">is</span> b             <span class="cm"># True (sama objek)</span>
a <span class="kw">is</span> [<span class="nm">1</span>,<span class="nm">2</span>]         <span class="cm"># False (beda objek)</span>`,
      params: 'x is y / x is not y'
    },
    {
      name: 'and / or / not', tag: 'keyword',
      short: 'Operator logika boolean.',
      desc: 'and dan or menggunakan short-circuit evaluation dan mengembalikan nilai asli (bukan hanya True/False). not selalu mengembalikan bool.',
      uses: ['Kondisi logika','Default value','Guard clause','Short-circuit'],
      syntax: `<span class="bl">True</span> <span class="kw">and</span> <span class="bl">False</span>   <span class="cm"># False</span>
<span class="kw">not</span> <span class="bl">True</span>          <span class="cm"># False</span>
<span class="cm"># Short-circuit — mengembalikan nilai asli!</span>
<span class="nm">0</span> <span class="kw">or</span>  <span class="st">"default"</span>   <span class="cm"># "default"</span>
<span class="nm">5</span> <span class="kw">and</span> <span class="st">"ok"</span>        <span class="cm"># "ok"</span>
nama = input_nama <span class="kw">or</span> <span class="st">"Anonim"</span>`,
      params: 'x and y / x or y / not x'
    },
    {
      name: ':= (Walrus Operator / Assignment Expression)', tag: 'keyword', ver: '3.8',
      short: 'Menetapkan nilai sekaligus mengevaluasinya dalam satu ekspresi.',
      desc: 'Operator walrus <code>:=</code> (Python 3.8+, PEP 572) memungkinkan assignment di dalam ekspresi — bukan statement. Berguna menghindari evaluasi ganda dan menyederhanakan pola while/comprehension. Disebut "walrus" karena <code>:=</code> menyerupai mata dan gading walrus. Gunakan dengan bijak — utamakan keterbacaan.',
      uses: ['Loop efisien','Hindari double eval','While kondisi','Comprehension filter'],
      syntax: `<span class="cm"># Kondisi + assignment dalam satu ekspresi</span>
<span class="kw">if</span> (n := <span class="fn">len</span>(data)) <span class="op">></span> <span class="nm">10</span>:
    <span class="fn">print</span>(<span class="st">f"Terlalu panjang ({n} items)"</span>)

<span class="cm"># Loop: baca file sampai habis (tanpa walrus perlu call dua kali)</span>
<span class="kw">with</span> <span class="fn">open</span>(<span class="st">"data.bin"</span>, <span class="st">"rb"</span>) <span class="kw">as</span> f:
    <span class="kw">while</span> chunk := f.read(<span class="nm">4096</span>):
        process(chunk)

<span class="cm"># Comprehension — hindari double evaluation</span>
results = [y <span class="kw">for</span> x <span class="kw">in</span> data <span class="kw">if</span> (y := transform(x)) <span class="kw">is not</span> <span class="bl">None</span>]

<span class="cm"># Regex — match sekaligus pakai hasilnya</span>
<span class="kw">import</span> re
<span class="kw">if</span> m := re.<span class="fn">search</span>(<span class="st">r"\d+"</span>, teks):
    <span class="fn">print</span>(<span class="st">f"Angka ditemukan: {m.group()}"</span>)

<span class="cm"># input loop interaktif</span>
<span class="kw">while</span> (baris := <span class="fn">input</span>(<span class="st">"Masukkan teks (kosong=keluar): "</span>)):
    <span class="fn">print</span>(<span class="st">f"Echo: {baris}"</span>)`,
      params: 'name := expression  (Python 3.8+, PEP 572)'
    },
    {
      name: '@ (Decorator)', tag: 'keyword',
      short: 'Sintaks dekorator — membungkus fungsi/class dengan transformation function.',
      desc: 'Dekorator adalah callable yang menerima fungsi/class dan mengembalikan versi yang diperkaya. Simbol <code>@dec</code> adalah syntactic sugar untuk <code>f = dec(f)</code>. Bisa di-stack (diterapkan dari bawah ke atas). Built-in: <code>@property</code>, <code>@classmethod</code>, <code>@staticmethod</code>. Stdlib: <code>@functools.wraps</code>, <code>@functools.lru_cache</code>, <code>@functools.cache</code>, <code>@dataclasses.dataclass</code>, <code>@contextlib.contextmanager</code>, <code>@contextlib.asynccontextmanager</code>, <code>@abc.abstractmethod</code>.',
      uses: ['Logging','Timing/profiling','LRU cache','Auth & rate limit','Validation','AOP/cross-cutting'],
      syntax: `<span class="cm"># Decorator dasar</span>
<span class="kw">import</span> functools, time
<span class="kw">def</span> <span class="fn">timer</span>(func):
    <span class="op">@</span>functools.<span class="fn">wraps</span>(func)   <span class="cm"># salin __name__, __doc__, dll</span>
    <span class="kw">def</span> <span class="fn">wrapper</span>(*args, **kw):
        t = time.perf_counter()
        res = func(*args, **kw)
        <span class="fn">print</span>(<span class="st">f"{func.__name__}: {time.perf_counter()-t:.4f}s"</span>)
        <span class="kw">return</span> res
    <span class="kw">return</span> wrapper

<span class="op">@</span>timer
<span class="kw">def</span> <span class="fn">hitung</span>(n): <span class="kw">return</span> <span class="fn">sum</span>(<span class="fn">range</span>(n))

<span class="cm"># Decorator pabrik (dengan argumen)</span>
<span class="kw">def</span> <span class="fn">retry</span>(n=<span class="nm">3</span>, exc=<span class="ex">Exception</span>):
    <span class="kw">def</span> <span class="fn">dec</span>(func):
        <span class="op">@</span>functools.<span class="fn">wraps</span>(func)
        <span class="kw">def</span> <span class="fn">wrapper</span>(*a, **kw):
            <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
                <span class="kw">try</span>: <span class="kw">return</span> func(*a, **kw)
                <span class="kw">except</span> exc <span class="kw">as</span> e:
                    <span class="kw">if</span> i <span class="op">==</span> n<span class="op">-</span><span class="nm">1</span>: <span class="kw">raise</span>
        <span class="kw">return</span> wrapper
    <span class="kw">return</span> dec

<span class="op">@</span>retry(n=<span class="nm">3</span>, exc=<span class="ex">ConnectionError</span>)
<span class="kw">def</span> <span class="fn">fetch</span>(url): ...

<span class="cm"># Stack dekorator (diterapkan dari bawah ke atas)</span>
<span class="op">@</span>timer              <span class="cm"># 2. diterapkan kedua: timer(retry(2)(f))</span>
<span class="op">@</span>retry(<span class="nm">2</span>)           <span class="cm"># 1. diterapkan pertama</span>
<span class="kw">def</span> <span class="fn">f</span>(): ...

<span class="cm"># Decorator class</span>
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="op">@</span>dataclass
<span class="kw">class</span> <span class="cls">Poin</span>:
    x: <span class="cls">float</span>; y: <span class="cls">float</span>`,
      params: '@decorator / @decorator(args)  →  setara: func = decorator(func)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 11. KONSTANTA BUILT-IN
// ═══════════════════════════════════════════════════════════
{
  id: 'constants', title: 'Konstanta Built-in', icon: '🔒', color: COLORS.constant, type: 'constant',
  desc: 'None, True, False, NotImplemented, Ellipsis (...), __debug__, __name__, __doc__, license, copyright, credits',
  commands: [
    {
      name: 'None', tag: 'constant',
      short: 'Nilai tunggal yang merepresentasikan ketiadaan nilai.',
      desc: 'Satu-satunya instance NoneType. Bukan nol, bukan string kosong, bukan False. Fungsi yang tidak return eksplisit mengembalikan None. Selalu gunakan "is None" bukan "== None".',
      uses: ['Default value','Optional parameter','Sentinel','Fungsi void'],
      syntax: `x = <span class="bl">None</span>
<span class="fn">print</span>(x <span class="kw">is</span> <span class="bl">None</span>)   <span class="cm"># True (selalu gunakan is!)</span>
<span class="fn">print</span>(<span class="fn">type</span>(<span class="bl">None</span>))   <span class="cm"># &lt;class 'NoneType'&gt;</span>
<span class="kw">def</span> <span class="fn">f</span>(val=<span class="bl">None</span>):
    <span class="kw">if</span> val <span class="kw">is</span> <span class="bl">None</span>:
        val = []   <span class="cm"># default mutable yang aman</span>`,
      params: 'None'
    },
    {
      name: 'True / False', tag: 'constant',
      short: 'Nilai boolean benar dan salah.',
      desc: 'Instance bool (subclass int). True==1, False==0. Nilai falsy: None, 0, 0.0, 0j, "", b"", [], (), {}, set(), frozenset(). Semua lainnya truthy.',
      uses: ['Kondisi boolean','Flag','Toggle','Perbandingan'],
      syntax: `<span class="fn">print</span>(<span class="bl">True</span> <span class="op">+</span> <span class="bl">True</span>)   <span class="cm"># 2 (True == 1)</span>
<span class="fn">print</span>(<span class="bl">False</span> <span class="op">*</span> <span class="nm">10</span>)    <span class="cm"># 0</span>
<span class="cm"># Falsy values:</span>
<span class="fn">bool</span>(<span class="nm">0</span>); <span class="fn">bool</span>(<span class="st">""</span>); <span class="fn">bool</span>([]); <span class="fn">bool</span>(<span class="bl">None</span>)   <span class="cm"># semua False</span>
<span class="fn">bool</span>([<span class="nm">0</span>])   <span class="cm"># True — list tidak kosong!</span>`,
      params: 'True / False'
    },
    {
      name: 'NotImplemented', tag: 'constant',
      short: 'Dikembalikan oleh dunder operator jika tipe tidak didukung.',
      desc: 'Nilai yang dikembalikan dunder method binary operator untuk memberitahu Python operasi tidak didukung untuk tipe ini. Python lalu mencoba reflected operation. Berbeda dari NotImplementedError.',
      uses: ['Operator overloading','Type-agnostic ops','Custom numeric types','Protocol'],
      syntax: `<span class="kw">class</span> <span class="cls">Vektor</span>:
    <span class="kw">def</span> <span class="fn">__add__</span>(<span class="bl">self</span>, other):
        <span class="kw">if</span> <span class="kw">not</span> <span class="fn">isinstance</span>(other, <span class="cls">Vektor</span>):
            <span class="kw">return</span> <span class="bl">NotImplemented</span>
        <span class="kw">return</span> <span class="cls">Vektor</span>(...)
<span class="cm"># Python akan coba other.__radd__(self)</span>`,
      params: 'NotImplemented'
    },
    {
      name: 'Ellipsis (...)', tag: 'constant',
      short: 'Literal elipsis — placeholder atau slice multi-dimensi.',
      desc: 'Bisa digunakan sebagai placeholder (seperti pass), di type hints, atau untuk slice multi-dimensi di NumPy. ... dan Ellipsis adalah objek yang sama.',
      uses: ['Type hints','NumPy slicing','Stub placeholder','Protocol stub'],
      syntax: `<span class="kw">def</span> <span class="fn">stub</span>() -> <span class="cls">int</span>: ...
<span class="kw">from</span> typing <span class="kw">import</span> Callable
f: Callable[..., <span class="cls">int</span>]   <span class="cm"># fungsi dengan argumen apapun</span>
a[..., <span class="nm">0</span>]   <span class="cm"># NumPy: setara a[:, :, 0]</span>
<span class="fn">print</span>(<span class="bl">...</span> <span class="kw">is</span> Ellipsis)   <span class="cm"># True</span>`,
      params: '... (Ellipsis)'
    },
    {
      name: '__debug__', tag: 'constant',
      short: 'True kecuali interpreter dijalankan dengan flag -O.',
      desc: 'Konstanta boolean mode debug. Saat False (optimize mode), statement assert diabaikan oleh kompiler Python. Tidak bisa di-assign.',
      uses: ['Debug conditional','Optimization flag','Assertion control','Profiling'],
      syntax: `<span class="kw">if</span> __debug__:
    <span class="fn">print</span>(<span class="st">"Mode debug aktif"</span>)
    <span class="kw">assert</span> x <span class="op">></span> <span class="nm">0</span>
<span class="cm"># Matikan: python -O script.py</span>`,
      params: '__debug__ (bool)'
    },
    {
      name: '__name__ / __doc__ / __package__', tag: 'constant',
      short: 'Atribut spesial modul/fungsi yang tersedia secara built-in.',
      desc: '__name__ pada modul utama bernilai "__main__", pada modul lain adalah nama modulnya. __doc__ adalah docstring fungsi/class/modul. Ini adalah bagian dari built-in namespace.',
      uses: ['Script vs module check','Dokumentasi dinamis','Introspeksi modul','Conditional main'],
      syntax: `<span class="cm"># Pattern "if __name__ == '__main__'"</span>
<span class="kw">if</span> __name__ <span class="op">==</span> <span class="st">"__main__"</span>:
    main()

<span class="kw">def</span> <span class="fn">greet</span>(nama):
    <span class="st">"""Fungsi untuk menyapa."""</span>
    <span class="kw">return</span> <span class="st">f"Halo <span class="dc">{nama}</span>"</span>
<span class="fn">print</span>(greet.__doc__)   <span class="cm"># 'Fungsi untuk menyapa.'</span>`,
      params: '__name__ / __doc__ / __package__ / __spec__'
    },
    {
      name: 'license / copyright / credits', tag: 'constant',
      short: 'Konstanta interaktif — info lisensi, hak cipta, dan kontributor Python.',
      desc: 'Ditambahkan ke namespace built-in oleh modul <code>site</code> saat Python startup (aktif secara default). Menampilkan informasi ketika dipanggil di REPL. Bukan fungsi biasa — merupakan instance objek khusus yang mengimplementasikan __repr__ dan __call__. <strong>Tidak tersedia</strong> jika Python dijalankan dengan flag <code>-S</code> (tanpa modul site).',
      uses: ['REPL interaktif','Informasi lisensi','Edukasi Python','Cek info legal'],
      syntax: `<span class="cm"># Ketik langsung di Python REPL:</span>
<span class="op">>>></span> license
<span class="cm"># Type license() untuk teks lisensi lengkap</span>
<span class="op">>>></span> copyright
<span class="cm"># Copyright (c) 2001-2026 Python Software Foundation...</span>
<span class="op">>>></span> credits
<span class="cm"># Thanks to CWI, CNRI, BeOpen.com, Zope Corporation...</span>

<span class="cm"># Cek apakah modul site aktif (dan license tersedia):</span>
<span class="kw">import</span> sys
<span class="fn">print</span>(<span class="st">"site"</span> <span class="kw">in</span> sys.modules)   <span class="cm"># True = license tersedia</span>
<span class="cm"># Tidak tersedia: python -S script.py (flag -S = no site)</span>`,
      params: 'license / copyright / credits  (tersedia saat modul site dimuat, default aktif)'
    },
    {
      name: '__builtins__ / modul builtins', tag: 'constant',
      short: 'Namespace semua objek built-in Python yang tersedia global.',
      desc: 'Modul <code>builtins</code> berisi semua fungsi, konstanta, exception, dan tipe built-in Python. Di modul __main__, <code>__builtins__</code> adalah modul builtins itu sendiri. Di modul lain, <code>__builtins__</code> adalah __dict__ dari modul builtins. Bisa dipakai untuk mengakses atau override built-in secara eksplisit, atau untuk memeriksa apakah nama adalah built-in.',
      uses: ['Akses built-in eksplisit','Override built-in','Cek namespace','Sandbox/exec safe'],
      syntax: `<span class="kw">import</span> builtins

<span class="cm"># Akses built-in secara eksplisit:</span>
builtins.<span class="fn">print</span>(<span class="st">"Ini dari builtins.print"</span>)

<span class="cm"># Cek apakah nama adalah built-in:</span>
<span class="fn">hasattr</span>(builtins, <span class="st">"len"</span>)     <span class="cm"># True</span>
<span class="fn">hasattr</span>(builtins, <span class="st">"numpy"</span>)  <span class="cm"># False</span>

<span class="cm"># Override print sementara (contoh interceptor):</span>
_orig_print = builtins.print
<span class="kw">def</span> <span class="fn">my_print</span>(*args, **kw):
    _orig_print(<span class="st">"[LOG]"</span>, *args, **kw)
builtins.print = my_print
<span class="fn">print</span>(<span class="st">"halo"</span>)   <span class="cm"># [LOG] halo</span>
builtins.print = _orig_print   <span class="cm"># restore</span>`,
      params: 'import builtins / __builtins__'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 12. EXCEPTION HIERARCHY — LENGKAP
// ═══════════════════════════════════════════════════════════
{
  id: 'exceptions-base', title: 'Exception — Base Classes', icon: '🏗️', color: COLORS.exception, type: 'exception',
  desc: 'BaseException, Exception, SystemExit, KeyboardInterrupt, GeneratorExit, BaseExceptionGroup, ExceptionGroup — fondasi hierarki exception Python',
  commands: [
    {
      name: 'BaseException', tag: 'exception',
      short: 'Root dari semua exception Python.',
      desc: 'Kelas dasar dari SEMUA exception. Jarang ditangkap langsung karena mencakup SystemExit, KeyboardInterrupt, GeneratorExit — exception yang biasanya tidak seharusnya ditangkap oleh aplikasi.',
      uses: ['Base exception custom','Framework error handling','Cegah semua exit','Monitoring'],
      syntax: `<span class="cm"># Hierarki lengkap:</span>
<span class="cm"># BaseException</span>
<span class="cm">#   ├── SystemExit</span>
<span class="cm">#   ├── KeyboardInterrupt</span>
<span class="cm">#   ├── GeneratorExit</span>
<span class="cm">#   └── Exception  ← tangkap ini untuk app error</span>
<span class="cm">#         ├── ValueError, TypeError, ...</span>
<span class="cm">#         └── Warning → DeprecationWarning, ...</span>
<span class="kw">except</span> <span class="ex">BaseException</span> <span class="kw">as</span> e:
    logging.critical(<span class="st">f"Fatal: <span class="dc">{e}</span>"</span>)
    <span class="kw">raise</span>   <span class="cm"># re-raise!</span>`,
      params: 'BaseException(*args)'
    },
    {
      name: 'Exception', tag: 'exception',
      short: 'Base class untuk semua exception aplikasi.',
      desc: 'Semua exception yang harus ditangkap aplikasi (tidak termasuk SystemExit, KeyboardInterrupt, GeneratorExit). Gunakan sebagai base untuk exception custom.',
      uses: ['Exception custom','Catch-all handler','Library error','Application errors'],
      syntax: `<span class="kw">class</span> <span class="cls">DatabaseError</span>(<span class="ex">Exception</span>):
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, pesan, kode=<span class="bl">None</span>):
        <span class="fn">super</span>().__init__(pesan)
        <span class="bl">self</span>.kode = kode
<span class="kw">try</span>:
    risky()
<span class="kw">except</span> <span class="ex">Exception</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"<span class="dc">{type(e).__name__}</span>: <span class="dc">{e}</span>"</span>)`,
      params: 'Exception(*args)'
    },
    {
      name: 'ExceptionGroup / BaseExceptionGroup (Python 3.11+)', tag: 'exception', ver: '3.11',
      short: 'Menggabungkan beberapa exception sekaligus.',
      desc: 'Python 3.11+. BaseExceptionGroup bisa memuat exception apapun. ExceptionGroup hanya memuat subclass Exception. Ditangkap dengan except*. Berguna untuk async task groups.',
      uses: ['Async task errors','Concurrent exceptions','Error aggregation','asyncio TaskGroup'],
      syntax: `<span class="cm"># Python 3.11+</span>
<span class="kw">try</span>:
    <span class="kw">raise</span> <span class="ex">ExceptionGroup</span>(<span class="st">"beberapa error"</span>, [
        <span class="ex">ValueError</span>(<span class="st">"nilai buruk"</span>),
        <span class="ex">TypeError</span>(<span class="st">"tipe salah"</span>),
    ])
<span class="kw">except</span>* <span class="ex">ValueError</span> <span class="kw">as</span> eg:
    <span class="fn">print</span>(<span class="st">"ValueError:"</span>, eg.exceptions)
<span class="kw">except</span>* <span class="ex">TypeError</span> <span class="kw">as</span> eg:
    <span class="fn">print</span>(<span class="st">"TypeError:"</span>, eg.exceptions)`,
      params: 'ExceptionGroup(message, exceptions)'
    },
    {
      name: 'GeneratorExit', tag: 'exception',
      short: 'Meminta generator untuk berhenti.',
      desc: 'Dilempar ke generator/coroutine ketika generator.close() dipanggil atau garbage collector menutup generator. Subclass BaseException (bukan Exception!) sehingga tidak tertangkap except Exception.',
      uses: ['Generator cleanup','Resource release','Context manager','Async generator'],
      syntax: `<span class="kw">def</span> <span class="fn">gen_dengan_cleanup</span>():
    <span class="kw">try</span>:
        <span class="kw">while</span> <span class="bl">True</span>:
            <span class="kw">yield</span>
    <span class="kw">except</span> <span class="ex">GeneratorExit</span>:
        <span class="fn">print</span>(<span class="st">"Generator ditutup, cleanup..."</span>)
        <span class="cm"># Jangan raise lagi, biarkan propagasi</span>
g = <span class="fn">gen_dengan_cleanup</span>()
<span class="fn">next</span>(g)
g.close()   <span class="cm"># trigger GeneratorExit</span>`,
      params: 'GeneratorExit'
    },
    {
      name: 'SystemExit', tag: 'exception',
      short: 'Sinyal penghentian interpreter — dilempar oleh sys.exit().',
      desc: 'Subclass <strong>BaseException</strong> (bukan Exception!), sehingga <strong>tidak</strong> tertangkap oleh <code>except Exception</code>. Atribut <code>.code</code> berisi kode exit (0=sukses, non-zero=error, None→0). Selalu re-raise setelah cleanup agar interpreter benar-benar berhenti.',
      uses: ['Graceful shutdown','Exit code custom','Cleanup before exit','Script CLI'],
      syntax: `<span class="kw">import</span> sys

<span class="kw">try</span>:
    sys.<span class="fn">exit</span>(<span class="nm">1</span>)
<span class="kw">except</span> <span class="ex">SystemExit</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"Cleanup, exit code: <span class="dc">{e.code}</span>"</span>)
    <span class="kw">raise</span>   <span class="cm"># ⚠ selalu re-raise!</span>

<span class="cm"># SystemExit bukan subclass Exception:</span>
<span class="fn">issubclass</span>(<span class="ex">SystemExit</span>, <span class="ex">BaseException</span>)  <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="ex">SystemExit</span>, <span class="ex">Exception</span>)      <span class="cm"># False !</span>

<span class="cm"># Kode exit konvensi: 0=sukses, 1=error umum, 2=arg CLI salah</span>
sys.<span class="fn">exit</span>(<span class="nm">0</span>)   <span class="cm"># identik dengan: raise SystemExit(0)</span>`,
      params: 'SystemExit(code=None)  →  e.code berisi kode exit'
    },
    {
      name: 'KeyboardInterrupt', tag: 'exception',
      short: 'Dilempar saat user menekan Ctrl+C.',
      desc: 'Subclass <strong>BaseException</strong> (bukan Exception!). Tidak tertangkap <code>except Exception</code>. Dikirim saat proses menerima sinyal SIGINT. Tangkap untuk graceful shutdown — simpan state, tutup file/koneksi, lalu biarkan propagasi.',
      uses: ['Graceful Ctrl+C','Long-running CLI','Interrupt handler','Signal SIGINT'],
      syntax: `<span class="kw">import</span> time

<span class="kw">try</span>:
    <span class="fn">print</span>(<span class="st">"Jalankan... tekan Ctrl+C untuk berhenti"</span>)
    <span class="kw">while</span> <span class="bl">True</span>:
        time.sleep(<span class="nm">1</span>)
        <span class="fn">print</span>(<span class="st">"."</span>, end=<span class="st">""</span>, flush=<span class="bl">True</span>)
<span class="kw">except</span> <span class="ex">KeyboardInterrupt</span>:
    <span class="fn">print</span>(<span class="st">"\nDihentikan user. Cleanup..."</span>)
    <span class="cm"># simpan state, tutup resource di sini</span>

<span class="cm"># KeyboardInterrupt bukan Exception!</span>
<span class="fn">issubclass</span>(<span class="ex">KeyboardInterrupt</span>, <span class="ex">Exception</span>)  <span class="cm"># False</span>`,
      params: 'KeyboardInterrupt'
    },
  ]
},
{
  id: 'exceptions-common', title: 'Exception — Umum & Lookup', icon: '⚠️', color: COLORS.exception, type: 'exception',
  desc: 'ValueError, TypeError, IndexError, KeyError, AttributeError, NameError, LookupError, OSError dan turunannya',
  commands: [
    {
      name: 'ValueError / TypeError', tag: 'exception',
      short: 'Error nilai tidak valid dan tipe tidak sesuai.',
      desc: 'ValueError: operasi dengan tipe benar tapi nilai tidak valid (int("abc")). TypeError: operasi pada tipe yang tidak sesuai (1 + "a").',
      uses: ['Validasi input','Type checking','Parsing data','API contract'],
      syntax: `<span class="fn">int</span>(<span class="st">"abc"</span>)        <span class="cm"># ValueError</span>
[].remove(<span class="nm">99</span>)    <span class="cm"># ValueError: not in list</span>
<span class="nm">1</span> <span class="op">+</span> <span class="st">"dua"</span>         <span class="cm"># TypeError</span>
<span class="fn">len</span>(<span class="nm">42</span>)           <span class="cm"># TypeError: no len()</span>
<span class="kw">def</span> <span class="fn">proses</span>(n):
    <span class="kw">if</span> <span class="kw">not</span> <span class="fn">isinstance</span>(n, <span class="cls">int</span>):
        <span class="kw">raise</span> <span class="ex">TypeError</span>(<span class="st">f"Expected int, got {type(n)}"</span>)`,
      params: 'ValueError(message) / TypeError(message)'
    },
    {
      name: 'LookupError / IndexError / KeyError', tag: 'exception',
      short: 'Error saat akses indeks atau key yang tidak ada.',
      desc: 'LookupError adalah base untuk IndexError dan KeyError. IndexError: indeks di luar range. KeyError: key tidak ada di dict. Gunakan .get() atau try-except untuk akses aman.',
      uses: ['Akses list aman','Akses dict aman','Lookup error handling','Validasi range'],
      syntax: `lst = [<span class="nm">1</span>, <span class="nm">2</span>, <span class="nm">3</span>]
lst[<span class="nm">5</span>]    <span class="cm"># IndexError</span>
d = {<span class="st">"a"</span>: <span class="nm">1</span>}
d[<span class="st">"z"</span>]    <span class="cm"># KeyError: 'z'</span>
<span class="cm"># Akses aman</span>
val = d.get(<span class="st">"z"</span>, <span class="nm">0</span>)      <span class="cm"># 0 (tidak raise)</span>
<span class="fn">issubclass</span>(<span class="ex">IndexError</span>, <span class="ex">LookupError</span>)  <span class="cm"># True</span>`,
      params: 'IndexError / KeyError'
    },
    {
      name: 'AttributeError / NameError / UnboundLocalError', tag: 'exception',
      short: 'Error saat akses atribut atau nama yang tidak ada.',
      desc: 'AttributeError: objek tidak memiliki atribut yang diminta. NameError: nama variabel tidak ditemukan di namespace. UnboundLocalError (subclass NameError): variabel lokal dipakai sebelum diassign.',
      uses: ['Duck typing','Atribut opsional','Debug scope issue','API check'],
      syntax: `<span class="nm">42</span>.upper()         <span class="cm"># AttributeError</span>
<span class="fn">print</span>(belum_ada)    <span class="cm"># NameError</span>
<span class="kw">def</span> <span class="fn">f</span>():
    <span class="fn">print</span>(x)    <span class="cm"># UnboundLocalError jika x di-assign setelah ini</span>
    x = <span class="nm">1</span>
<span class="kw">if</span> <span class="fn">hasattr</span>(obj, <span class="st">"method"</span>):
    obj.method()`,
      params: 'AttributeError / NameError / UnboundLocalError'
    },
    {
      name: 'OSError & subclasses', tag: 'exception',
      short: 'Error sistem operasi — file, permission, network.',
      desc: 'OSError (alias: IOError, EnvironmentError) adalah base untuk semua error OS. Subclass: FileNotFoundError, PermissionError, IsADirectoryError, NotADirectoryError, FileExistsError, InterruptedError, BlockingIOError, BrokenPipeError, TimeoutError, ConnectionError (dan turunannya).',
      uses: ['File I/O aman','Path validation','Network error','OS integration'],
      syntax: `<span class="kw">try</span>:
    <span class="kw">with</span> <span class="fn">open</span>(<span class="st">"data.txt"</span>) <span class="kw">as</span> f:
        data = f.read()
<span class="kw">except</span> <span class="ex">FileNotFoundError</span>:
    <span class="fn">print</span>(<span class="st">"File tidak ditemukan"</span>)
<span class="kw">except</span> <span class="ex">PermissionError</span>:
    <span class="fn">print</span>(<span class="st">"Tidak punya izin"</span>)
<span class="kw">except</span> <span class="ex">OSError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"OS error: <span class="dc">{e.errno}</span> <span class="dc">{e.strerror}</span>"</span>)`,
      params: 'OSError(errno, strerror) / FileNotFoundError / PermissionError / ...'
    },
    {
      name: 'ConnectionError & subclasses', tag: 'exception',
      short: 'Error koneksi jaringan.',
      desc: 'ConnectionError (subclass OSError) adalah base untuk ConnectionAbortedError, ConnectionRefusedError, ConnectionResetError. Digunakan untuk socket dan network operations.',
      uses: ['Network programming','REST API','Socket handling','Retry logic'],
      syntax: `<span class="kw">import</span> socket
<span class="kw">try</span>:
    s = socket.socket()
    s.connect((<span class="st">"localhost"</span>, <span class="nm">9999</span>))
<span class="kw">except</span> <span class="ex">ConnectionRefusedError</span>:
    <span class="fn">print</span>(<span class="st">"Koneksi ditolak"</span>)
<span class="kw">except</span> <span class="ex">ConnectionResetError</span>:
    <span class="fn">print</span>(<span class="st">"Koneksi direset"</span>)`,
      params: 'ConnectionError / ConnectionRefusedError / ConnectionAbortedError / ConnectionResetError'
    },
    {
      name: 'FileNotFoundError / PermissionError / InterruptedError', tag: 'exception',
      short: 'File tidak ditemukan, akses ditolak, dan operasi diinterupsi sinyal OS.',
      desc: 'Semua subclass <code>OSError</code>. <strong>FileNotFoundError</strong> (errno ENOENT): file/direktori tidak ditemukan — exception paling sering dalam file I/O. <strong>PermissionError</strong> (errno EACCES/EPERM): tidak memiliki izin baca/tulis/eksekusi. <strong>InterruptedError</strong> (errno EINTR): system call diinterupsi sinyal OS — sejak Python 3.5 (PEP 475) kebanyakan system call otomatis di-retry, sehingga InterruptedError jarang muncul di kode modern.',
      uses: ['File I/O aman','Permission check','Deploy validation','Signal handling'],
      syntax: `<span class="kw">import</span> os

<span class="cm"># FileNotFoundError — paling sering dalam file I/O</span>
<span class="kw">try</span>:
    <span class="kw">with</span> <span class="fn">open</span>(<span class="st">"config.json"</span>) <span class="kw">as</span> f:
        data = f.read()
<span class="kw">except</span> <span class="ex">FileNotFoundError</span>:
    <span class="fn">print</span>(<span class="st">"Konfigurasi tidak ada, buat default..."</span>)
    data = <span class="st">"{}"</span>

<span class="cm"># PermissionError — cek izin akses file/direktori</span>
<span class="kw">try</span>:
    <span class="kw">with</span> <span class="fn">open</span>(<span class="st">"/etc/shadow"</span>, <span class="st">"r"</span>) <span class="kw">as</span> f:
        secrets = f.read()
<span class="kw">except</span> <span class="ex">PermissionError</span>:
    <span class="fn">print</span>(<span class="st">"Akses ditolak! Butuh root privilege."</span>)

<span class="cm"># Proaktif: cek izin sebelum operasi (LBYL)</span>
<span class="kw">if</span> <span class="kw">not</span> os.access(<span class="st">"data.txt"</span>, os.R_OK):
    <span class="kw">raise</span> <span class="ex">PermissionError</span>(<span class="st">"Tidak bisa membaca file"</span>)
<span class="kw">if</span> <span class="kw">not</span> os.access(<span class="st">"/var/log"</span>, os.W_OK):
    <span class="kw">raise</span> <span class="ex">PermissionError</span>(<span class="st">"Tidak bisa menulis log"</span>)

<span class="cm"># Semua subclass OSError:</span>
<span class="fn">issubclass</span>(<span class="ex">FileNotFoundError</span>, <span class="ex">OSError</span>)  <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="ex">PermissionError</span>, <span class="ex">OSError</span>)    <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="ex">InterruptedError</span>, <span class="ex">OSError</span>)   <span class="cm"># True</span>`,
      params: 'FileNotFoundError / PermissionError / InterruptedError  (subclass OSError)'
    },
    {
      name: 'ArithmeticError / ZeroDivisionError / OverflowError / FloatingPointError', tag: 'exception',
      short: 'Error aritmatika — pembagian nol, overflow, floating point.',
      desc: 'ArithmeticError adalah parent. ZeroDivisionError: bagi dengan nol. OverflowError: hasil melampaui float max (tidak berlaku int — infinite precision). FloatingPointError: jarang terjadi, hanya jika FENV dirubah.',
      uses: ['Kalkulasi aman','Validasi pembagi','Numeric computing','Floating point'],
      syntax: `<span class="nm">10</span> <span class="op">/</span> <span class="nm">0</span>         <span class="cm"># ZeroDivisionError</span>
<span class="nm">10</span> <span class="op">//</span> <span class="nm">0</span>        <span class="cm"># ZeroDivisionError</span>
<span class="kw">import</span> math
math.exp(<span class="nm">1000</span>)  <span class="cm"># OverflowError</span>
<span class="kw">def</span> <span class="fn">bagi_aman</span>(a, b):
    <span class="kw">if</span> b <span class="op">==</span> <span class="nm">0</span>: <span class="kw">return</span> <span class="bl">None</span>
    <span class="kw">return</span> a / b`,
      params: 'ZeroDivisionError / OverflowError / FloatingPointError'
    },
    {
      name: 'StopIteration / StopAsyncIteration', tag: 'exception',
      short: 'Sinyal bahwa iterator telah habis.',
      desc: 'Dilempar oleh __next__() saat tidak ada elemen lagi. ⚠️ PEP 479 (Python 3.7+): jika StopIteration dilempar DARI DALAM generator body, Python otomatis mengubahnya menjadi RuntimeError. Gunakan return untuk menghentikan generator.',
      uses: ['Custom iterator','Generator control','Protocol iterator','Lazy sequence'],
      syntax: `<span class="cm"># ⚠ PEP 479: jangan raise StopIteration dari dalam generator!</span>
<span class="kw">def</span> <span class="fn">gen_salah</span>():
    <span class="kw">yield</span> <span class="nm">1</span>
    <span class="kw">raise</span> <span class="ex">StopIteration</span>   <span class="cm"># → RuntimeError di Python 3.7+!</span>
<span class="cm"># Cara benar:</span>
<span class="kw">def</span> <span class="fn">gen_benar</span>():
    <span class="kw">yield</span> <span class="nm">1</span>
    <span class="kw">return</span>               <span class="cm"># cukup return</span>`,
      params: 'StopIteration / StopAsyncIteration'
    },
    {
      name: 'RuntimeError / RecursionError / NotImplementedError', tag: 'exception',
      short: 'Error runtime umum, rekursi berlebihan, dan method belum diimplementasi.',
      desc: 'RuntimeError: error umum. RecursionError (subclass RuntimeError): kedalaman rekursi melampaui batas (~1000). NotImplementedError: method abstract belum diimplementasikan.',
      uses: ['Abstract method','Base class API','Rekursi dalam','Runtime guards'],
      syntax: `<span class="kw">def</span> <span class="fn">rekursi</span>(n):
    <span class="kw">return</span> <span class="fn">rekursi</span>(n <span class="op">+</span> <span class="nm">1</span>)  <span class="cm"># RecursionError!</span>
<span class="kw">class</span> <span class="cls">HewanAbstrak</span>:
    <span class="kw">def</span> <span class="fn">suara</span>(<span class="bl">self</span>):
        <span class="kw">raise</span> <span class="ex">NotImplementedError</span>(<span class="st">"Subclass harus implement suara()"</span>)`,
      params: 'RuntimeError / RecursionError / NotImplementedError'
    },
    {
      name: 'SyntaxError / IndentationError / TabError', tag: 'exception',
      short: 'Error sintaks Python — kode tidak valid secara sintaksis.',
      desc: 'SyntaxError: kode tidak valid secara sintaks. IndentationError (subclass SyntaxError): indentasi salah. TabError (subclass IndentationError): campuran tab dan spasi.',
      uses: ['Parser/compiler','Code validation','Linting','Dynamic code eval'],
      syntax: `<span class="kw">try</span>:
    <span class="fn">compile</span>(<span class="st">"if True"</span>, <span class="st">"&lt;s&gt;"</span>, <span class="st">"exec"</span>)
<span class="kw">except</span> <span class="ex">SyntaxError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(e.lineno, e.msg)
<span class="cm"># IndentationError: unexpected indent</span>
<span class="cm"># TabError: inconsistent use of tabs/spaces</span>`,
      params: 'SyntaxError / IndentationError / TabError'
    },
    {
      name: 'ImportError / ModuleNotFoundError', tag: 'exception', ver: '3.6',
      short: 'Error saat import modul gagal.',
      desc: 'ImportError: import gagal (nama salah, modul error). ModuleNotFoundError (subclass, Python 3.6+): modul tidak ditemukan sama sekali.',
      uses: ['Optional dependency','Conditional import','Plugin system','Compatibility'],
      syntax: `<span class="kw">try</span>:
    <span class="kw">import</span> numpy <span class="kw">as</span> np
    HAS_NUMPY = <span class="bl">True</span>
<span class="kw">except</span> <span class="ex">ImportError</span>:
    HAS_NUMPY = <span class="bl">False</span>
<span class="kw">except</span> <span class="ex">ModuleNotFoundError</span>:
    <span class="fn">print</span>(<span class="st">"numpy belum diinstall"</span>)`,
      params: 'ImportError / ModuleNotFoundError'
    },
    {
      name: 'BlockingIOError / BrokenPipeError / FileExistsError / IsADirectoryError / NotADirectoryError', tag: 'exception',
      short: 'OSError spesifik untuk operasi file dan I/O non-blocking.',
      desc: 'BlockingIOError: operasi I/O akan memblok (non-blocking mode). BrokenPipeError: pipe putus. FileExistsError: file sudah ada saat mencoba membuat. IsADirectoryError: operasi file pada direktori. NotADirectoryError: operasi direktori pada file.',
      uses: ['Non-blocking I/O','Pipe handling','File creation safe','Directory ops'],
      syntax: `<span class="kw">import</span> os, errno
<span class="kw">try</span>:
    os.makedirs(<span class="st">"/tmp/test"</span>, exist_ok=<span class="bl">False</span>)
<span class="kw">except</span> <span class="ex">FileExistsError</span>:
    <span class="fn">print</span>(<span class="st">"Direktori sudah ada"</span>)
<span class="kw">except</span> <span class="ex">NotADirectoryError</span>:
    <span class="fn">print</span>(<span class="st">"Bukan direktori"</span>)`,
      params: 'BlockingIOError / BrokenPipeError / FileExistsError / IsADirectoryError / NotADirectoryError'
    },
    {
      name: 'Exception.add_note() — Python 3.11+', tag: 'exception', ver: '3.11',
      short: 'Menambahkan catatan konteks ke exception yang sudah ada.',
      desc: 'Python 3.11+ memperkenalkan method add_note() pada semua exception. Catatan disimpan dalam __notes__ (list of str) dan ditampilkan di traceback setelah pesan error asli. Sangat berguna untuk menambahkan konteks debugging tanpa membuat exception baru.',
      uses: ['Debug context','Rich error messages','Library error detail','Contextual info'],
      syntax: `<span class="cm"># Python 3.11+</span>
<span class="kw">try</span>:
    <span class="fn">int</span>(<span class="st">"abc"</span>)
<span class="kw">except</span> <span class="ex">ValueError</span> <span class="kw">as</span> e:
    e.add_note(<span class="st">"Input berasal dari form 'nama_field'"</span>)
    e.add_note(<span class="st">f"Nilai yang gagal: 'abc'"</span>)
    <span class="kw">raise</span>
<span class="cm"># Traceback akan menampilkan catatan tambahan</span>

<span class="cm"># Akses langsung:</span>
<span class="kw">try</span>:
    <span class="kw">raise</span> <span class="ex">ValueError</span>(<span class="st">"nilai salah"</span>)
<span class="kw">except</span> <span class="ex">ValueError</span> <span class="kw">as</span> e:
    e.add_note(<span class="st">"Catatan 1"</span>)
    e.add_note(<span class="st">"Catatan 2"</span>)
    <span class="fn">print</span>(e.__notes__)   <span class="cm"># ['Catatan 1', 'Catatan 2']</span>`,
      params: 'exception.add_note(note: str) → None  (Python 3.11+)'
    },
    {
      name: 'EnvironmentError / IOError / WindowsError', tag: 'exception',
      short: 'Alias historis dari OSError — tetap valid untuk backward compatibility.',
      desc: 'Sejak Python 3.3, EnvironmentError, IOError, dan OSError adalah alias yang sama persis. WindowsError hanya tersedia di Windows. Kode lama mungkin masih menggunakan nama-nama ini, tapi untuk kode baru gunakan OSError secara konsisten.',
      uses: ['Legacy code compatibility','Cross-platform code','Migration dari Python 2','Backward compat'],
      syntax: `<span class="cm"># Ketiga ini IDENTIK di Python 3.3+:</span>
<span class="fn">issubclass</span>(<span class="ex">IOError</span>, <span class="ex">OSError</span>)            <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="ex">EnvironmentError</span>, <span class="ex">OSError</span>)    <span class="cm"># True</span>
<span class="ex">IOError</span> <span class="kw">is</span> <span class="ex">OSError</span>                        <span class="cm"># True</span>
<span class="ex">EnvironmentError</span> <span class="kw">is</span> <span class="ex">OSError</span>              <span class="cm"># True</span>

<span class="cm"># Rekomendasi kode baru: selalu gunakan OSError</span>
<span class="kw">try</span>:
    <span class="fn">open</span>(<span class="st">"tidak_ada.txt"</span>)
<span class="kw">except</span> <span class="ex">OSError</span> <span class="kw">as</span> e:   <span class="cm"># ✓ gunakan ini</span>
    <span class="fn">print</span>(e)`,
      params: 'EnvironmentError / IOError (alias OSError sejak Python 3.3)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 12b. EXCEPTION — LAINNYA (LENGKAP)
// ═══════════════════════════════════════════════════════════
{
  id: 'exceptions-misc', title: 'Exception — Lainnya', icon: '🔥', color: COLORS.exception, type: 'exception',
  desc: 'AssertionError, EOFError, MemoryError, BufferError, SystemError, ReferenceError, UnicodeError, ChildProcessError, TimeoutError — exception penting yang sering terlewat',
  commands: [
    {
      name: 'AssertionError', tag: 'exception',
      short: 'Dilempar oleh statement assert ketika kondisi False.',
      desc: 'Dilempar saat <code>assert kondisi</code> bernilai False. Bisa dimatikan total dengan flag <code>-O</code> (optimize mode). Gunakan untuk debugging, pre/post-conditions, dan testing — <strong>jangan</strong> untuk validasi input user karena bisa dimatikan.',
      uses: ['Unit testing','Debug assertions','Pre/post conditions','Contract programming'],
      syntax: `<span class="kw">assert</span> <span class="nm">2</span> <span class="op">+</span> <span class="nm">2</span> <span class="op">==</span> <span class="nm">4</span>                    <span class="cm"># OK</span>
<span class="kw">assert</span> x <span class="op">></span> <span class="nm">0</span>, <span class="st">"x harus positif"</span>      <span class="cm"># dengan pesan</span>

<span class="kw">try</span>:
    <span class="kw">assert</span> <span class="fn">len</span>(data) <span class="op">></span> <span class="nm">0</span>, <span class="st">"Data kosong!"</span>
<span class="kw">except</span> <span class="ex">AssertionError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"Assertion gagal: <span class="dc">{e}</span>"</span>)

<span class="cm"># ⚠ Jangan gunakan assert untuk validasi input user:</span>
<span class="cm"># assert umur > 0          ← SALAH, bisa -O matikan!</span>
<span class="cm"># if umur <= 0: raise ValueError  ← BENAR</span>
<span class="cm"># Matikan semua assert: python -O script.py</span>`,
      params: 'AssertionError([message])'
    },
    {
      name: 'EOFError', tag: 'exception',
      short: 'Dilempar saat input() mencapai end-of-file tanpa data.',
      desc: 'Terjadi saat <code>input()</code> mencapai akhir file (EOF) tanpa membaca karakter apapun. Sering muncul saat stdin di-pipe dari file, berjalan di mode non-interaktif, atau di environment seperti subprocess dan IDE tertentu.',
      uses: ['CLI pipeline','Non-interaktif input','stdin pipe','EOF detection'],
      syntax: `<span class="cm"># Terjadi saat: echo "" | python script.py</span>
<span class="kw">def</span> <span class="fn">baca_aman</span>():
    <span class="kw">try</span>:
        <span class="kw">return</span> <span class="fn">input</span>(<span class="st">"Input: "</span>)
    <span class="kw">except</span> <span class="ex">EOFError</span>:
        <span class="fn">print</span>(<span class="st">"EOF — tidak ada input."</span>)
        <span class="kw">return</span> <span class="bl">None</span>

<span class="cm"># Baca semua baris stdin sampai EOF:</span>
<span class="kw">import</span> sys
baris = []
<span class="kw">try</span>:
    <span class="kw">while</span> <span class="bl">True</span>:
        baris.append(<span class="fn">input</span>())
<span class="kw">except</span> <span class="ex">EOFError</span>:
    <span class="fn">print</span>(<span class="st">f"Selesai: <span class="dc">{len(baris)}</span> baris"</span>)

<span class="cm"># Alternatif lebih bersih:</span>
<span class="kw">for</span> baris <span class="kw">in</span> sys.stdin:
    <span class="fn">print</span>(baris.strip())`,
      params: 'EOFError'
    },
    {
      name: 'MemoryError', tag: 'exception',
      short: 'Dilempar saat Python kehabisan memori untuk alokasi.',
      desc: 'Terjadi saat alokasi memori gagal. ⚠ Sangat sulit di-handle dengan benar — handler sendiri mungkin butuh memori. Dalam praktiknya OS biasanya mematikan proses sebelum ini. Pencegahan jauh lebih efektif: gunakan generator, streaming, atau batasi ukuran data.',
      uses: ['Large data processing','Memory guard','OOM handling','Memory profiling'],
      syntax: `<span class="kw">import</span> sys

<span class="cm"># Cek ukuran sebelum alokasi besar:</span>
estimasi = sys.getsizeof(<span class="nm">0</span>) <span class="op">*</span> (<span class="nm">10</span><span class="op">**</span><span class="nm">8</span>)
<span class="fn">print</span>(<span class="st">f"Butuh ~{estimasi/1e6:.0f} MB"</span>)

<span class="kw">try</span>:
    data = [<span class="nm">0</span>] <span class="op">*</span> (<span class="nm">10</span><span class="op">**</span><span class="nm">12</span>)    <span class="cm"># MemoryError!</span>
<span class="kw">except</span> <span class="ex">MemoryError</span>:
    <span class="fn">print</span>(<span class="st">"Kurangi ukuran data!"</span>)

<span class="cm"># Pencegahan terbaik: gunakan generator (lazy)</span>
data = (<span class="nm">0</span> <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="nm">10</span><span class="op">**</span><span class="nm">9</span>))   <span class="cm"># O(1) memori!</span>
<span class="cm"># Atau numpy untuk data numerik besar</span>`,
      params: 'MemoryError'
    },
    {
      name: 'BufferError', tag: 'exception',
      short: 'Dilempar saat operasi buffer protocol tidak bisa dilakukan.',
      desc: 'Dilempar saat operasi buffer gagal — misalnya mencoba memodifikasi atau meresize objek yang buffer-nya sedang aktif di-view oleh <code>memoryview</code>. Jarang ditemui kecuali bekerja langsung dengan binary data tingkat rendah.',
      uses: ['memoryview operations','Binary data','Buffer protocol','C extension interop'],
      syntax: `ba = <span class="fn">bytearray</span>(<span class="st">b"Hello"</span>)
mv = <span class="fn">memoryview</span>(ba)   <span class="cm"># membuat view aktif</span>

<span class="kw">try</span>:
    ba.clear()   <span class="cm"># BufferError: memoryview masih aktif!</span>
<span class="kw">except</span> <span class="ex">BufferError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"Buffer error: <span class="dc">{e}</span>"</span>)

<span class="cm"># Solusi: release view dulu</span>
mv.release()
ba.clear()   <span class="cm"># OK sekarang</span>

<span class="cm"># Atau gunakan context manager (auto-release):</span>
<span class="kw">with</span> <span class="fn">memoryview</span>(<span class="fn">bytearray</span>(<span class="nm">10</span>)) <span class="kw">as</span> mv:
    mv[<span class="nm">0</span>] = <span class="nm">42</span>   <span class="cm"># aman di dalam with</span>`,
      params: 'BufferError'
    },
    {
      name: 'SystemError', tag: 'exception',
      short: 'Error internal interpreter Python — bukan kesalahan kode user.',
      desc: 'Dilempar saat interpreter Python mendeteksi kondisi internal yang tidak valid — biasanya bug di interpreter itu sendiri atau di C extension yang buggy. Sangat jarang muncul di kode Python murni. Jika ini terjadi: catat Python version, C extension yang dipakai, dan laporkan sebagai bug.',
      uses: ['C extension debugging','Interpreter bug','Bug report','Internal error guard'],
      syntax: `<span class="cm"># Contoh kondisi yang bisa memicu SystemError:</span>
<span class="cm"># - C extension membuat state interpreter tidak valid</span>
<span class="cm"># - Interpretasi bytecode yang korup</span>

<span class="kw">import</span> sys
<span class="kw">try</span>:
    <span class="cm"># Kode yang sangat jarang: tergantung C extension buggy</span>
    <span class="kw">pass</span>
<span class="kw">except</span> <span class="ex">SystemError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"Internal Python error: <span class="dc">{e}</span>"</span>)
    <span class="fn">print</span>(<span class="st">f"Python: <span class="dc">{sys.version}</span>"</span>)
    <span class="cm"># Laporkan ke https://bugs.python.org !</span>

<span class="cm"># SystemError adalah subclass Exception (berbeda dari SystemExit!)</span>
<span class="fn">issubclass</span>(<span class="ex">SystemError</span>, <span class="ex">Exception</span>)  <span class="cm"># True</span>`,
      params: 'SystemError'
    },
    {
      name: 'ReferenceError', tag: 'exception',
      short: 'Dilempar saat weak reference diakses setelah objek dihapus.',
      desc: 'Terjadi saat mencoba mengakses <strong>weak reference</strong> yang sudah "mati" — objeknya sudah di-garbage-collect. Berkaitan dengan modul <code>weakref</code>. Gunakan pola "check-then-use" untuk menghindari ini.',
      uses: ['Weak references','Cache implementation','Observer pattern','Garbage collection'],
      syntax: `<span class="kw">import</span> weakref

<span class="kw">class</span> <span class="cls">Objek</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, v): <span class="bl">self</span>.v = v

obj = <span class="cls">Objek</span>(<span class="nm">42</span>)
ref = weakref.ref(obj)    <span class="cm"># weak reference — tidak cegah GC</span>
<span class="fn">print</span>(ref().v)            <span class="cm"># 42 (objek masih hidup)</span>

<span class="kw">del</span> obj   <span class="cm"># hapus strong reference → GC bisa hapus objek</span>

<span class="cm"># Cara SALAH:</span>
<span class="cm"># ref().v → bisa ReferenceError!</span>

<span class="cm"># Cara BENAR (check-then-use):</span>
live = ref()
<span class="kw">if</span> live <span class="kw">is</span> <span class="kw">not</span> <span class="bl">None</span>:
    <span class="fn">print</span>(live.v)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="st">"Objek sudah dihapus"</span>)`,
      params: 'ReferenceError'
    },
    {
      name: 'UnicodeError / UnicodeDecodeError / UnicodeEncodeError / UnicodeTranslateError', tag: 'exception',
      short: 'Error encoding/decoding/translasi teks Unicode.',
      desc: '<code>UnicodeError</code> adalah base. <code>UnicodeDecodeError</code>: bytes tidak bisa didecode (encoding tidak cocok). <code>UnicodeEncodeError</code>: string tidak bisa diencoding (karakter tidak ada di encoding target). <code>UnicodeTranslateError</code>: error saat str.translate(). Parameter <code>errors</code>: "strict"(raise), "ignore"(skip), "replace"(→?), "backslashreplace", "xmlcharrefreplace".',
      uses: ['File encoding/decoding','HTTP request response','CSV processing','Database text'],
      syntax: `<span class="cm"># UnicodeDecodeError:</span>
<span class="st">b"caf\xff"</span>.decode(<span class="st">"utf-8"</span>)                   <span class="cm"># Error!</span>
<span class="st">b"caf\xff"</span>.decode(<span class="st">"utf-8"</span>, errors=<span class="st">"replace"</span>) <span class="cm"># 'caf�'</span>
<span class="st">b"caf\xff"</span>.decode(<span class="st">"utf-8"</span>, errors=<span class="st">"ignore"</span>)  <span class="cm"># 'caf'</span>
<span class="st">b"caf\xff"</span>.decode(<span class="st">"latin-1"</span>)                  <span class="cm"># 'cafÿ' ✓</span>

<span class="cm"># UnicodeEncodeError:</span>
<span class="st">"café"</span>.encode(<span class="st">"ascii"</span>)                       <span class="cm"># Error!</span>
<span class="st">"café"</span>.encode(<span class="st">"ascii"</span>, errors=<span class="st">"replace"</span>)    <span class="cm"># b'caf?'</span>
<span class="st">"café"</span>.encode(<span class="st">"ascii"</span>, errors=<span class="st">"xmlcharrefreplace"</span>) <span class="cm"># b'café'</span>
<span class="st">"café"</span>.encode(<span class="st">"utf-8"</span>)                       <span class="cm"># b'caf\xc3\xa9' ✓</span>

<span class="cm"># Detail error:</span>
<span class="kw">try</span>:
    <span class="st">b"\xff"</span>.decode(<span class="st">"utf-8"</span>)
<span class="kw">except</span> <span class="ex">UnicodeDecodeError</span> <span class="kw">as</span> e:
    <span class="fn">print</span>(<span class="st">f"encoding:{e.encoding} pos:{e.start}-{e.end} reason:{e.reason}"</span>)`,
      params: 'UnicodeError / UnicodeDecodeError / UnicodeEncodeError / UnicodeTranslateError'
    },
    {
      name: 'ChildProcessError / ProcessLookupError / TimeoutError', tag: 'exception',
      short: 'Error proses anak, proses tidak ditemukan, dan operasi timeout.',
      desc: 'Semua subclass <code>OSError</code>. <code>ChildProcessError</code>: operasi child process gagal (errno ECHILD). <code>ProcessLookupError</code>: proses dengan PID tidak ditemukan (errno ESRCH). <code>TimeoutError</code>: operasi OS timeout (errno ETIMEDOUT) — juga dilempar asyncio saat coroutine melampaui batas waktu.',
      uses: ['subprocess','multiprocessing','asyncio timeout','OS process management'],
      syntax: `<span class="kw">import</span> subprocess, asyncio

<span class="cm"># TimeoutError di subprocess:</span>
<span class="kw">try</span>:
    result = subprocess.run(
        [<span class="st">"sleep"</span>, <span class="st">"10"</span>], timeout=<span class="nm">2</span>
    )
<span class="kw">except</span> subprocess.TimeoutExpired:
    <span class="fn">print</span>(<span class="st">"Subprocess timeout!"</span>)

<span class="cm"># TimeoutError di asyncio (Python 3.11+):</span>
<span class="kw">async def</span> <span class="fn">dengan_timeout</span>():
    <span class="kw">try</span>:
        <span class="kw">async with</span> asyncio.timeout(<span class="nm">1.0</span>):
            <span class="kw">await</span> asyncio.sleep(<span class="nm">5</span>)
    <span class="kw">except</span> <span class="ex">TimeoutError</span>:
        <span class="fn">print</span>(<span class="st">"Async timeout!"</span>)

<span class="cm"># issubclass semua ke OSError:</span>
<span class="fn">issubclass</span>(<span class="ex">TimeoutError</span>, <span class="ex">OSError</span>)          <span class="cm"># True</span>
<span class="fn">issubclass</span>(<span class="ex">ChildProcessError</span>, <span class="ex">OSError</span>)     <span class="cm"># True</span>`,
      params: 'ChildProcessError / ProcessLookupError / TimeoutError  (subclass OSError)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 13. WARNINGS — LENGKAP
// ═══════════════════════════════════════════════════════════
{
  id: 'warnings', title: 'Warnings & Deprecations', icon: '🚨', color: COLORS.warning, type: 'warning',
  desc: 'Semua kelas warning bawaan Python — DeprecationWarning, UserWarning, RuntimeWarning, SyntaxWarning, ResourceWarning, dan lainnya',
  commands: [
    {
      name: 'Warning (base) & Hierarki Lengkap', tag: 'warning',
      short: 'Peringatan (bukan error) yang bisa diabaikan atau difilter.',
      desc: 'Warning adalah subclass Exception. Hierarki lengkap: Warning → UserWarning, DeprecationWarning, PendingDeprecationWarning, RuntimeWarning, SyntaxWarning, ResourceWarning, FutureWarning, ImportWarning, UnicodeWarning, BytesWarning, EncodingWarning.',
      uses: ['Deprecate API','Peringatan runtime','Lint custom','Library author'],
      syntax: `<span class="kw">import</span> warnings
warnings.warn(<span class="st">"fungsi ini akan dihapus v3"</span>, <span class="ex">DeprecationWarning</span>)
warnings.warn(<span class="st">"Data mungkin tidak valid"</span>, <span class="ex">UserWarning</span>)
<span class="cm"># Filter warning</span>
warnings.filterwarnings(<span class="st">"ignore"</span>, category=<span class="ex">DeprecationWarning</span>)
warnings.filterwarnings(<span class="st">"error"</span>,  category=<span class="ex">RuntimeWarning</span>)
warnings.filterwarnings(<span class="st">"always"</span>) <span class="cm"># tampilkan semua</span>`,
      params: 'warnings.warn(message, category=UserWarning, stacklevel=1)'
    },
    {
      name: 'DeprecationWarning', tag: 'warning',
      short: 'Peringatan bahwa fitur sudah usang dan akan dihapus.',
      desc: 'Digunakan saat API lama masih bisa dipakai tapi akan dihapus di versi mendatang. Default tidak ditampilkan kecuali di __main__ atau test mode. Gunakan stacklevel=2 agar menunjuk ke pemanggil.',
      uses: ['Migrasi API','Versi library','Backward compatibility','Upgrade codebase'],
      syntax: `<span class="kw">def</span> <span class="fn">fungsi_lama</span>():
    <span class="kw">import</span> warnings
    warnings.warn(
        <span class="st">"fungsi_lama() deprecated, pakai fungsi_baru()"</span>,
        <span class="cls">DeprecationWarning</span>, stacklevel=<span class="nm">2</span>
    )`,
      params: 'DeprecationWarning(message)'
    },
    {
      name: 'UserWarning', tag: 'warning',
      short: 'Warning umum untuk kode pengguna.',
      desc: 'Warning default jika tidak ada kategori spesifik. Selalu ditampilkan (tidak disuppress by default). Cocok untuk library yang ingin memberi tahu pengguna tentang penggunaan yang mungkin bermasalah.',
      uses: ['Custom warning','Library feedback','User notification','Best practice hint'],
      syntax: `<span class="kw">import</span> warnings
warnings.warn(<span class="st">"Data CSV kosong, menggunakan default"</span>)
<span class="cm"># Default category adalah UserWarning</span>`,
      params: 'UserWarning(message)'
    },
    {
      name: 'RuntimeWarning', tag: 'warning',
      short: 'Peringatan tentang kondisi runtime yang mencurigakan.',
      desc: 'Digunakan untuk peringatan yang hanya bisa dideteksi saat runtime. NumPy menggunakannya untuk invalid value (sqrt negatif, division by NaN, dll).',
      uses: ['Numeric operations','NumPy','Division edge cases','Runtime validation'],
      syntax: `<span class="kw">import</span> warnings
warnings.warn(<span class="st">"overflow dalam konversi int"</span>, <span class="cls">RuntimeWarning</span>)
<span class="cm"># NumPy contoh:</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
np.sqrt(<span class="op">-</span><span class="nm">1</span>)   <span class="cm"># RuntimeWarning: invalid value</span>`,
      params: 'RuntimeWarning(message)'
    },
    {
      name: 'SyntaxWarning', tag: 'warning',
      short: 'Peringatan tentang sintaks yang mencurigakan tapi valid.',
      desc: 'Digunakan untuk kode yang secara sintaks valid tapi kemungkinan besar ada kesalahan, seperti "is" digunakan dengan literal.',
      uses: ['Linting','Code quality','Probable bug detection','Static analysis'],
      syntax: `<span class="cm"># Python memberi SyntaxWarning otomatis:</span>
x = <span class="nm">1</span>
<span class="kw">if</span> x <span class="kw">is</span> <span class="nm">1</span>:   <span class="cm"># SyntaxWarning: "is" with literal</span>
    <span class="kw">pass</span>    <span class="cm"># gunakan == untuk perbandingan nilai</span>`,
      params: 'SyntaxWarning(message)'
    },
    {
      name: 'ResourceWarning', tag: 'warning',
      short: 'Peringatan tentang resource yang tidak ditutup.',
      desc: 'Digunakan saat resource (file, socket) tidak ditutup dengan benar. Default disuppress kecuali di mode debug (-Wd). Python sendiri menggunakannya untuk unclosed file objects.',
      uses: ['Resource leak detection','File handling','Socket management','Debug mode'],
      syntax: `<span class="kw">import</span> warnings
warnings.filterwarnings(<span class="st">"always"</span>, category=<span class="cls">ResourceWarning</span>)
<span class="kw">import</span> gc; gc.collect()
f = <span class="fn">open</span>(<span class="st">"test.txt"</span>, <span class="st">"w"</span>)
<span class="kw">del</span> f   <span class="cm"># ResourceWarning: unclosed file</span>
<span class="cm"># Solusi: selalu gunakan with statement</span>`,
      params: 'ResourceWarning(message)'
    },
    {
      name: 'FutureWarning / PendingDeprecationWarning', tag: 'warning',
      short: 'Peringatan tentang perubahan semantik di masa depan.',
      desc: 'FutureWarning: perubahan semantik yang akan terjadi di versi mendatang (selalu ditampilkan ke end-user). PendingDeprecationWarning: akan deprecated di masa depan (disuppress by default). FutureWarning lebih urgent.',
      uses: ['API evolution','Semantic change notice','Long-term deprecation','Library versioning'],
      syntax: `warnings.warn(
    <span class="st">"Perilaku fungsi ini akan berubah di v4.0"</span>,
    <span class="cls">FutureWarning</span>, stacklevel=<span class="nm">2</span>
)
warnings.warn(
    <span class="st">"Fitur ini akan deprecated, gunakan X"</span>,
    <span class="cls">PendingDeprecationWarning</span>
)`,
      params: 'FutureWarning / PendingDeprecationWarning'
    },
    {
      name: 'ImportWarning / UnicodeWarning / BytesWarning / EncodingWarning', tag: 'warning', ver: '3.10',
      short: 'Warning spesifik untuk import, unicode, bytes, dan encoding.',
      desc: 'ImportWarning: kemungkinan kesalahan import modul (disuppress default). UnicodeWarning: masalah Unicode yang tidak diharapkan. BytesWarning: campuran bytes/string (-b flag). EncodingWarning (3.10+): encoding locale tidak eksplisit.',
      uses: ['Import debugging','Unicode handling','Bytes/str mixing','Encoding explicit'],
      syntax: `<span class="cm"># BytesWarning: python -b script.py</span>
<span class="st">b"hello"</span> <span class="op">==</span> <span class="st">"hello"</span>   <span class="cm"># BytesWarning dengan flag -b</span>
<span class="cm"># EncodingWarning (Python 3.10+):</span>
<span class="cm"># python -W error::EncodingWarning script.py</span>
<span class="fn">open</span>(<span class="st">"file.txt"</span>)   <span class="cm"># EncodingWarning jika encoding tidak eksplisit</span>`,
      params: 'ImportWarning / UnicodeWarning / BytesWarning / EncodingWarning'
    },
    {
      name: 'warnings.catch_warnings()', tag: 'warning',
      short: 'Context manager untuk sementara mengubah filter warning.',
      desc: 'Perubahan filter warning hanya di dalam blok with, lalu otomatis dikembalikan. Sangat berguna untuk unit testing kode yang menggunakan deprecated API.',
      uses: ['Unit testing','Suppress sementara','Override filter','Testing robustness'],
      syntax: `<span class="kw">import</span> warnings
<span class="kw">with</span> warnings.catch_warnings():
    warnings.simplefilter(<span class="st">"ignore"</span>)
    fungsi_deprecated()
<span class="cm"># Jadikan error untuk testing ketat:</span>
<span class="kw">with</span> warnings.catch_warnings():
    warnings.simplefilter(<span class="st">"error"</span>)
    <span class="kw">try</span>:
        fungsi_lama()
    <span class="kw">except</span> <span class="cls">DeprecationWarning</span>:
        <span class="fn">print</span>(<span class="st">"deprecated terdeteksi!"</span>)`,
      params: 'warnings.catch_warnings(record=False)'
    },
  ]
},
// ═══════════════════════════════════════════════════════════
// 14. DUNDER / MAGIC METHODS
// ═══════════════════════════════════════════════════════════
{
  id: 'dunder', title: 'Dunder / Magic Methods', icon: '✨', color: COLORS.dunder, type: 'dunder',
  desc: '__init__, __str__, __repr__, __len__, __add__, __call__, __enter__, __exit__, dan semua dunder penting',
  commands: [
    {
      name: '__init__ / __new__ / __del__', tag: 'dunder',
      short: 'Lifecycle objek: konstruksi, inisialisasi, destruksi.',
      desc: '__new__ membuat instance baru (jarang di-override). __init__ menginisialisasi state. __del__ dipanggil saat objek dihapus (tidak dijamin kapan). Biasanya hanya perlu __init__.',
      uses: ['OOP','Singleton','Resource cleanup','Object lifecycle'],
      syntax: `<span class="kw">class</span> <span class="cls">Kucing</span>:
    <span class="kw">def</span> <span class="fn">__new__</span>(cls, *args):
        <span class="fn">print</span>(<span class="st">"Objek dibuat"</span>)
        <span class="kw">return</span> <span class="fn">super</span>().__new__(cls)
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nama):
        <span class="bl">self</span>.nama = nama
    <span class="kw">def</span> <span class="fn">__del__</span>(<span class="bl">self</span>):
        <span class="fn">print</span>(<span class="st">f"<span class="dc">{self.nama}</span> dihapus"</span>)`,
      params: '__new__(cls, ...) / __init__(self, ...) / __del__(self)'
    },
    {
      name: '__str__ / __repr__ / __format__ / __bytes__', tag: 'dunder',
      short: 'Representasi objek sebagai string atau bytes.',
      desc: '__str__: representasi user-friendly (str(), print()). __repr__: representasi teknis untuk debugging (idealnya eval(repr(x))==x). __format__: untuk f-string format spec. __bytes__: untuk bytes().',
      uses: ['Debug output','User display','Logging','Serialisasi'],
      syntax: `<span class="kw">class</span> <span class="cls">Poin</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y):
        <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y
    <span class="kw">def</span> <span class="fn">__str__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"(<span class="dc">{self.x}</span>, <span class="dc">{self.y}</span>)"</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"Poin(<span class="dc">{self.x!r}</span>, <span class="dc">{self.y!r}</span>)"</span>
    <span class="kw">def</span> <span class="fn">__format__</span>(<span class="bl">self</span>, spec):
        <span class="kw">return</span> <span class="st">f"(<span class="dc">{self.x:{spec}}</span>, <span class="dc">{self.y:{spec}}</span>)"</span>`,
      params: '__str__(self) / __repr__(self) / __format__(self, format_spec)'
    },
    {
      name: '__len__ / __bool__ / __contains__', tag: 'dunder',
      short: 'Ukuran, nilai kebenaran, dan keanggotaan.',
      desc: '__len__: dipanggil oleh len(). __bool__: dipanggil untuk konversi bool — jika tidak ada, Python cek __len__ (0 = False). __contains__: dipanggil oleh operator in.',
      uses: ['Custom collection','Truthy/falsy','Membership test','Container protocol'],
      syntax: `<span class="kw">class</span> <span class="cls">Wadah</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, data):
        <span class="bl">self</span>.data = data
    <span class="kw">def</span> <span class="fn">__len__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">len</span>(<span class="bl">self</span>.data)
    <span class="kw">def</span> <span class="fn">__bool__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">len</span>(<span class="bl">self</span>.data) <span class="op">></span> <span class="nm">0</span>
    <span class="kw">def</span> <span class="fn">__contains__</span>(<span class="bl">self</span>, item):
        <span class="kw">return</span> item <span class="kw">in</span> <span class="bl">self</span>.data`,
      params: '__len__(self) / __bool__(self) / __contains__(self, item)'
    },
    {
      name: '__getitem__ / __setitem__ / __delitem__', tag: 'dunder',
      short: 'Subscript operator — obj[key], obj[key]=val, del obj[key].',
      desc: 'Memungkinkan objek custom berperilaku seperti list atau dict. __getitem__ juga dipakai saat iterasi (sebagai fallback).',
      uses: ['Custom container','Dict-like object','Matrix indexing','Proxy object'],
      syntax: `<span class="kw">class</span> <span class="cls">Grid</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>): <span class="bl">self</span>.data = {}
    <span class="kw">def</span> <span class="fn">__getitem__</span>(<span class="bl">self</span>, key):
        <span class="kw">return</span> <span class="bl">self</span>.data[key]
    <span class="kw">def</span> <span class="fn">__setitem__</span>(<span class="bl">self</span>, key, val):
        <span class="bl">self</span>.data[key] = val
    <span class="kw">def</span> <span class="fn">__delitem__</span>(<span class="bl">self</span>, key):
        <span class="kw">del</span> <span class="bl">self</span>.data[key]`,
      params: '__getitem__(self, key) / __setitem__(self, key, value) / __delitem__(self, key)'
    },
    {
      name: '__iter__ / __next__ / __reversed__', tag: 'dunder',
      short: 'Protokol iterator — membuat objek iterable.',
      desc: '__iter__ mengembalikan iterator (bisa return self jika class sendiri iterator). __next__ mengambil item berikutnya. __reversed__ untuk reversed().',
      uses: ['Custom iterable','Lazy sequence','Pipeline','Generator-like'],
      syntax: `<span class="kw">class</span> <span class="cls">Hitung</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, n): <span class="bl">self</span>.n, <span class="bl">self</span>.i = n, <span class="nm">0</span>
    <span class="kw">def</span> <span class="fn">__iter__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="bl">self</span>
    <span class="kw">def</span> <span class="fn">__next__</span>(<span class="bl">self</span>):
        <span class="kw">if</span> <span class="bl">self</span>.i <span class="op">>=</span> <span class="bl">self</span>.n:
            <span class="kw">raise</span> <span class="ex">StopIteration</span>
        <span class="bl">self</span>.i <span class="op">+=</span> <span class="nm">1</span>; <span class="kw">return</span> <span class="bl">self</span>.i`,
      params: '__iter__(self) / __next__(self) / __reversed__(self)'
    },
    {
      name: '__add__ / __sub__ / __mul__ dan operator lainnya', tag: 'dunder',
      short: 'Overloading operator aritmatika.',
      desc: 'Mendefinisikan perilaku operator +, -, *, /, //, %, **, @. Setiap operator juga punya versi "reflected" (r-prefix: __radd__, __rsub__, dll) dan "in-place" (i-prefix: __iadd__, dll).',
      uses: ['Vektor/matriks','Custom numeric','Domain-specific','DSL'],
      syntax: `<span class="kw">class</span> <span class="cls">Vec2D</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y): <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y
    <span class="kw">def</span> <span class="fn">__add__</span>(<span class="bl">self</span>, o):
        <span class="kw">return</span> <span class="cls">Vec2D</span>(<span class="bl">self</span>.x+o.x, <span class="bl">self</span>.y+o.y)
    <span class="kw">def</span> <span class="fn">__mul__</span>(<span class="bl">self</span>, scalar):
        <span class="kw">return</span> <span class="cls">Vec2D</span>(<span class="bl">self</span>.x*scalar, <span class="bl">self</span>.y*scalar)
    <span class="kw">def</span> <span class="fn">__rmul__</span>(<span class="bl">self</span>, scalar):
        <span class="kw">return</span> <span class="bl">self</span>.<span class="fn">__mul__</span>(scalar)`,
      params: '__add__ / __radd__ / __iadd__ / __sub__ / __mul__ / ...'
    },
    {
      name: '__eq__ / __lt__ / __le__ / __gt__ / __ge__ / __ne__', tag: 'dunder',
      short: 'Operator perbandingan.',
      desc: 'Mendefinisikan ==, <, <=, >, >=, !=. Gunakan @functools.total_ordering untuk hanya mendefinisikan __eq__ dan satu comparison method lainnya.',
      uses: ['Sorting custom','Equality check','Comparable objects','Data class'],
      syntax: `<span class="kw">from</span> functools <span class="kw">import</span> total_ordering
<span class="op">@</span>total_ordering
<span class="kw">class</span> <span class="cls">Kartu</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nilai): <span class="bl">self</span>.nilai = nilai
    <span class="kw">def</span> <span class="fn">__eq__</span>(<span class="bl">self</span>, o): <span class="kw">return</span> <span class="bl">self</span>.nilai <span class="op">==</span> o.nilai
    <span class="kw">def</span> <span class="fn">__lt__</span>(<span class="bl">self</span>, o): <span class="kw">return</span> <span class="bl">self</span>.nilai <span class="op">&lt;</span> o.nilai
<span class="cm"># @total_ordering otomatis buat >, >=, <=, !=</span>`,
      params: '__eq__ / __lt__ / __le__ / __gt__ / __ge__ / __ne__'
    },
    {
      name: '__hash__ / __index__', tag: 'dunder',
      short: 'Hash dan konversi ke integer untuk indexing.',
      desc: '__hash__ dipanggil oleh hash() — jika mendefinisikan __eq__, Python otomatis set __hash__=None. __index__ memungkinkan objek digunakan sebagai slice index.',
      uses: ['Dict key','Set member','Custom integer type','Slice custom'],
      syntax: `<span class="kw">class</span> <span class="cls">Poin</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y): <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y
    <span class="kw">def</span> <span class="fn">__eq__</span>(<span class="bl">self</span>, o): <span class="kw">return</span> (<span class="bl">self</span>.x, <span class="bl">self</span>.y) <span class="op">==</span> (o.x, o.y)
    <span class="kw">def</span> <span class="fn">__hash__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">hash</span>((<span class="bl">self</span>.x, <span class="bl">self</span>.y))
<span class="cm"># Sekarang bisa dijadikan dict key dan set member</span>`,
      params: '__hash__(self) / __index__(self)'
    },
    {
      name: '__enter__ / __exit__', tag: 'dunder',
      short: 'Protocol context manager untuk with statement.',
      desc: '__enter__ dijalankan saat masuk blok with, mengembalikan nilai yang di-bind ke as. __exit__ selalu dijalankan saat keluar, bahkan jika ada exception.',
      uses: ['Resource management','Transaction','Lock/Unlock','Timing'],
      syntax: `<span class="kw">import</span> time

<span class="kw">class</span> <span class="cls">Timer</span>:
    <span class="kw">def</span> <span class="fn">__enter__</span>(<span class="bl">self</span>):
        <span class="bl">self</span>.start = time.time()
        <span class="kw">return</span> <span class="bl">self</span>
    <span class="kw">def</span> <span class="fn">__exit__</span>(<span class="bl">self</span>, *args):
        elapsed = time.time() - <span class="bl">self</span>.start
        <span class="fn">print</span>(<span class="st">f"Waktu: <span class="dc">{elapsed:.3f}</span>s"</span>)
        <span class="kw">return</span> <span class="bl">False</span>   <span class="cm"># False = tidak suppress exception</span>`,
      params: '__enter__(self) / __exit__(self, exc_type, exc_val, exc_tb)'
    },
    {
      name: '__call__', tag: 'dunder',
      short: 'Membuat instance objek bisa dipanggil seperti fungsi.',
      desc: 'Memungkinkan instance class dipanggil dengan tanda kurung. Digunakan untuk stateful functions, decorators, dan functor pattern.',
      uses: ['Stateful function','Decorator class','Functor','Memoization'],
      syntax: `<span class="kw">class</span> <span class="cls">Counter</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>): <span class="bl">self</span>.n = <span class="nm">0</span>
    <span class="kw">def</span> <span class="fn">__call__</span>(<span class="bl">self</span>):
        <span class="bl">self</span>.n <span class="op">+=</span> <span class="nm">1</span>; <span class="kw">return</span> <span class="bl">self</span>.n
cnt = <span class="cls">Counter</span>()
cnt()   <span class="cm"># 1</span>
cnt()   <span class="cm"># 2</span>
<span class="fn">callable</span>(cnt)   <span class="cm"># True</span>`,
      params: '__call__(self, *args, **kwargs)'
    },
    {
      name: '__getattr__ / __setattr__ / __delattr__ / __getattribute__', tag: 'dunder',
      short: 'Kontrol akses atribut secara custom.',
      desc: '__getattr__: dipanggil HANYA jika atribut tidak ditemukan secara normal. __getattribute__: dipanggil SELALU saat akses atribut. __setattr__: dipanggil saat assignment atribut. __delattr__: saat del obj.attr.',
      uses: ['Proxy object','Lazy attribute','ORM field','Attribute validation'],
      syntax: `<span class="kw">class</span> <span class="cls">Proxy</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, obj): 
        <span class="fn">object</span>.__setattr__(<span class="bl">self</span>, <span class="st">"_obj"</span>, obj)
    <span class="kw">def</span> <span class="fn">__getattr__</span>(<span class="bl">self</span>, name):
        <span class="kw">return</span> <span class="fn">getattr</span>(<span class="bl">self</span>._obj, name)
    <span class="kw">def</span> <span class="fn">__setattr__</span>(<span class="bl">self</span>, name, val):
        <span class="fn">setattr</span>(<span class="bl">self</span>._obj, name, val)`,
      params: '__getattr__ / __setattr__ / __delattr__ / __getattribute__'
    },

    {
      name: '__slots__', tag: 'dunder',
      short: 'Membatasi atribut instance untuk hemat memori.',
      desc: 'Mendefinisikan __slots__ mencegah pembuatan __dict__ per instance. Menghemat memori signifikan (40-50%) dan mempercepat akses atribut untuk class dengan banyak instance.',
      uses: ['Memory optimization','Performance','Large object count','NamedTuple-like'],
      syntax: `<span class="kw">class</span> <span class="cls">Poin</span>:
    __slots__ = (<span class="st">"x"</span>, <span class="st">"y"</span>)
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y):
        <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y
p = <span class="cls">Poin</span>(<span class="nm">1</span>, <span class="nm">2</span>)
<span class="cm"># p.z = 3  → AttributeError! hanya x dan y</span>
<span class="cm"># Tidak ada __dict__ — lebih hemat memori</span>`,
      params: '__slots__ = (attr1, attr2, ...)'
    },
    {
      name: '__doc__ / __name__ / __module__ / __qualname__', tag: 'dunder',
      short: 'Metadata fungsi dan class.',
      desc: 'Atribut metadata yang otomatis diset oleh Python. __doc__: docstring. __name__: nama fungsi/class. __module__: nama modul. __qualname__: qualified name (termasuk class enclosing).',
      uses: ['Dokumentasi','Introspeksi','Dekorator wraps','Framework'],
      syntax: `<span class="kw">def</span> <span class="fn">greet</span>(nama):
    <span class="st">"""Menyapa pengguna."""</span>
    <span class="kw">return</span> <span class="st">f"Halo <span class="dc">{nama}</span>"</span>
<span class="fn">print</span>(greet.__name__)    <span class="cm"># 'greet'</span>
<span class="fn">print</span>(greet.__doc__)     <span class="cm"># 'Menyapa pengguna.'</span>
<span class="fn">print</span>(greet.__module__)  <span class="cm"># '__main__'</span>
<span class="kw">from</span> functools <span class="kw">import</span> wraps
<span class="cm"># @wraps(func) menyalin __name__, __doc__, dll</span>`,
      params: '__doc__ / __name__ / __module__ / __qualname__'
    },
    {
      name: '__aiter__ / __anext__ / __aenter__ / __aexit__', tag: 'dunder',
      short: 'Protocol async — async iterator dan async context manager.',
      desc: 'Versi async dari protokol iterator dan context manager. __aiter__/__anext__ untuk async for. __aenter__/__aexit__ untuk async with. Digunakan dengan asyncio.',
      uses: ['Async iteration','Async context manager','Database async','HTTP client async'],
      syntax: `<span class="kw">class</span> <span class="cls">AsyncRange</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, n): <span class="bl">self</span>.i, <span class="bl">self</span>.n = <span class="nm">0</span>, n
    <span class="kw">def</span> <span class="fn">__aiter__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="bl">self</span>
    <span class="kw">async def</span> <span class="fn">__anext__</span>(<span class="bl">self</span>):
        <span class="kw">if</span> <span class="bl">self</span>.i <span class="op">>=</span> <span class="bl">self</span>.n: <span class="kw">raise</span> <span class="ex">StopAsyncIteration</span>
        <span class="bl">self</span>.i <span class="op">+=</span> <span class="nm">1</span>; <span class="kw">return</span> <span class="bl">self</span>.i
<span class="kw">async for</span> n <span class="kw">in</span> <span class="cls">AsyncRange</span>(<span class="nm">3</span>): <span class="fn">print</span>(n)`,
      params: '__aiter__ / __anext__ / __aenter__ / __aexit__'
    },
    {
      name: '__get__ / __set__ / __delete__ (Descriptor Protocol)', tag: 'dunder',
      short: 'Descriptor — mengontrol akses atribut dari class lain.',
      desc: 'Descriptor adalah objek yang mendefinisikan __get__, __set__, atau __delete__. Digunakan saat menjadi atribut kelas lain. property(), classmethod(), staticmethod() semuanya adalah descriptor.',
      uses: ['property','classmethod','ORM field','Validation descriptor'],
      syntax: `<span class="kw">class</span> <span class="cls">PositifSaja</span>:
    <span class="kw">def</span> <span class="fn">__set_name__</span>(<span class="bl">self</span>, owner, name):
        <span class="bl">self</span>.name = name
    <span class="kw">def</span> <span class="fn">__get__</span>(<span class="bl">self</span>, obj, cls):
        <span class="kw">return</span> <span class="fn">getattr</span>(obj, <span class="st">f"_<span class="dc">{self.name}</span>"</span>, <span class="nm">0</span>)
    <span class="kw">def</span> <span class="fn">__set__</span>(<span class="bl">self</span>, obj, val):
        <span class="kw">if</span> val <span class="op">&lt;</span> <span class="nm">0</span>: <span class="kw">raise</span> <span class="ex">ValueError</span>
        <span class="fn">setattr</span>(obj, <span class="st">f"_<span class="dc">{self.name}</span>"</span>, val)`,
      params: '__get__(self, obj, type) / __set__(self, obj, value) / __delete__(self, obj)'
    },
    {
      name: '__missing__', tag: 'dunder',
      short: 'Dipanggil oleh dict ketika key tidak ditemukan.',
      desc: 'Diimplementasikan di subclass dict untuk menentukan perilaku saat key tidak ada. Dipakai oleh collections.defaultdict. Mengembalikan nilai atau melempar exception.',
      uses: ['defaultdict','Auto-create key','Cache miss','Custom dict'],
      syntax: `<span class="kw">class</span> <span class="cls">DefaultDict</span>(<span class="cls">dict</span>):
    <span class="kw">def</span> <span class="fn">__missing__</span>(<span class="bl">self</span>, key):
        <span class="bl">self</span>[key] = []   <span class="cm"># auto-create list</span>
        <span class="kw">return</span> <span class="bl">self</span>[key]
d = <span class="cls">DefaultDict</span>()
d[<span class="st">"a"</span>].append(<span class="nm">1</span>)   <span class="cm"># {'a': [1]}</span>
<span class="cm"># Versi bawaan:</span>
<span class="kw">from</span> collections <span class="kw">import</span> defaultdict
dd = defaultdict(<span class="fn">list</span>)
dd[<span class="st">"b"</span>].append(<span class="nm">2</span>)`,
      params: '__missing__(self, key)'
    },
    {
      name: '__sizeof__', tag: 'dunder',
      short: 'Mengembalikan ukuran objek dalam bytes.',
      desc: 'Dipanggil oleh sys.getsizeof(). Hanya ukuran objek itu sendiri, bukan termasuk objek yang dirujuk. Override untuk class dengan ukuran kustom.',
      uses: ['Memory profiling','Optimasi memori','Diagnostik','sys.getsizeof'],
      syntax: `<span class="kw">import</span> sys
sys.getsizeof(<span class="nm">42</span>)       <span class="cm"># 28 bytes</span>
sys.getsizeof(<span class="st">"hello"</span>)  <span class="cm"># 54 bytes</span>
sys.getsizeof([])       <span class="cm"># 56 bytes (empty list)</span>
<span class="kw">class</span> <span class="cls">Custom</span>:
    <span class="kw">def</span> <span class="fn">__sizeof__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">super</span>().__sizeof__() + sys.getsizeof(<span class="bl">self</span>.__dict__)`,
      params: '__sizeof__(self)'
    },
    {
      name: '__round__ / __trunc__ / __floor__ / __ceil__', tag: 'dunder',
      short: 'Protocol pembulatan untuk math.round, trunc, floor, ceil.',
      desc: '__round__ dipanggil oleh round(). __trunc__ oleh math.trunc(). __floor__ oleh math.floor(). __ceil__ oleh math.ceil(). Memungkinkan class custom mendukung operasi pembulatan.',
      uses: ['Custom numeric type','Fixed-point','Decimal custom','Domain-specific math'],
      syntax: `<span class="kw">import</span> math
<span class="kw">class</span> <span class="cls">Meter</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, v): <span class="bl">self</span>.v = v
    <span class="kw">def</span> <span class="fn">__round__</span>(<span class="bl">self</span>, n=<span class="nm">0</span>):
        <span class="kw">return</span> <span class="cls">Meter</span>(<span class="fn">round</span>(<span class="bl">self</span>.v, n))
    <span class="kw">def</span> <span class="fn">__floor__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="cls">Meter</span>(math.floor(<span class="bl">self</span>.v))
m = <span class="cls">Meter</span>(<span class="nm">3.7</span>)
<span class="fn">round</span>(m, <span class="nm">0</span>)      <span class="cm"># Meter(4.0)</span>`,
      params: '__round__(self, ndigits=None) / __trunc__ / __floor__ / __ceil__'
    },
    {
      name: '__matmul__ (@)', tag: 'dunder', ver: '3.5',
      short: 'Operator perkalian matriks @ (Python 3.5+).',
      desc: 'Digunakan oleh NumPy dan library matriks untuk operator @ (matrix multiplication). Juga ada __rmatmul__ dan __imatmul__.',
      uses: ['Matrix multiplication','NumPy','Linear algebra','DSL matematik'],
      syntax: `<span class="kw">class</span> <span class="cls">Matrix</span>:
    <span class="kw">def</span> <span class="fn">__matmul__</span>(<span class="bl">self</span>, other):
        <span class="cm"># implementasi perkalian matriks</span>
        <span class="kw">return</span> <span class="cls">Matrix</span>(...)
<span class="cm"># NumPy:</span>
<span class="kw">import</span> numpy <span class="kw">as</span> np
A = np.array([[<span class="nm">1</span>,<span class="nm">2</span>],[<span class="nm">3</span>,<span class="nm">4</span>]])
B = np.array([[<span class="nm">5</span>,<span class="nm">6</span>],[<span class="nm">7</span>,<span class="nm">8</span>]])
A @ B   <span class="cm"># matrix multiplication</span>`,
      params: '__matmul__(self, other) / __rmatmul__ / __imatmul__'
    },
    {
      name: '__subclasshook__', tag: 'dunder',
      short: 'Hook ABC untuk mengkustomisasi isinstance() dan issubclass().',
      desc: 'Method class dari ABC (Abstract Base Class). Dipanggil oleh __subclasscheck__ saat menggunakan isinstance() atau issubclass() dengan ABC. Mengembalikan True, False, atau NotImplemented. Memungkinkan "virtual subclassing" — kelas dianggap subclass dari ABC tanpa harus mewarisinya secara eksplisit.',
      uses: ['ABC custom check','Virtual subclass','Duck typing formal','Protocol verification'],
      syntax: `<span class="kw">from</span> abc <span class="kw">import</span> ABC, abstractmethod

<span class="kw">class</span> <span class="cls">Printable</span>(<span class="cls">ABC</span>):
    <span class="op">@</span><span class="fn">classmethod</span>
    <span class="kw">def</span> <span class="fn">__subclasshook__</span>(cls, C):
        <span class="cm"># Dianggap Printable jika punya method 'to_str'</span>
        <span class="kw">if</span> cls <span class="kw">is</span> <span class="cls">Printable</span>:
            <span class="kw">if</span> <span class="fn">any</span>(<span class="st">"to_str"</span> <span class="kw">in</span> B.__dict__ <span class="kw">for</span> B <span class="kw">in</span> C.__mro__):
                <span class="kw">return</span> <span class="bl">True</span>
        <span class="kw">return</span> <span class="bl">NotImplemented</span>

<span class="kw">class</span> <span class="cls">Dokumen</span>:           <span class="cm"># tidak inherit Printable!</span>
    <span class="kw">def</span> <span class="fn">to_str</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">"dokumen"</span>

<span class="fn">isinstance</span>(<span class="cls">Dokumen</span>(), <span class="cls">Printable</span>)   <span class="cm"># True (virtual subclass!)</span>`,
      params: '__subclasshook__(cls, C)  → True | False | NotImplemented'
    },
    {
      name: '__length_hint__', tag: 'dunder',
      short: 'Estimasi panjang objek — hint untuk optimasi memori.',
      desc: 'Dipanggil oleh operator.length_hint() untuk mendapatkan perkiraan panjang iterator. Tidak harus akurat — berbeda dari __len__ yang harus tepat. Python menggunakannya untuk pre-alokasi memori saat list(), tuple(), dll.',
      uses: ['Iterator performance','Pre-allocation hint','Custom iterator','Progress tracking'],
      syntax: `<span class="kw">import</span> operator

<span class="kw">class</span> <span class="cls">CountdownIter</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, n): <span class="bl">self</span>.i = n
    <span class="kw">def</span> <span class="fn">__iter__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="bl">self</span>
    <span class="kw">def</span> <span class="fn">__next__</span>(<span class="bl">self</span>):
        <span class="kw">if</span> <span class="bl">self</span>.i <span class="op"><=</span> <span class="nm">0</span>: <span class="kw">raise</span> <span class="ex">StopIteration</span>
        <span class="bl">self</span>.i <span class="op">-=</span> <span class="nm">1</span>; <span class="kw">return</span> <span class="bl">self</span>.i <span class="op">+</span> <span class="nm">1</span>
    <span class="kw">def</span> <span class="fn">__length_hint__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="bl">self</span>.i   <span class="cm"># estimasi elemen tersisa</span>

it = <span class="cls">CountdownIter</span>(<span class="nm">100</span>)
operator.length_hint(it)   <span class="cm"># 100 — hint untuk list()</span>`,
      params: '__length_hint__(self) → int'
    },
    {
      name: '__copy__ / __deepcopy__', tag: 'dunder',
      short: 'Mengkustomisasi perilaku copy.copy() dan copy.deepcopy().',
      desc: '__copy__: dipanggil oleh copy.copy() untuk shallow copy. __deepcopy__: dipanggil oleh copy.deepcopy() untuk deep copy. Jika tidak ada, Python menggunakan __reduce_ex__ atau __getstate__/__setstate__.',
      uses: ['Custom copy behavior','Flyweight pattern','Shared resource handling','Cache preservation'],
      syntax: `<span class="kw">import</span> copy

<span class="kw">class</span> <span class="cls">Config</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, data):
        <span class="bl">self</span>.data = data
        <span class="bl">self</span>._cache = {}   <span class="cm"># jangan dicopy!</span>

    <span class="kw">def</span> <span class="fn">__copy__</span>(<span class="bl">self</span>):
        c = <span class="cls">Config</span>(<span class="bl">self</span>.data)   <span class="cm"># cache TIDAK disalin</span>
        <span class="kw">return</span> c

    <span class="kw">def</span> <span class="fn">__deepcopy__</span>(<span class="bl">self</span>, memo):
        c = <span class="cls">Config</span>(copy.deepcopy(<span class="bl">self</span>.data, memo))
        <span class="kw">return</span> c

cfg = <span class="cls">Config</span>({<span class="st">"k"</span>: [<span class="nm">1</span>,<span class="nm">2</span>]})
cfg2 = copy.deepcopy(cfg)   <span class="cm"># menggunakan __deepcopy__</span>`,
      params: '__copy__(self) / __deepcopy__(self, memo)'
    },
    {
      name: '__reduce__ / __reduce_ex__ / __getstate__ / __setstate__', tag: 'dunder',
      short: 'Protocol pickle — serialisasi dan deserialisasi objek.',
      desc: '__reduce__/__reduce_ex__: dikonsultasikan oleh pickle untuk mengetahui cara merekonstruksi objek. __getstate__: mengembalikan state yang akan di-pickle. __setstate__: memulihkan state setelah unpickle. Berguna untuk objek dengan resource yang tidak bisa di-serialize (file handle, lock, connection).',
      uses: ['Pickle custom','Distributed computing','Cache serialization','Session persistence'],
      syntax: `<span class="kw">import</span> pickle

<span class="kw">class</span> <span class="cls">Koneksi</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, host, port):
        <span class="bl">self</span>.host = host
        <span class="bl">self</span>.port = port
        <span class="bl">self</span>.socket = <span class="bl">None</span>   <span class="cm"># tidak bisa di-pickle!</span>

    <span class="kw">def</span> <span class="fn">__getstate__</span>(<span class="bl">self</span>):
        state = <span class="bl">self</span>.__dict__.copy()
        <span class="kw">del</span> state[<span class="st">'socket'</span>]   <span class="cm"># buang yg tidak serializable</span>
        <span class="kw">return</span> state

    <span class="kw">def</span> <span class="fn">__setstate__</span>(<span class="bl">self</span>, state):
        <span class="bl">self</span>.__dict__.update(state)
        <span class="bl">self</span>.socket = <span class="bl">None</span>   <span class="cm"># reinisialisasi</span>

k = <span class="cls">Koneksi</span>(<span class="st">"localhost"</span>, <span class="nm">8080</span>)
data = pickle.dumps(k)
k2 = pickle.loads(data)     <span class="cm"># socket=None, bukan error</span>`,
      params: '__reduce__(self) / __getstate__(self) / __setstate__(self, state)'
    },
    {
      name: '__neg__ / __pos__ / __abs__ / __invert__', tag: 'dunder',
      short: 'Operator unary: negasi (-x), positif (+x), nilai mutlak abs(), bitwise NOT (~x).',
      desc: '__neg__: dipanggil untuk <code>-x</code>. __pos__: dipanggil untuk <code>+x</code>. __abs__: dipanggil oleh <code>abs()</code>. __invert__: dipanggil untuk <code>~x</code> (bitwise NOT). Semua hanya menerima <code>self</code> dan mengembalikan objek baru.',
      uses: ['Custom numeric type','Vector math','Complex number','Bitwise operations'],
      syntax: `<span class="kw">class</span> <span class="cls">Vec2D</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y): <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y
    <span class="kw">def</span> <span class="fn">__neg__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="cls">Vec2D</span>(<span class="op">-</span><span class="bl">self</span>.x, <span class="op">-</span><span class="bl">self</span>.y)
    <span class="kw">def</span> <span class="fn">__pos__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="cls">Vec2D</span>(<span class="bl">self</span>.x, <span class="bl">self</span>.y)
    <span class="kw">def</span> <span class="fn">__abs__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> (<span class="bl">self</span>.x<span class="op">**</span><span class="nm">2</span> <span class="op">+</span> <span class="bl">self</span>.y<span class="op">**</span><span class="nm">2</span>) <span class="op">**</span> <span class="nm">0.5</span>   <span class="cm"># panjang vektor</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">f"Vec2D(<span class="dc">{self.x}</span>,<span class="dc">{self.y}</span>)"</span>

v = <span class="cls">Vec2D</span>(<span class="nm">3</span>, <span class="nm">4</span>)
<span class="op">-</span>v           <span class="cm"># Vec2D(-3,-4)  — __neg__</span>
<span class="op">+</span>v           <span class="cm"># Vec2D(3,4)    — __pos__</span>
<span class="fn">abs</span>(v)       <span class="cm"># 5.0           — __abs__</span>

<span class="cm"># __invert__ untuk bitwise NOT (~):</span>
<span class="kw">class</span> <span class="cls">Flags</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, v): <span class="bl">self</span>.v = v
    <span class="kw">def</span> <span class="fn">__invert__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="cls">Flags</span>(<span class="op">~</span><span class="bl">self</span>.v)
<span class="op">~</span><span class="cls">Flags</span>(<span class="nm">0b1010</span>)   <span class="cm"># Flags(-11)</span>`,
      params: '__neg__(self) / __pos__(self) / __abs__(self) / __invert__(self)'
    },
    {
      name: '__int__ / __float__ / __complex__ / __bool__', tag: 'dunder',
      short: 'Konversi eksplisit objek ke tipe numerik: int(), float(), complex(), bool().',
      desc: '__int__: dipanggil oleh <code>int()</code>. __float__: oleh <code>float()</code>. __complex__: oleh <code>complex()</code>. __bool__: oleh <code>bool()</code> dan ekspresi kondisional — jika tidak ada, Python fallback ke <code>__len__</code> (0=False). Penting untuk custom numeric types agar bekerja mulus dengan fungsi built-in.',
      uses: ['Custom numeric type','Type coercion','Unit type','Domain-specific numbers'],
      syntax: `<span class="kw">class</span> <span class="cls">Suhu</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, celsius):
        <span class="bl">self</span>.c = celsius
    <span class="kw">def</span> <span class="fn">__int__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">int</span>(<span class="bl">self</span>.c)         <span class="cm"># truncate ke int</span>
    <span class="kw">def</span> <span class="fn">__float__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">float</span>(<span class="bl">self</span>.c)       <span class="cm"># ke float</span>
    <span class="kw">def</span> <span class="fn">__bool__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="bl">self</span>.c <span class="op">!=</span> <span class="nm">0.0</span>      <span class="cm"># False jika 0 derajat</span>
    <span class="kw">def</span> <span class="fn">__complex__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="fn">complex</span>(<span class="bl">self</span>.c, <span class="nm">0</span>)

s = <span class="cls">Suhu</span>(<span class="nm">36.6</span>)
<span class="fn">int</span>(s)       <span class="cm"># 36</span>
<span class="fn">float</span>(s)     <span class="cm"># 36.6</span>
<span class="fn">bool</span>(s)      <span class="cm"># True</span>
<span class="kw">if</span> s:
    <span class="fn">print</span>(<span class="st">"suhu terdeteksi"</span>)   <span class="cm"># __bool__ dipanggil</span>
<span class="fn">complex</span>(s)   <span class="cm"># (36.6+0j)</span>`,
      params: '__int__(self) / __float__(self) / __complex__(self) / __bool__(self)'
    },
    {
      name: '__fspath__', tag: 'dunder', ver: '3.6',
      short: 'Protocol path-like object — os.fspath(), open(), pathlib support.',
      desc: 'Dipanggil oleh <code>os.fspath()</code>. Memungkinkan class custom digunakan di semua tempat yang menerima path file: <code>open()</code>, <code>os.listdir()</code>, <code>shutil</code>, <code>pathlib</code>, dll. Harus return <code>str</code> atau <code>bytes</code>. Diperkenalkan PEP 519 Python 3.6.',
      uses: ['Custom path type','Path-like object','os.fspath integration','pathlib compat'],
      syntax: `<span class="kw">import</span> os

<span class="kw">class</span> <span class="cls">PathKustom</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, *bagian):
        <span class="bl">self</span>._path = <span class="st">"/"</span>.join(bagian)
    <span class="kw">def</span> <span class="fn">__fspath__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="bl">self</span>._path     <span class="cm"># harus return str atau bytes</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"Path('<span class="dc">{self._path}</span>')"</span>

p = <span class="cls">PathKustom</span>(<span class="st">"/tmp"</span>, <span class="st">"data.txt"</span>)
os.fspath(p)           <span class="cm"># '/tmp/data.txt'</span>
os.path.exists(p)      <span class="cm"># works!</span>
<span class="kw">with</span> <span class="fn">open</span>(p, <span class="st">"w"</span>) <span class="kw">as</span> f:  <span class="cm"># works!</span>
    f.write(<span class="st">"ok"</span>)

<span class="cm"># pathlib.Path juga mengimplementasikan __fspath__:</span>
<span class="kw">from</span> pathlib <span class="kw">import</span> Path
os.fspath(Path(<span class="st">"/tmp"</span>))  <span class="cm"># '/tmp'</span>`,
      params: '__fspath__(self) → str | bytes'
    },
    {
      name: '__await__', tag: 'dunder', ver: '3.5',
      short: 'Membuat objek bisa digunakan dengan keyword await.',
      desc: 'Dipanggil saat objek digunakan dengan <code>await</code>. Harus mengembalikan iterator yang mengimplementasikan protokol generator. Memungkinkan class non-coroutine diintegrasikan ke dalam async/await workflow tanpa harus menjadi async function.',
      uses: ['Custom awaitable','Async protocol','Future-like object','Async library integration'],
      syntax: `<span class="kw">import</span> asyncio

<span class="kw">class</span> <span class="cls">Awaitable</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, nilai):
        <span class="bl">self</span>.nilai = nilai
    <span class="kw">def</span> <span class="fn">__await__</span>(<span class="bl">self</span>):
        <span class="cm"># Delegasikan ke future/coroutine yang sudah ada</span>
        <span class="kw">return</span> asyncio.<span class="fn">sleep</span>(<span class="nm">0</span>, result=<span class="bl">self</span>.nilai).__await__()

<span class="kw">async def</span> <span class="fn">main</span>():
    hasil = <span class="kw">await</span> <span class="cls">Awaitable</span>(<span class="nm">42</span>)   <span class="cm"># works! → 42</span>
    <span class="fn">print</span>(hasil)

asyncio.run(<span class="fn">main</span>())

<span class="cm"># Cek awaitable:</span>
<span class="kw">import</span> inspect
inspect.isawaitable(<span class="cls">Awaitable</span>(<span class="nm">1</span>))   <span class="cm"># True</span>`,
      params: '__await__(self) → Iterator'
    },
    {
      name: '__prepare__', tag: 'dunder', ver: '3.0',
      short: 'Dipanggil metaclass sebelum class body — menyiapkan namespace class.',
      desc: '<code>@classmethod</code> pada metaclass yang dipanggil sebelum class body dieksekusi. Mengembalikan mapping (biasanya dict atau subclass-nya) yang dipakai sebagai namespace saat class body berjalan. Berguna untuk ordered attributes, tracking definisi, atau namespace custom.',
      uses: ['Metaclass','Ordered class attrs','Enum implementation','Class definition hook'],
      syntax: `<span class="kw">from</span> collections <span class="kw">import</span> OrderedDict

<span class="kw">class</span> <span class="cls">OrderedMeta</span>(<span class="fn">type</span>):
    <span class="op">@</span><span class="fn">classmethod</span>
    <span class="kw">def</span> <span class="fn">__prepare__</span>(mcs, name, bases, **kwargs):
        <span class="cm"># Namespace dipakai saat class body berjalan</span>
        <span class="kw">return</span> OrderedDict()   <span class="cm"># track urutan definisi atribut</span>

    <span class="kw">def</span> <span class="fn">__new__</span>(mcs, name, bases, namespace):
        cls = <span class="fn">super</span>().__new__(mcs, name, bases, <span class="fn">dict</span>(namespace))
        cls._attr_order = [k <span class="kw">for</span> k <span class="kw">in</span> namespace
                           <span class="kw">if not</span> k.startswith(<span class="st">'_'</span>)]
        <span class="kw">return</span> cls

<span class="kw">class</span> <span class="cls">Config</span>(metaclass=<span class="cls">OrderedMeta</span>):
    HOST    = <span class="st">"localhost"</span>
    PORT    = <span class="nm">8080</span>
    DEBUG   = <span class="bl">True</span>
    TIMEOUT = <span class="nm">30</span>

<span class="fn">print</span>(<span class="cls">Config</span>._attr_order)
<span class="cm"># ['HOST', 'PORT', 'DEBUG', 'TIMEOUT'] — urutan terjaga!</span>`,
      params: '__prepare__(mcs, name, bases, **kwargs) → mapping  (classmethod metaclass)'
    },
    {
      name: '__instancecheck__ / __subclasscheck__', tag: 'dunder',
      short: 'Mengkustomisasi isinstance() dan issubclass() di level metaclass.',
      desc: 'Didefinisikan di metaclass (bukan di class biasa). __instancecheck__ dipanggil saat isinstance(obj, cls). __subclasscheck__ saat issubclass(sub, cls). Memungkinkan tipe kustom mendukung pengecekan tipe yang lebih fleksibel.',
      uses: ['Metaclass','ABC','Type system kustom','Protocol verification'],
      syntax: `<span class="kw">class</span> <span class="cls">TipeSpesialMeta</span>(<span class="fn">type</span>):
    <span class="kw">def</span> <span class="fn">__instancecheck__</span>(cls, instance):
        <span class="cm"># Dianggap instance jika punya semua atribut</span>
        <span class="kw">return</span> <span class="fn">all</span>(<span class="fn">hasattr</span>(instance, a)
                    <span class="kw">for</span> a <span class="kw">in</span> cls._required)

<span class="kw">class</span> <span class="cls">Saveable</span>(metaclass=<span class="cls">TipeSpesialMeta</span>):
    _required = (<span class="st">"save"</span>, <span class="st">"load"</span>)

<span class="kw">class</span> <span class="cls">File</span>:
    <span class="kw">def</span> <span class="fn">save</span>(<span class="bl">self</span>): ...
    <span class="kw">def</span> <span class="fn">load</span>(<span class="bl">self</span>): ...

<span class="fn">isinstance</span>(<span class="cls">File</span>(), <span class="cls">Saveable</span>)   <span class="cm"># True!</span>`,
      params: '__instancecheck__(cls, instance) / __subclasscheck__(cls, subclass)'
    },
    {
      name: '__init_subclass__', tag: 'dunder', ver: '3.6',
      short: 'Hook yang dipanggil otomatis ketika sebuah class di-subclass.',
      desc: 'Classmethod yang dipanggil pada parent class setiap kali ada subclass baru. Menggantikan kebutuhan metaclass untuk banyak kasus. Keyword arguments dari deklarasi class diteruskan ke __init_subclass__. Sangat berguna untuk registrasi plugin, validasi class, dan framework OOP.',
      uses: ['Plugin registry','Class validation','Framework hook','Auto-register subclass'],
      syntax: `<span class="kw">class</span> <span class="cls">Plugin</span>:
    _registry = {}

    <span class="kw">def</span> <span class="fn">__init_subclass__</span>(cls, nama=<span class="bl">None</span>, **kwargs):
        <span class="fn">super</span>().__init_subclass__(**kwargs)
        <span class="kw">if</span> nama:
            <span class="cls">Plugin</span>._registry[nama] = cls
            <span class="fn">print</span>(<span class="st">f"Plugin '<span class="dc">{nama}</span>' terdaftar: <span class="dc">{cls}</span>"</span>)

<span class="kw">class</span> <span class="cls">PDF</span>(<span class="cls">Plugin</span>, nama=<span class="st">"pdf"</span>):   <span class="cm"># otomatis terdaftar!</span>
    <span class="kw">def</span> <span class="fn">render</span>(<span class="bl">self</span>): ...

<span class="kw">class</span> <span class="cls">HTML</span>(<span class="cls">Plugin</span>, nama=<span class="st">"html"</span>):
    <span class="kw">def</span> <span class="fn">render</span>(<span class="bl">self</span>): ...

<span class="fn">print</span>(<span class="cls">Plugin</span>._registry)
<span class="cm"># {'pdf': <class 'PDF'>, 'html': <class 'HTML'>}</span>

<span class="cm"># Validasi subclass:</span>
<span class="kw">class</span> <span class="cls">Abstract</span>:
    <span class="kw">def</span> <span class="fn">__init_subclass__</span>(cls, **kwargs):
        <span class="fn">super</span>().__init_subclass__(**kwargs)
        <span class="kw">if</span> <span class="kw">not</span> <span class="fn">hasattr</span>(cls, <span class="st">'execute'</span>):
            <span class="kw">raise</span> <span class="ex">TypeError</span>(<span class="st">f"{cls.__name__} harus implement execute()"</span>)`,
      params: '__init_subclass__(cls, **kwargs)  →  classmethod'
    },
    {
      name: '__class_getitem__', tag: 'dunder', ver: '3.7',
      short: 'Mendukung generic type syntax: MyClass[type] — tanpa metaclass.',
      desc: 'Classmethod yang dipanggil saat menggunakan syntax subscript pada class: <code>MyClass[int]</code>. Digunakan oleh list, dict, tuple, dll untuk mendukung <code>list[int]</code>, <code>dict[str, int]</code>. Sebelum Python 3.9, hanya <code>typing.List[int]</code> yang bisa. Implementasi sederhana bisa return <code>types.GenericAlias(cls, item)</code>.',
      uses: ['Generic types','Type hints','PEP 585','Custom container types'],
      syntax: `<span class="kw">import</span> types

<span class="kw">class</span> <span class="cls">Stack</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>):
        <span class="bl">self</span>._data = []

    <span class="kw">def</span> <span class="fn">push</span>(<span class="bl">self</span>, item): <span class="bl">self</span>._data.append(item)
    <span class="kw">def</span> <span class="fn">pop</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="bl">self</span>._data.pop()

    <span class="op">@</span><span class="fn">classmethod</span>
    <span class="kw">def</span> <span class="fn">__class_getitem__</span>(cls, item):
        <span class="kw">return</span> types.GenericAlias(cls, item)

<span class="cm"># Sekarang bisa digunakan sebagai generic type!</span>
<span class="fn">print</span>(<span class="cls">Stack</span>[<span class="cls">int</span>])       <span class="cm"># stack.Stack[int]</span>
<span class="fn">print</span>(<span class="cls">Stack</span>[<span class="cls">str</span>])       <span class="cm"># stack.Stack[str]</span>

<span class="cm"># Type hint yang valid:</span>
<span class="kw">def</span> <span class="fn">proses</span>(s: <span class="cls">Stack</span>[<span class="cls">int</span>]) -> <span class="bl">None</span>: ...

<span class="cm"># Built-in contoh (Python 3.9+):</span>
<span class="fn">print</span>(<span class="fn">list</span>[<span class="cls">int</span>])         <span class="cm"># list[int]  — via __class_getitem__</span>
<span class="fn">print</span>(<span class="fn">dict</span>[<span class="cls">str</span>, <span class="cls">int</span>])   <span class="cm"># dict[str, int]</span>`,
      params: '__class_getitem__(cls, item)  →  classmethod  (biasanya return GenericAlias)'
    },
    {
      name: '__set_name__', tag: 'dunder', ver: '3.6',
      short: 'Dipanggil saat descriptor di-assign ke atribut class — menyimpan nama atribut.',
      desc: 'Dipanggil oleh <code>type.__new__()</code> saat class dibuat. Diberitahu nama atribut class yang dipakai untuk menyimpan descriptor. Sangat penting agar descriptor bisa menyimpan nilai per-instance menggunakan nama atribut yang tepat, tanpa perlu string hardcode.',
      uses: ['Descriptor protocol','ORM field','Validation descriptor','Typed attribute'],
      syntax: `<span class="kw">class</span> <span class="cls">Validated</span>:
    <span class="cm">"""Descriptor dengan validasi — menggunakan __set_name__"""</span>
    <span class="kw">def</span> <span class="fn">__set_name__</span>(<span class="bl">self</span>, owner, name):
        <span class="cm"># Simpan nama atribut — dipanggil otomatis saat class dibuat</span>
        <span class="bl">self</span>.public_name  = name
        <span class="bl">self</span>.private_name = <span class="st">f"_validated_<span class="dc">{name}</span>"</span>

    <span class="kw">def</span> <span class="fn">__get__</span>(<span class="bl">self</span>, obj, objtype=<span class="bl">None</span>):
        <span class="kw">if</span> obj <span class="kw">is</span> <span class="bl">None</span>: <span class="kw">return</span> <span class="bl">self</span>
        <span class="kw">return</span> <span class="fn">getattr</span>(obj, <span class="bl">self</span>.private_name, <span class="bl">None</span>)

    <span class="kw">def</span> <span class="fn">__set__</span>(<span class="bl">self</span>, obj, value):
        <span class="kw">if</span> <span class="kw">not</span> <span class="fn">isinstance</span>(value, <span class="cls">str</span>):
            <span class="kw">raise</span> <span class="ex">TypeError</span>(<span class="st">f"<span class="dc">{self.public_name}</span> harus string"</span>)
        <span class="fn">setattr</span>(obj, <span class="bl">self</span>.private_name, value)

<span class="kw">class</span> <span class="cls">Person</span>:
    nama  = <span class="cls">Validated</span>()    <span class="cm"># __set_name__(Person, 'nama') otomatis!</span>
    email = <span class="cls">Validated</span>()    <span class="cm"># __set_name__(Person, 'email') otomatis!</span>

p = <span class="cls">Person</span>()
p.nama = <span class="st">"Budi"</span>       <span class="cm"># OK</span>
p.nama = <span class="nm">123</span>          <span class="cm"># TypeError: nama harus string</span>`,
      params: '__set_name__(self, owner, name)  →  owner=class, name=nama_atribut'
    },
    {
      name: '__annotations__', tag: 'dunder',
      short: 'Dict type annotations fungsi, class, atau modul — dipakai type checkers & runtime.',
      desc: 'Atribut dict yang menyimpan semua anotasi tipe (type hints) dari fungsi, class, atau modul. Digunakan oleh <code>typing.get_type_hints()</code>, <code>dataclasses</code>, <code>Pydantic</code>, <code>FastAPI</code>, dan tools lainnya untuk dependency injection dan validasi. Akses langsung via <code>func.__annotations__</code> tidak resolve forward references — gunakan <code>typing.get_type_hints()</code> untuk itu. Python 3.7+: <code>from __future__ import annotations</code> membuat semua anotasi menjadi lazy string (tidak dievaluasi saat definisi). Python 3.10 awalnya dijadwalkan membuat ini default, namun ditunda indefinitely.',
      uses: ['Type hints','Dataclass fields','Pydantic/FastAPI','Runtime type check','Dependency injection'],
      syntax: `<span class="cm"># Annotations pada fungsi</span>
<span class="kw">def</span> <span class="fn">sapa</span>(nama: <span class="cls">str</span>, umur: <span class="cls">int</span> = <span class="nm">0</span>) -> <span class="cls">str</span>:
    <span class="kw">return</span> <span class="st">f"Halo {nama}, {umur} tahun"</span>

<span class="fn">print</span>(sapa.__annotations__)
<span class="cm"># {'nama': str, 'umur': int, 'return': str}</span>

<span class="cm"># Annotations pada class</span>
<span class="kw">class</span> <span class="cls">User</span>:
    nama: <span class="cls">str</span>
    umur: <span class="cls">int</span> = <span class="nm">0</span>
    aktif: <span class="cls">bool</span> = <span class="bl">True</span>
<span class="fn">print</span>(<span class="cls">User</span>.__annotations__)   <span class="cm"># {'nama': str, 'umur': int, 'aktif': bool}</span>

<span class="cm"># typing.get_type_hints() — resolve forward references & extras</span>
<span class="kw">import</span> typing
hints = typing.<span class="fn">get_type_hints</span>(sapa)   <span class="cm"># lebih aman dari .__annotations__</span>

<span class="cm"># Dataclass otomatis baca __annotations__</span>
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="op">@</span>dataclass
<span class="kw">class</span> <span class="cls">Poin</span>:
    x: <span class="cls">float</span>
    y: <span class="cls">float</span>
    label: <span class="cls">str</span> = <span class="st">""</span>
<span class="cm"># Poin.__annotations__ == {'x': float, 'y': float, 'label': str}</span>

<span class="cm"># Python 3.7+ — lazy annotations (PEP 563, tersedia via __future__)</span>
<span class="kw">from</span> __future__ <span class="kw">import</span> annotations
<span class="kw">def</span> <span class="fn">f</span>(x: <span class="cls">MyClass</span>) -> <span class="cls">MyClass</span>: ...  <span class="cm"># string, tidak dievaluasi</span>`,
      params: 'obj.__annotations__  →  dict[str, type | str]  (PEP 526, 3.0+)'
    },
    {
      name: '__match_args__ (Python 3.10+)', tag: 'dunder', ver: '3.10',
      short: 'Mendukung positional pattern matching di match/case statement.',
      desc: 'Tuple string yang mendefinisikan urutan atribut untuk positional pattern matching (Python 3.10+, PEP 634). Saat menulis <code>case Poin(x, y)</code>, Python memetakan posisi ke nama atribut berdasarkan <code>__match_args__</code>. <code>@dataclass</code> otomatis membuat <code>__match_args__</code> dari urutan fields. Tanpa <code>__match_args__</code>, hanya keyword pattern yang bisa digunakan (<code>case Poin(x=0, y=0)</code>).',
      uses: ['Match/case','Pattern matching','Dataclass dispatch','Command parser','AST processing'],
      syntax: `<span class="cm"># Python 3.10+ — manual __match_args__</span>
<span class="kw">class</span> <span class="cls">Poin</span>:
    __match_args__ = (<span class="st">"x"</span>, <span class="st">"y"</span>)
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, x, y): <span class="bl">self</span>.x, <span class="bl">self</span>.y = x, y

<span class="kw">def</span> <span class="fn">klasifikasi</span>(p):
    <span class="kw">match</span> p:
        <span class="kw">case</span> <span class="cls">Poin</span>(<span class="nm">0</span>, <span class="nm">0</span>):       <span class="cm"># positional — pakai __match_args__</span>
            <span class="kw">return</span> <span class="st">"origin"</span>
        <span class="kw">case</span> <span class="cls">Poin</span>(<span class="nm">0</span>, y):
            <span class="kw">return</span> <span class="st">f"sumbu Y: {y}"</span>
        <span class="kw">case</span> <span class="cls">Poin</span>(x, <span class="nm">0</span>):
            <span class="kw">return</span> <span class="st">f"sumbu X: {x}"</span>
        <span class="kw">case</span> <span class="cls">Poin</span>(x, y) <span class="kw">if</span> x <span class="op">==</span> y:
            <span class="kw">return</span> <span class="st">f"diagonal: {x}"</span>
        <span class="kw">case</span> _:
            <span class="kw">return</span> <span class="st">"titik biasa"</span>

<span class="cm"># @dataclass otomatis buat __match_args__</span>
<span class="kw">from</span> dataclasses <span class="kw">import</span> dataclass
<span class="op">@</span>dataclass
<span class="kw">class</span> <span class="cls">Warna</span>:
    r: <span class="cls">int</span>; g: <span class="cls">int</span>; b: <span class="cls">int</span>
<span class="cm"># Warna.__match_args__ == ('r', 'g', 'b') otomatis!</span>

<span class="kw">match</span> <span class="cls">Warna</span>(<span class="nm">255</span>, <span class="nm">0</span>, <span class="nm">0</span>):
    <span class="kw">case</span> <span class="cls">Warna</span>(<span class="nm">255</span>, <span class="nm">0</span>, <span class="nm">0</span>): <span class="fn">print</span>(<span class="st">"Merah!"</span>)
    <span class="kw">case</span> <span class="cls">Warna</span>(<span class="nm">0</span>, <span class="nm">255</span>, <span class="nm">0</span>): <span class="fn">print</span>(<span class="st">"Hijau!"</span>)`,
      params: '__match_args__ = (attr1, attr2, ...)  →  tuple[str, ...]  (Python 3.10+, PEP 634)'
    },
    {
      name: '__lshift__ / __rshift__ / __and__ / __xor__ / __or__', tag: 'dunder',
      short: 'Overloading operator bitwise: <<, >>, &, ^, | (dan versi in-place/reflected).',
      desc: 'Mendefinisikan perilaku operator bitwise. Setiap operator punya versi <strong>reflected</strong> (r-prefix: __rlshift__, __rrshift__, __rand__, __rxor__, __ror__) dan <strong>in-place</strong> (i-prefix: __ilshift__, __irshift__, __iand__, __ixor__, __ior__). <strong>Python 3.9+</strong>: <code>dict.__or__</code> dan <code>dict.__ior__</code> digunakan untuk merge dict (<code>d1 | d2</code>, <code>d1 |= d2</code>).',
      uses: ['Bitmask/flags','Dict merge (3.9+)','Custom set-like','Pipeline DSL','Bit manipulation'],
      syntax: `<span class="cm"># Contoh: Permission flags dengan operator bitwise</span>
<span class="kw">class</span> <span class="cls">Permission</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, bits): <span class="bl">self</span>.bits = bits
    <span class="kw">def</span> <span class="fn">__or__</span>(<span class="bl">self</span>, o):      <span class="cm"># self | other</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="bl">self</span>.bits | o.bits)
    <span class="kw">def</span> <span class="fn">__and__</span>(<span class="bl">self</span>, o):     <span class="cm"># self & other</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="bl">self</span>.bits & o.bits)
    <span class="kw">def</span> <span class="fn">__xor__</span>(<span class="bl">self</span>, o):     <span class="cm"># self ^ other (toggle)</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="bl">self</span>.bits ^ o.bits)
    <span class="kw">def</span> <span class="fn">__lshift__</span>(<span class="bl">self</span>, n):  <span class="cm"># self << n</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="bl">self</span>.bits <span class="op"><<</span> n)
    <span class="kw">def</span> <span class="fn">__rshift__</span>(<span class="bl">self</span>, n):  <span class="cm"># self >> n</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="bl">self</span>.bits <span class="op">>></span> n)
    <span class="kw">def</span> <span class="fn">__invert__</span>(<span class="bl">self</span>):     <span class="cm"># ~self (bitwise NOT, 3-bit mask)</span>
        <span class="kw">return</span> <span class="cls">Permission</span>(<span class="op">~</span><span class="bl">self</span>.bits <span class="op">&</span> <span class="nm">0b111</span>)
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>):
        <span class="kw">return</span> <span class="st">f"Perm({self.bits:08b})"</span>

READ  = <span class="cls">Permission</span>(<span class="nm">0b001</span>)
WRITE = <span class="cls">Permission</span>(<span class="nm">0b010</span>)
EXEC  = <span class="cls">Permission</span>(<span class="nm">0b100</span>)
RWX = READ | WRITE | EXEC   <span class="cm"># Perm(00000111)</span>
RW  = RWX & ~EXEC           <span class="cm"># Perm(00000011) — tanpa EXEC</span>

<span class="cm"># Python 3.9+: dict merge via __or__ / __ior__</span>
d1 = {<span class="st">"a"</span>: <span class="nm">1</span>, <span class="st">"b"</span>: <span class="nm">2</span>}
d2 = {<span class="st">"b"</span>: <span class="nm">99</span>, <span class="st">"c"</span>: <span class="nm">3</span>}
merged = d1 | d2          <span class="cm"># {'a': 1, 'b': 99, 'c': 3}</span>
d1 |= d2                  <span class="cm"># in-place merge (d2 override d1)</span>`,
      params: '__lshift__(n) / __rshift__(n) / __and__(o) / __xor__(o) / __or__(o)  +  r/i variants'
    },
    {
      name: '__truediv__ / __floordiv__ / __mod__ / __divmod__', tag: 'dunder',
      short: 'Overloading operator pembagian: /, //, %, dan divmod().',
      desc: 'Melengkapi operator aritmatika. <strong>__truediv__</strong>: operator <code>/</code> (selalu float). <strong>__floordiv__</strong>: operator <code>//</code> (integer division, pembulatan ke bawah). <strong>__mod__</strong>: operator <code>%</code> (modulo/sisa bagi). <strong>__divmod__</strong>: dipanggil oleh <code>divmod()</code> — harus mengembalikan tuple <code>(quotient, remainder)</code>. Semua punya versi <strong>r-prefix</strong> (reflected: __rtruediv__, dll) dan <strong>i-prefix</strong> (in-place: __itruediv__, dll).',
      uses: ['Custom numeric type','Unit type division','Modular arithmetic','Fixed-point math'],
      syntax: `<span class="kw">class</span> <span class="cls">Meter</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, v): <span class="bl">self</span>.v = v
    <span class="kw">def</span> <span class="fn">__truediv__</span>(<span class="bl">self</span>, n):    <span class="cm"># self / n</span>
        <span class="kw">return</span> <span class="cls">Meter</span>(<span class="bl">self</span>.v / n)
    <span class="kw">def</span> <span class="fn">__floordiv__</span>(<span class="bl">self</span>, n):   <span class="cm"># self // n</span>
        <span class="kw">return</span> <span class="cls">Meter</span>(<span class="bl">self</span>.v // n)
    <span class="kw">def</span> <span class="fn">__mod__</span>(<span class="bl">self</span>, n):         <span class="cm"># self % n</span>
        <span class="kw">return</span> <span class="cls">Meter</span>(<span class="bl">self</span>.v <span class="op">%</span> n)
    <span class="kw">def</span> <span class="fn">__divmod__</span>(<span class="bl">self</span>, n):     <span class="cm"># divmod(self, n)</span>
        q, r = <span class="fn">divmod</span>(<span class="bl">self</span>.v, n)
        <span class="kw">return</span> <span class="cls">Meter</span>(q), <span class="cls">Meter</span>(r)   <span class="cm"># harus return tuple!</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">f"{self.v}m"</span>

m = <span class="cls">Meter</span>(<span class="nm">10</span>)
m / <span class="nm">3</span>           <span class="cm"># 3.333...m  — __truediv__</span>
m // <span class="nm">3</span>          <span class="cm"># 3m         — __floordiv__</span>
m <span class="op">%</span> <span class="nm">3</span>           <span class="cm"># 1m         — __mod__</span>
<span class="fn">divmod</span>(m, <span class="nm">3</span>)    <span class="cm"># (3m, 1m)   — __divmod__</span>

<span class="cm"># Reflected: jika 10 / Meter(3) dipanggil</span>
<span class="cm"># Python akan coba float.__truediv__(10, m) dulu</span>
<span class="cm"># Jika NotImplemented, panggil m.__rtruediv__(10)</span>`,
      params: '__truediv__ / __floordiv__ / __mod__ / __divmod__  (+  __r*__ reflected, __i*__ in-place)'
    },
    {
      name: '__pow__', tag: 'dunder',
      short: 'Overloading operator pangkat ** dan pow() tiga argumen.',
      desc: '__pow__ dipanggil untuk <code>x ** y</code> dan <code>pow(x, y)</code>. Versi tiga argumen <code>pow(x, y, mod)</code> memanggil <code>__pow__(y, mod)</code> — sangat berguna untuk implementasi modular exponentiation (kriptografi). Seperti operator lain punya __rpow__ (reflected) dan __ipow__ (in-place: **=).',
      uses: ['Custom numeric type','Kriptografi RSA','Modular arithmetic','Unit pangkat'],
      syntax: `<span class="kw">class</span> <span class="cls">BigNum</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, v): <span class="bl">self</span>.v = v
    <span class="kw">def</span> <span class="fn">__pow__</span>(<span class="bl">self</span>, exp, mod=<span class="bl">None</span>):   <span class="cm"># x**exp atau pow(x,exp,mod)</span>
        <span class="kw">if</span> mod <span class="kw">is not</span> <span class="bl">None</span>:
            <span class="kw">return</span> <span class="cls">BigNum</span>(<span class="fn">pow</span>(<span class="bl">self</span>.v, exp, mod))   <span class="cm"># modular exp</span>
        <span class="kw">return</span> <span class="cls">BigNum</span>(<span class="bl">self</span>.v <span class="op">**</span> exp)
    <span class="kw">def</span> <span class="fn">__ipow__</span>(<span class="bl">self</span>, exp):              <span class="cm"># x **= exp</span>
        <span class="bl">self</span>.v <span class="op">**=</span> exp; <span class="kw">return</span> <span class="bl">self</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">f"BigNum({self.v})"</span>

x = <span class="cls">BigNum</span>(<span class="nm">2</span>)
x <span class="op">**</span> <span class="nm">10</span>            <span class="cm"># BigNum(1024)     — __pow__</span>
<span class="fn">pow</span>(x, <span class="nm">10</span>, <span class="nm">1000</span>)   <span class="cm"># BigNum(24)       — __pow__(10, 1000)</span>
x <span class="op">**=</span> <span class="nm">3</span>            <span class="cm"># BigNum(8)        — __ipow__</span>

<span class="cm"># RSA-style modular exponentiation:</span>
base, exp, mod = <span class="nm">3</span>, <span class="nm">1000000</span>, <span class="nm">97</span>
<span class="fn">pow</span>(base, exp, mod)   <span class="cm"># sangat efisien untuk eksponen besar</span>`,
      params: '__pow__(self, exp, mod=None) / __rpow__(self, base) / __ipow__(self, exp)'
    },
    {
      name: '__lt__ / __le__ / __gt__ / __ge__ (via @total_ordering)', tag: 'dunder',
      short: 'Operator perbandingan — cukup definisikan __eq__ + satu lagi dengan @total_ordering.',
      desc: 'Mendefinisikan semua 6 operator perbandingan secara manual adalah repetitif. Decorator <code>@functools.total_ordering</code> memungkinkan cukup definisikan <code>__eq__</code> dan satu dari <code>__lt__/__le__/__gt__/__ge__</code> — sisanya dibuat otomatis. Catatan: versi yang di-generate via total_ordering sedikit lebih lambat dari yang manual.',
      uses: ['Sortable objects','Priority queue','Domain comparison','@total_ordering shortcut'],
      syntax: `<span class="kw">from</span> functools <span class="kw">import</span> total_ordering

<span class="op">@</span>total_ordering
<span class="kw">class</span> <span class="cls">Versi</span>:
    <span class="kw">def</span> <span class="fn">__init__</span>(<span class="bl">self</span>, major, minor, patch):
        <span class="bl">self</span>.v = (major, minor, patch)
    <span class="kw">def</span> <span class="fn">__eq__</span>(<span class="bl">self</span>, o):
        <span class="kw">return</span> <span class="fn">isinstance</span>(o, <span class="cls">Versi</span>) <span class="kw">and</span> <span class="bl">self</span>.v <span class="op">==</span> o.v
    <span class="kw">def</span> <span class="fn">__lt__</span>(<span class="bl">self</span>, o):
        <span class="kw">return</span> <span class="bl">self</span>.v <span class="op"><</span> o.v
    <span class="cm"># @total_ordering otomatis buat: >, >=, <=</span>
    <span class="kw">def</span> <span class="fn">__repr__</span>(<span class="bl">self</span>): <span class="kw">return</span> <span class="st">f"{'.'.join(map(str, self.v))}"</span>

v1 = <span class="cls">Versi</span>(<span class="nm">1</span>, <span class="nm">0</span>, <span class="nm">0</span>)
v2 = <span class="cls">Versi</span>(<span class="nm">2</span>, <span class="nm">1</span>, <span class="nm">0</span>)
v1 <span class="op"><</span> v2            <span class="cm"># True</span>
v2 <span class="op">></span> v1            <span class="cm"># True  — otomatis dari @total_ordering</span>
<span class="fn">sorted</span>([v2, v1])   <span class="cm"># [1.0.0, 2.1.0]</span>
<span class="fn">max</span>([v1, v2])      <span class="cm"># 2.1.0</span>`,
      params: '__lt__(self,o) / __le__(self,o) / __gt__(self,o) / __ge__(self,o)  +  @total_ordering'
    },
  ]
},
];