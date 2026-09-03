/**
 * 33 Bayang Anwar Ibrahim — Three-Axis Shadow Analysis
 * Axis 1: Sosiopolitik (01-11)
 * Axis 2: Ekonomi (12-22)
 * Axis 3: Peribadi (23-33)
 * Sumber: Wikipedia, The Edge, Al Jazeera, CNA, MOF, BERSIH, PETRONAS, LinkedIn, CNN, Federal Court.
 * DITEMPA BUKAN DIBERI.
 */

export type ShadowAxis = "sosiopolitik" | "ekonomi" | "peribadi";
export type ShadowDepth = "persona" | "bayang" | "tragis";

export interface Shadow {
  id: number;
  axis: ShadowAxis;
  depth: ShadowDepth;
  title: string;      // catchy short name
  body: string;       // full analysis text
  source: string;     // inline citation
}

export const ANWAR_SHADOWS: Shadow[] = [
  // ══════════════════════════════════════════════════════════════
  // AXIS 1 — SOSIOPOLITIK
  // ══════════════════════════════════════════════════════════════
  {
    id: 1,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Acah Baling — Mitos Pengasasan",
    body: "1974. Anwar berbaring di Baling, solidariti dengan penoreh getah yang didakwa kelaparan. Gambar itu jadi mitos pengasasan reformasi Malaysia. Fakta yang kemudian didedahkan: laporan kelaparan yang mencetuskan protes itu dibuktikan palsu. Yang terbenar — penoreh getah memang susah, tetapi naskhah naratif yang Anwar pilih adalah laporan palsu. Dan yang paling penting: bapa Anwar, Ibrahim Abdul Rahman, adalah ahli Parlimen UMNO Seberang Tengah 1959–1964, parliamentary secretary Kementerian Kesihatan. Mak Che Yan, ketua UMNO Wanita Bahagian. Ini bukan anak petani — ini anak istana politik. Sesiapa yang percaya Anwar 'dari bawah' telah menerima persona yang dipasang sejak Baling. Dan persona itu berumur 52 tahun.",
    source: "Wikipedia — Baling starvation report later demonstrated false. Ibrahim Abdul Rahman MP 1959-1964."
  },
  {
    id: 2,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "ABIM Bukan Gerakan — Ia Tangga",
    body: "1971, Anwar co-found ABIM — pergerakan belia Islam yang menentang establishment sekular. Pada 1982, dia masuk UMNO — parti yang pernah menjadi musuh demonstrasi gerakan itu. Anwar sendiri menggambarkannya sebagai kerana UMNO telah menjanjikan program islamisasi di bawah Mahathir. Hakikatnya, ABIM tidak pernah menjadi gerakan — ia adalah CV. Setiap organisasi yang diasaskannya sejak Kebangsaan Pelajar Muslim hingga MBM dan ABIM menjadi addendum untuk jawatan. Gerakan Islam menjadi bahan dagangan. Kerusi Permatang Pauh yang dimenanginya pada 1982 dicipta dari pewarisan kerusi Seberang Tengah yang diwakili oleh bapanya..",
    source: "Wikipedia — joined UMNO 1982; Permatang Pauh created from father's constituency."
  },
  {
    id: 3,
    axis: "sosiopolitik",
    depth: "tragis",
    title: "40 Tahun Dalam Satu Bilik",
    body: "MP 1982. PM 2022. Empat dekad. Tiada siapa dalam sejarah Malaysia mengumpul sebanyak ini jawatan — Kebudayaan, Pertanian, Pendidikan, Kewangan, Timbalan PM dua kali, Ketua Pembangkang, PM. Dan kerana pengumpulan itu sendiri — setiap jawatan meninggalkan parut. Setiap parut menuntut konsistensi yang diperlukan. Empat puluh tahun akumulasi bayang. Lelaki lain mengumpul wang atau tanah; Anwar mengumpul gelaran. Gelaran yang perlu dilindungi adalah gelaran yang terus membeli kegelapan.",
    source: "Wikipedia — Ministerial portfolios 1982–1998, Opposition Leader, PM 2022."
  },
  {
    id: 4,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Semua Musuh, UMNO Kekal",
    body: "PAS pernah kawan, kini musuh. DAP pernah kawan, kini musuh. UMNO 1982–1998: kawan lama. UMNO 2022–sekarang: kawan baru. Konsistensi sebenar dalam karier Anwar bukan reformasi — ia adalah UMNO. Parti yang paling banyak berubah di sisi Anwar adalah semua parti lain. DAP: cina. PAS: mudah lupa. UMNO: kekal kerana ia yang paling diperlukan. Jung menyebut ini projeksi: dunia kelihatan berubah kerana Anwar melihat bayang dirinya sendiri pada semua pihak, kecuali UMNO yang paling menyerupai dirinya yang tersembunyi..",
    source: "Rekod PH-BN unity government 2022-sekarang; Zahid DNAA."
  },
  {
    id: 5,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "DNAA Zahid — Sewa Politik",
    body: "Zahid Hamidi. Orang yang menyebarkan buku 50 Dalil terhadap Anwar pada 1998. Kini menjadi Timbalan Perdana Menteri. 47 tuduhan rasuah dilepaskan dengan Discharge Not Amounting To Acquittal (DNAA) pada September 2023 — selepas Anwar menjadi PM. Anwar berkata: 'Saya tidak mengarah Peguam Negara.' Tetapi PM yang mengawal peguam negara. Peguam negara yang menutup kes Zahid. Undang-undang tidak hilang dari negara — ia pergi ke peti ibu bapa Zahid.",
    source: "The Edge Malaysia 8 September 2023; CNA — Nurul Izzah adviser role."
  },
  {
    id: 6,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Najib Dipotong, Yang Kecil Disenyap",
    body: "Februari 2024: hukuman Najib dipotong separuh atas 1MDB — RM4.2 bilion. Aktivis BERSIH memprotes reformasi yang perlahan. Siasatan terhadap MACC didakwa terganggu. Kes-kes rasuah UMNO ditutup satu demi satu. Anwar masih memakai baju anti-rasuah di hadapan kamera. Bayang: lelaki yang dijemput sebagai wira oleh orang yang kemudian kecewa. Wira menjadi penunggang. Setiap kekecewaan itu memasukkan satu bayang lagi ke dalam bilik yang terkunci..",
    source: "Al Jazeera Feb 2024; BERSIH; Bloomberg Feb 2026 re MACC."
  },
  {
    id: 7,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Shadow Cabinet",
    body: "Di belakang PM tidak ada satu individu — ada shadow cabinet yang menentukan apa yang dilindungi, apa yang dilepaskan. Nurul Izzah (sehingga 2026), Rafizi Ramli, Fadillah Yusof, Saifuddin Nasution — setiap satu mempunyai agenda sendiri. Anwar kelihatan memerintah, tetapi tangan yang paling kuat sering tidak kelihatan. Ia bukan bayang seorang — ia adalah birokrasi bayang yang mengawal PM dengan informasi yang hanya dimiliki oleh mereka..",
    source: "Umum — cabinet composition 2022-sekarang."
  },
  {
    id: 8,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Akta Keselamatan Negara — Mulut Satu, Akta Lain",
    body: "Oktober 2023: Parlimen meluluskan akta di bawah Anwar yang memberi PM kuasa untuk menutup perbicaraan atas alasan keselamatan negara. Akta yang sama PM yang pernah menentang ISA. Yang sama PM yang menjanjikan reformasi. Di mana reformasi itu terukir dalam undang-undang? Di atas meja Anwar sendiri — sebagai alat untuk menutup lubang yang mungkin terbuka jika siasatan berterusan. Akta keselamatan bukan untuk negara — ia untuk vault peribadi PM.",
    source: "BERSIH 2023 statements; Akta Advokat coverage."
  },
  {
    id: 9,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "Subsidi Dimansuh, Cukai Diperluas",
    body: "SST diperluas 5–10% ke barangan baharu Julai 2025. Subsidi diesel dimansuh untuk Semenanjung — dijangka jimat RM4 bilion. Hutang negara RM1.3 trilion. Yang membayar: rakyat biasa. Yang mendapat projek: elit korporat. Anwar tidak mengambil gaji PM — dan itu adalah pengorbanan yang dirancang untuk melupakan hakikat bahawa rakyat sedang membayar lebih untuk melupakannya.",
    source: "MOF Julai 2025 SST; diesel subsidy reform."
  },
  {
    id: 10,
    axis: "sosiopolitik",
    depth: "bayang",
    title: "LGBT — Setengah Kondem, Setengah Tutup",
    body: "CNN 2023: Anwar berkata LGBTQ tidak akan diiktiraf. Namun dia juga mencadangkan undang-undang sodomi diteliti semula. Kenapa? Kerana undang-undang sodomi itu sendiri mungkin mengancam dirinya — dan mengkaji semula boleh membuka pintu yang akan memusnahkan Persona Imam. Seorang yang mungkin tertekan oleh undang-undang yang sama menggunakan kekerasan undang-undang itu untuk terus berkuasa. Bayang terhadap bayang itu sendiri.",
    source: "CNN interview 2023; sodomy laws Malaysia."
  },
  {
    id: 11,
    axis: "sosiopolitik",
    depth: "persona",
    title: "Legacy Kosong",
    body: "Tengku: Merdeka. Razak: DEB. Mahathir: mega korporat. Najib: 1MDB. Muhyiddin: COVID. Ismail: nothing. Anwar: 'Aku tidak mengambil gaji.' Legasi itu bukan undang-undang, bukan jambatan, bukan reformasi yang terukir. Ia adalah ketiadaan — satu pejabat yang kelihatan penuh tetapi sebenarnya hanya mengisi kerusi.",
    source: "Rekod KDNAn 2022-sekarang."
  },

  // ══════════════════════════════════════════════════════════════
  // AXIS 2 — EKONOMI
  // ══════════════════════════════════════════════════════════════
  {
    id: 12,
    axis: "ekonomi",
    depth: "bayang",
    title: "No Bailout — Untuk Siapa?",
    body: "1997: 'There is no question of any bailout.' 2024: prinsip itu masih hidup — tetapi hanya untuk syarikat yang tidak memerlukan Anwar. Dividen Petronas tetap mengalir masuk bajet (RM20 bilion) walaupun profit turun 17.6%. Bila rakyat meminta bantuan? Bila syarikat kecil? Di mana pemisahan antara bailout korporat dan subsidi rakyat?",
    source: "Wikipedia — Anwar quoted: bailout statement 1997."
  },
  {
    id: 13,
    axis: "ekonomi",
    depth: "bayang",
    title: "Petronas Jadi ATM",
    body: "FY2025: profit RM45.4 bilion (turun 17.6%). Dividen RM20 bilion tetap dibayar kepada kerajaan. Petronas bukan lagi syarikat minyak — ia adalah mesin ATM yang sentiasa dipam. Sebab itu Taufik terus kekal — bukan kerana dia memahami minyak, tetapi kerana dia memahami arah aliran wang. Wang yang mengalir dari telaga ke Putrajaya lebih penting dari wang yang mengalir ke rakyat Sarawak.",
    source: "PETRONAS Annual Report FY2025; Edge Malaysia Ogos 2026."
  },
  {
    id: 14,
    axis: "ekonomi",
    depth: "bayang",
    title: "IMF Boy yang Kalah 1998",
    body: "Mahathir: kawalan modal. Anwar: pasaran bebas, IMF. Anwar kalah. Mahathir kekal. Kemudian Mahathir mengambil alih kawalan modal yang sebelum itu diperjuangkan oleh Anwar. Hakikat negara bertahan dengan kawalan modal Mahathir, bukan dengan IMF Anwar. Tetapi SST 2025 masih ikut buku IMF yang sama. Anwar tidak pernah belajar dari kekalahan — dia hanya menunggu untuk menerapkan kegagalan yang sama dengan nama baharu.",
    source: "Wikipedia — Anwar free-market approach; Malaysia capital controls 1998."
  },
  {
    id: 15,
    axis: "ekonomi",
    depth: "tragis",
    title: "PTPTN — Janji Tak Tepati",
    body: "Sebelum PRU: hapus PTPTN. Lepas menang: PTPTN kekal, hutang pelajar kekal. Hakikat: PTPTN bukan masalah — ia adalah mekanisme penguncian. Pelajar yang berhutang tidak boleh memberontak. Yang boleh berhutang lebih lama adalah yang paling patuh.",
    source: "PTPTN promises vs reality."
  },
  {
    id: 16,
    axis: "ekonomi",
    depth: "bayang",
    title: "Gas Sarawak Ditawarkan Pada Siapa?",
    body: "GAS Sarawak — 60% simpanan negara — sedang berdepan dengan Petros-Petronas. Apa jawapan Anwar? Taufik kekal di KLCC. Tiada negotiation sebenar berlaku. Petronas sibuk dengan形象, bukan gas. Anwar sibuk dengan F1, bukan gas. Gas Sarawak tinggal dalam limbo — antara perjanjian yang tidak wujud dan rundingan yang tidak pernah berlaku.",
    source: "PETROS-PETRONAS dispute; gas aggregation."
  },
  {
    id: 17,
    axis: "ekonomi",
    depth: "bayang",
    title: "Energy Asia & F1 — Untuk Siapa?",
    body: "Projek mega: Energy Asia, F1. Besar. Gempak. Untuk penonton antarabangsa. Berapa juta ringgit peruntukan? Berapa yang masuk ke poket rakyat biasa? Berapa yang membuat Anwar nampak hebat dari luar tetapi rakyat bawah tidak merasai apa-apa? Kos: disorok di belakang. Manfaat: dilihat di hadapan. Itu bukan ekonomi — itu teater.",
    source: "Energy Asia 2025; F1 return bid."
  },
  {
    id: 18,
    axis: "ekonomi",
    depth: "bayang",
    title: "Privat yang Belum Terdedah",
    body: "Setiap ringgit yang ditarik dari rakyat melalui reformasi — ada perjanjian yang berlaku di belakang pintu. Genting, Forest City, data center. Tiada tender terbuka yang boleh diakses oleh rakyat. Tiada kesan audit. Kerajaan Madani sepatutnya transparen — tetapi lembaran imbangan transparen itu mempunyai harga, dan harga itu bukan RM0.",
    source: "Umum — procurement concerns PH-BN unity govt."
  },
  {
    id: 19,
    axis: "ekonomi",
    depth: "tragis",
    title: "RM1.3 Trilion — Yang Bayar Bukan Anwar",
    body: "Hutang negara RM1.3 trilion. Anwar tidak mengambil gaji PM. Pengorbanan itu diumumkan kepada dunia — tetapi rakyat yang mengambil PTPTN tidak pernah mendapat berita yang sama. Rakyat yang membayar SST lebih banyak tidak pernah dijemput ke sidang akhbar. Yang bayar hutang negara adalah pekerja bergaji rendah yang membeli barangan bercukai. Yang tidak bayar: PM sendiri.",
    source: "MOF Malaysia debt figures 2025-2026."
  },
  {
    id: 20,
    axis: "ekonomi",
    depth: "bayang",
    title: "George Soros — Kambing Hitam",
    body: "1997: Mahathir tuduh Soros. Hakikat: krisis berpunca dari sistem kroni yang Mahathir dan Anwar sendiri bina. Tetapi Soros jadi kambing hitam kerana: sebut Soros mudah, sebut kroni bahaya. Anwar tidak sanggup membetulkan naratif kerana sebut kroni bermakna sebut kroni MAHATHIR — dan kroni Anwar sendiri. Maka lembu menjadi PM semula kerana krisis.",
    source: "1997 crisis; Anwar vs Mahathir policy debate."
  },
  {
    id: 21,
    axis: "ekonomi",
    depth: "bayang",
    title: "Perwaja — Lubang Yang Tak Pernah Ditutup",
    body: "Perwaja Steel — mega projek yang rugi berbilion. Kroni parti pegang. Hakikat ini kekal: setiap mega projek era Anwar/Mahathir ada 'design' untuk pihak tertentu. Nama berubah — Perwaja menjadi X, Y, Z. Intinya sama. Anwar pernah jadi Menteri Kewangan yang menutup lubang ini — tetapi tidak pernah menyebut siapa yang memulakannya.",
    source: "Umum — Perwaja Steel scandal 1980s-90s."
  },
  {
    id: 22,
    axis: "ekonomi",
    depth: "bayang",
    title: "Ringgit Tak Pernah Naik",
    body: "Setiap kali Anwar naik pentas — ringgit tidak naik. Pasaran melihatnya sebagai one-man show. Keyakinan memerlukan institusi, bukan individu. Anwar masih ingat ringgit turun kerana 'pihak tertentu' sabotaj. Realiti: ringgit turun kerana keyakinan yang mengecil — dan keyakinan itu sendiri berpunca dari ketiadaan reformasi institusi yang nyata.",
    source: "Ringgit 2023-2026; foreign investment data."
  },

  // ══════════════════════════════════════════════════════════════
  // AXIS 3 — PERIBADI
  // ══════════════════════════════════════════════════════════════
  {
    id: 23,
    axis: "peribadi",
    depth: "bayang",
    title: "Persona Imam — Jung's Law",
    body: "ABIM moralist. Pemimpin Islam. Suami setia 46 tahun. Persona bukan sekadar baik — dia asketik. Hukum Jung: makin suci persona, makin hitam bayang. Lelaki yang boleh cakap 'aku ada nafsu, aku manusia' tidak perlukan persona sebersih itu. Persona sebersih itu hanya diperlukan oleh psyche yang ada benda nak sorok — sama ada benda itu desire, atau keperluan untuk terus menjadi mangsa.",
    source: "Umum — public persona; Jung 'Man and His Symbols.'"
  },
  {
    id: 24,
    axis: "peribadi",
    depth: "bayang",
    title: "Tilam, Saiful, Munawar — Tiga Tuduhan, Satu Jawapan",
    body: "1998: tilam DNA 10/13 sepadan. Anwar kata tilam bukan dia punya. 2008: Saiful Bukhari. Court lepas 2012 (DNA compromised). Appeal flip 2014, Federal Court 2015. Munawar Anees — speechwriter confess, tarik balik dengan dakwaan dipukul. Dalam dunia di mana setiap tuduhan datang dengan pembungkusan politik — kebenaran dan dusta tidak boleh dibezakan. Kalau innocent: mangsa sebenar. Kalau tidak: lelaki paling bertuah dalam sejarah — sebab setiap tuduhan datang dalam bungkusan yang boleh dismis.",
    source: "Wikipedia — sodomy trials; tilam DNA; Munawar; Saiful."
  },
  {
    id: 25,
    axis: "peribadi",
    depth: "bayang",
    title: "Dua Puluh Tahun, Satu Ayat",
    body: "Tiada sekali pun: 'Aku lemah.' Tiada sekali pun: 'Aku ada kegelapan.' Hanya: 'Konspirasi.' Monolith denial bukan tanda innocence — ia tanda psyche yang tidak pernah membuka pintu bilik sorok pun sedikit. Sebab satu pintu terbuka, sembilan puluh sembilan bilik lain bertanya. Dan Anwar tidak sanggup menjawab satu pun.",
    source: "Rekod kenyataan awam 1998-2026 — tiada pengakuan kelemahan."
  },
  {
    id: 26,
    axis: "peribadi",
    depth: "tragis",
    title: "Syaitan yang Ingat Dirinya Malaikat",
    body: "Bayang mangsa: lelaki yang melihat setiap kritikan sebagai serangan, setiap kekalahan sebagai penganiayaan, setiap tentangan sebagai fitnah. Yang buat pariah paling membahayakan: dia percaya dirinya sebagai mangsa. Kalau kau mangsa, kau tidak perlu berubah. Kalau mangsa tidak berubah, mangsa tidak belajar. Kalau tidak belajar, 30 tahun menunggu adalah 30 tahun mengulang.",
    source: "Rekod sidang media — konsisten framing mangsa."
  },
  {
    id: 27,
    axis: "peribadi",
    depth: "bayang",
    title: "Black Eye — Saint Dari Keganasan",
    body: "1998: Inspector General Abdul Rahim Mohd Noor pukul Anwar dalam custody. Mata lebam jadi simbol nasional. Rahim dipenjara 2 bulan, maaf, bayar ganti rugi. Itu keganasan negara yang nyata. Tetapi black eye menjadikan Anwar saint. Dan kerana saint — bayang makin gelap. Lelaki yang dikatakan kena pukul itu kini menggunakan akta keselamatan negara untuk menutup perbicaraan lain. Sakit satu menjadi sebab untuk memberi sakit dua — atas nama 'safety' yang sama.",
    source: "Wikipedia — Abdul Rahim Mohd Noor convicted."
  },
  {
    id: 28,
    axis: "peribadi",
    depth: "persona",
    title: "Acheh Memang Jiwa — Pentas Sejak MCKK",
    body: "MCKK — sekolah elite Melayu. Tiga pelajar dari Pulau Pinang terpilih. Anwar wakil sekolah dalam pertandingan debat dan oratory. Sejak umur 15, realiti adalah pentas. Semua yang dilakukan kemudian — dari ceramah Reformasi hingga 'tak ambil gaji PM' — adalah staged. Sebab itu hang kata acah memang jiwa dia — kerana pentas yang dia nampak adalah realiti yang dia percaya. Tiada bilik di belakang pentas. Ada bilik — tetapi orang yang terberada bukan dirinya.",
    source: "Wikipedia — MCKK debate, oratory."
  },
  {
    id: 29,
    axis: "peribadi",
    depth: "tragis",
    title: "Nurul Izzah — Puteri Reformis Menjadi Bayang",
    body: "Nurul Izzah Anwar — MP Permatang Pauh, Naib Presiden PKR, penasihat ekonomi kanan PM (bapa sendiri). Lepas itu: stepped down atas tekanan. 2026: on leave. Kerabat tidak boleh mengekalkan dua jawatan besar — nepotism terlalu jelas. Seorang bapa yang tidak menjumpai dirinya sendiri tidak boleh memberi puterinya peluang untuk menjadi diri sendiri.",
    source: "CNA — Nurul Izzah steps down; PKR leave 2026."
  },
  {
    id: 30,
    axis: "peribadi",
    depth: "bayang",
    title: "Wan Azizah — Isteri Bukan Kekasih, Pegawai Operasi",
    body: "Wan Azizah memegang kerusi Permatang Pauh 20 tahun. Wan Azizah menjadi TPM 2018–2020. Wan Azizah yang memadamkan api setiap kali tercetus bencana. Hubungan itu bukan pernikahan biasa — ia partnership strategi. Azizah tahu rahsia — semua 33 bayang ini — dan rahsia itu senjata, bukan vulnerability. Sebab itu hubungan mereka tidak pernah bergelora di khalayak — rahsia terlalu berat untuk diperjudikan.",
    source: "Umum — Wan Azizah DPM 2018-2020."
  },
  {
    id: 31,
    axis: "peribadi",
    depth: "bayang",
    title: "Siapa Sebenarnya Anwar Ibrahim?",
    body: "Cabaran dua soalan: 'Siapa kau?' dan 'Siapa kau nak jadi?' — kedua-duanya tidak dijawab. Yang dijawab: 'Reformasi.' Sebab itu bila seseorang berkata Anwar terlalu 'akal' — itu pujian berbisa. Akal dalam konteks Anwar bukan kebijaksanaan — ia personal branding strategy. Dia selesa dengan apa sahaja yang boleh dijual, asalkan dijual dengan baik. Yang tidak boleh dijual: diri sendiri. Sebab dia mungkin tidak kenal apa itu.",
    source: "Umum — every speech = branded product."
  },
  {
    id: 32,
    axis: "peribadi",
    depth: "tragis",
    title: "99 Bilik Terkunci — Harga BANGANG",
    body: "Ini jawapan kepada soalan terbesar. Bayang setiap bilik yang terkunci memerlukan maintenance. Setiap maintenance memerlukan tenaga. Setiap tenaga yang habis menjaga vault — tenaga itu tiada untuk negara. RM7.5 bilion 'secara lisan' — bocor kerana dia tidak sanggup menulis kertas (kertas = lubang). Zahid kekal — sebab Zahid lama kena tutup. Rightsizing penanya soalan — sebab soalan = retak dalam vault. BANGANG bukan bodoh. BANGANG adalah harga operasi untuk kekal 99 bilik terkunci. Negara yang membayar sewa.",
    source: "Sintesis semua bayang di atas."
  },
  {
    id: 33,
    axis: "peribadi",
    depth: "tragis",
    title: "Mungkin Tidak Pernah Tahu Diri Sendiri",
    body: "MCKK boy yang berbaring di Baling tidak pernah bangun dari situ — kerana tiada situ. Reformis yang masuk penjara 20 tahun tidak pernah keluar dari bilik yang sama — bilik tarik simpati. PM yang tidak mengambil gaji tidak pernah menunjukkan siapa diri sebenar tanpa kamera. Jung: bila persona terlalu berjaya, pemiliknya sendiri pengunjung. 33 bayang bukan artikel — ini 33 pintu yang tidak pernah dibuka. Kerana satu pintu terbuka, sembilan puluh sembilan bertanya. Dan Anwar tidak sanggup menjawab satu pun.",
    source: "Sintesis — Wikipedia, Edge, Al Jazeera, CNA, LinkedIn, CNN, Federal Court."
  },
];

export const ANWAR_SUMMARY = {
  name: "Dato' Seri Anwar Ibrahim",
  order: 9,
  tenure: "2022–sekarang",
  totalShadows: 33,
  axes: {
    sosiopolitik: 11,
    ekonomi: 11,
    peribadi: 11,
  },
  verdict: "TENGGELAM",
  coreInsight: "33 bayang yang tidak pernah diintegrasikan memerlukan 33 pemeliharaan harian. Setiap pemeliharaan memerlukan tenaga. Tenaga yang habis menjaga vault adalah tenaga yang tiada untuk negara. Anwar bukan bodoh — dia adalah kos operasi untuk kekal terkunci.",
  jungLaw: "Bayang bukan desire. Bayang ialah SPLIT — psyche yang terbelah antara persona dan bayang. Makin suci persona, makin hitam bayang. Anwar membawa persona imam paling suci dalam sejarah politik Malaysia — maka bayangnya paling hitam juga.",
  sources: [
    "Wikipedia Anwar Ibrahim",
    "The Edge Malaysia (Ogos 2026, Disember 2023)",
    "Al Jazeera (Februari 2024)",
    "CNA (Februari 2026)",
    "CNN interview 2023",
    "MOF Malaysia",
    "BERSIH statements 2023",
    "PETRONAS Annual Report FY2025",
    "Court of Appeal & Federal Court rulings",
    "LinkedIn profile",
    "Twitter @ariffazil",
  ],
};
