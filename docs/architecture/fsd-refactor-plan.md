# Rencana Refactor: Feature-Sliced Design (FSD) v2.1 untuk `bit2`

Stack: Vite 8 + React 19 + TanStack Router (file-based) + shadcn/ui + Tailwind v4.
Rencana ini mengikuti skill resmi FSD v2.1 di `.agents/skills/feature-sliced-design/`.

---

## 1. Diagnosis struktur saat ini

```
src/
  components/{navbar,footer,silk}.tsx
  components/ui/{avatar,button,input,label,separator,sheet}.tsx   ← shadcn
  features/about-us/screen/about.tsx
  features/auth/{sign-in,sign-up,forget-password}/{screen,components}/*
  features/home/screen/{hero,markets-today,services,account-types,why-us,register-now}.tsx
  features/platform/screen/{header,body}.tsx
  features/trading/screen/transaction.tsx
  lib/utils.ts
  routes/**                ← TanStack file-based routing
  main.tsx, router.tsx, styles.css, routeTree.gen.ts
```

Temuan:

| # | Masalah | Aturan FSD yang relevan |
|---|---|---|
| 1 | `features/{home,about-us,platform,trading}` sebenarnya **halaman**, bukan "reusable user interaction". Semuanya dipakai tepat di 1 route. | §6 "Do not extract single-use code", §5-1 Pages First |
| 2 | `features/auth/*` juga single-use (form login hanya dipakai di halaman login) | Tabel §3: "Auth login form → single use → `pages/login/ui/`" |
| 3 | Segment bernama `screen/` dan `components/` — grouping *by what it is*, bukan *by purpose* | §8 desegmentation → harus `ui/`, `model/`, `api/`, `lib/` |
| 4 | Tidak ada public API (`index.ts`); route mengimpor file internal (`#/features/home/screen/hero`) | §4-2 Public API |
| 5 | `lib/utils.ts` — nama technical-role | §4-4 domain-based file naming |
| 6 | **Dua alias untuk path yang sama**: `#/*` dan `@/*` → `./src/*`, dipakai campur (shadcn pakai `@/`, kode kamu pakai `#/`) | §Path Aliases |
| 7 | `navbar`/`footer` = layout app-wide, tapi ada di `components/` generik | layer-structure.md "Layouts responsible for the entire application → `app`" |
| 8 | `silk.tsx` (shader three.js, tanpa business logic) dipakai 3 section → sudah layak shared, tapi salah tempat | §9 Shared |
| 9 | `main.tsx` bikin router sendiri **dan** duplikat blok `declare module Register` yang sudah ada di `router.tsx` | — (duplikasi nyata, sekalian dibetulkan) |

**Kesimpulan:** namanya sudah "features" tapi isinya pages. Ini kasus klasik yang justru dilarang FSD v2.1.

---

## 2. Target struktur

Pakai **minimal FSD**: `app/` + `pages/` + `shared/`. **Tanpa** `features/`, `entities/`, `widgets/`
(§5-3 "Do not create empty layer folders 'just in case'"; widgets discouraged di v2.1).

```
src/
  app/                                  ← inisialisasi app, routing, layout global
    main.tsx                            ← entrypoint (dari src/main.tsx)
    router.tsx                          ← getRouter() (dari src/router.tsx)
    providers/                          ← (Fase 5) QueryClientProvider dll
    layout/                             ← BUKAN `ui/`: Steiger punya rule `fsd/no-ui-in-app`
      root-layout.tsx                   ← Navbar + Outlet + Footer + Devtools
      navbar.tsx                        ← dari components/navbar.tsx
      footer.tsx                        ← dari components/footer.tsx
    styles/
      global.css                        ← dari src/styles.css
    routes/                             ← TanStack file-based (Fase 3)
      __root.tsx
      (home)/index.tsx
      (auth)/{sign-in,sign-up,forget-password}/index.tsx
      about-us/index.tsx
      platform/index.tsx
      trading/index.tsx
    routeTree.gen.ts                    ← generated

  pages/
    home/
      ui/{home-page,hero,markets-today,services,account-types,why-us,register-now}.tsx
      index.ts                          ← export { HomePage }
    about-us/
      ui/about-us-page.tsx
      index.ts
    platform/
      ui/{platform-page,platform-header,platform-body}.tsx
      index.ts
    trading/
      ui/{trading-page,transaction}.tsx
      index.ts
    auth/                               ← SLICE GROUP: tanpa index.ts, tanpa segment
      sign-in/
        ui/{sign-in-page,sign-in-form}.tsx
        index.ts
      sign-up/
        ui/{sign-up-page,sign-up-form}.tsx
        index.ts
      forget-password/
        ui/{forget-password-page,forget-password-form}.tsx
        index.ts

  shared/
    ui/
      {avatar,button,input,label,separator,sheet}.tsx   ← shadcn
      silk.tsx
      index.ts
    lib/
      cn.ts                             ← dari lib/utils.ts
      index.ts
```

### Kenapa `auth/` jadi slice group, bukan slice?

Ada 3 halaman auth dengan konteks bisnis sama → cocok sebagai slice group untuk navigasi
(layer-structure.md §Slice Groups). Aturannya keras:
- **Tidak boleh** ada `pages/auth/index.ts`
- **Tidak boleh** ada `pages/auth/{utils,types,constants}.ts`
- Antar sibling (`sign-in` ↔ `sign-up`) **tidak boleh** saling import

Import tetap full path: `import { SignInPage } from '@/pages/auth/sign-in'`.

### Kapan `features/` dan `entities/` baru dibuat?

Jangan sekarang. Trigger konkretnya:

- **`features/auth/`** → saat form sign-in benar-benar dipakai di 2+ tempat (misal halaman login **dan** modal login di navbar). Kalau dibuat sekarang, Steiger akan protes `fsd/insignificant-slice` karena hanya punya 1 referensi. (Slice di layer `pages` dikecualikan dari rule ini — halaman memang wajar direferensikan sekali.)
- **`entities/`** → saat ada model domain (mis. `instrument`/`order`) yang dipakai lintas halaman dengan boundary stabil. CRUD **tidak** masuk entities → `shared/api/` (§6).
- **`shared/auth/`** → begitu ada token/session (§9: token & session selalu di shared, bukan entity `user`).

---

## 3. Keputusan alias (penting, kerjakan sebelum pindah file)

Sekarang ada 3 sumber alias yang tumpang tindih:
- `package.json` → `"imports": { "#/*": "./src/*" }`
- `tsconfig.json` → `paths: { "#/*", "@/*" }`
- `components.json` → alias shadcn ke `@/components`, `@/lib/utils`

**Keputusan: pakai `@/*` saja, hapus `#/*`.** Alasan: shadcn CLI generate `@/`, dokumentasi FSD
pakai `@/`, dan mempertahankan dua alias identik = sumber inkonsistensi. Semua import `#/`
memang akan ditulis ulang saat pindah file, jadi biayanya nol.

`vite.config.ts` sudah `resolve: { tsconfigPaths: true }`, jadi cukup ubah `tsconfig.json` —
tidak perlu duplikasi alias di Vite.

Opsional (lebih ketat, direkomendasikan FSD): alias per layer supaya arah import kelihatan
dari teks import dan salah-tulis langsung merah:

```json
// tsconfig.json
"paths": {
  "@/app/*":    ["./src/app/*"],
  "@/pages/*":  ["./src/pages/*"],
  "@/shared/*": ["./src/shared/*"]
}
```

`components.json` harus diselaraskan supaya `bunx shadcn add ...` tetap menaruh file di tempat benar:

```jsonc
"aliases": {
  "components": "@/shared/ui",
  "ui":         "@/shared/ui",
  "utils":      "@/shared/lib/cn",
  "lib":        "@/shared/lib",
  "hooks":      "@/shared/lib"
}
```

---

## 4. Konvensi yang dipakai (deviasi sadar dari contoh skill)

| Hal | Contoh di skill | Keputusan `bit2` | Alasan |
|---|---|---|---|
| Nama file komponen | `HomePage.tsx` (PascalCase) | `home-page.tsx` (kebab-case) | konsisten dengan shadcn & file existing; FSD tidak mewajibkan casing |
| Nama komponen | `HomePage` | `HomePage` (PascalCase) | standar React |
| Barrel `shared/ui/index.ts` | per-segment public API (§4-2) | dibuat, **tapi** boleh import langsung `@/shared/ui/button` | barrel besar sedikit menekan tree-shaking/HMR di Vite; per-segment tetap dituruti |

Deviasi apa pun di luar tabel ini wajib ditulis komentar alasannya di kode (§4 "document the reason").

---

## 5. Eksekusi bertahap

Prinsip: **satu fase = satu commit yang build-nya hijau.** Verifikasi tiap fase dengan
`bun run build` (project ini belum punya test).

### Fase 0 — Baseline
1. Commit dulu yang masih menggantung (`src/components/navbar.tsx` masih modified).
2. `bun run build` → pastikan hijau sebagai titik balik.
3. Buat branch: `git switch -c refactor/fsd`.

### Fase 1 — Shared layer (risiko terendah, murni mekanis)
1. `src/components/ui/*` → `src/shared/ui/*`
2. `src/components/silk.tsx` → `src/shared/ui/silk.tsx`
3. `src/lib/utils.ts` → `src/shared/lib/cn.ts` (§4-4)
4. Buat `src/shared/ui/index.ts` + `src/shared/lib/index.ts`
5. Update `components.json` (lihat §3)
6. Rewrite semua import `#/components/ui/*` dan `@/lib/utils` → `@/shared/...`
7. `bun run build` → commit `refactor(shared): move ui kit and cn to shared layer`

### Fase 2 — Pages layer (bagian paling banyak menyentuh file)
Per halaman, satu commit kecil:

| Dari | Ke |
|---|---|
| `features/home/screen/*.tsx` | `pages/home/ui/*.tsx` |
| (komposisi inline di `routes/(home)/index.tsx`) | `pages/home/ui/home-page.tsx` |
| `features/about-us/screen/about.tsx` | `pages/about-us/ui/about-us-page.tsx` |
| `features/platform/screen/{header,body}.tsx` | `pages/platform/ui/{platform-header,platform-body}.tsx` |
| — | `pages/platform/ui/platform-page.tsx` (baru) |
| `features/trading/screen/transaction.tsx` | `pages/trading/ui/transaction.tsx` |
| — | `pages/trading/ui/trading-page.tsx` (baru) |
| `features/auth/sign-in/screen/sign-in-screen.tsx` | `pages/auth/sign-in/ui/sign-in-page.tsx` |
| `features/auth/sign-in/components/sign-in-form.tsx` | `pages/auth/sign-in/ui/sign-in-form.tsx` |
| idem untuk `sign-up`, `forget-password` | idem |

Setiap slice dapat `index.ts`:

```ts
// src/pages/home/index.ts
export { HomePage } from './ui/home-page';
```

Route jadi tipis — komposisi pindah ke page (§Pages Layer: "pages own substantial logic",
route file hanya routing):

```tsx
// src/app/routes/(home)/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/pages/home';

export const Route = createFileRoute('/(home)/')({ component: HomePage });
```

Hapus folder `src/features/` setelah kosong. Commit: `refactor(pages): move screens to pages layer`.

### Fase 3 — App layer + relokasi routes
1. `src/styles.css` → `src/app/styles/global.css`
2. `src/components/{navbar,footer}.tsx` → `src/app/layout/`
3. Buat `src/app/layout/root-layout.tsx` (isi `RootComponent` dari `__root.tsx`), lalu
   `__root.tsx` cuma: `createRootRoute({ component: RootLayout })`
4. `src/router.tsx` → `src/app/router.tsx`; `src/main.tsx` → `src/app/main.tsx` dan **pakai**
   `getRouter()` (hapus router duplikat + blok `declare module` ganda di main.tsx)
5. Update `index.html`: `<script type="module" src="/src/app/main.tsx">`
6. Pindahkan routes ke app layer — layer-structure.md eksplisit menaruh
   `app/routes/ ← Route configuration`:

```ts
// vite.config.ts
tanstackRouter({
  target: 'react',
  autoCodeSplitting: true,
  routesDirectory: './src/app/routes',
  generatedRouteTree: './src/app/routeTree.gen.ts',
})
```

```json
// tsr.config.json
{
  "target": "react",
  "routesDirectory": "./src/app/routes",
  "generatedRouteTree": "./src/app/routeTree.gen.ts"
}
```

7. `bun run generate-routes` lalu `bun run build`.
   Commit: `refactor(app): consolidate entrypoint, layout, and routing in app layer`

> **Escape hatch:** kalau langkah 6 bikin ribet (config plugin/CI), boleh biarkan
> `src/routes/` di root `src/` sebagai "routing-only folder" — analog cara FSD memperlakukan
> direktori `app/` Next.js. Tapi wajib ditulis di ADR bahwa `src/routes` **bukan** layer FSD, dan
> di-`ignore` dari Steiger.

### Fase 4 — Guardrail (supaya tidak balik berantakan)
1. Steiger, linter resmi FSD (§5-4). Catatan: perintah di skill (`@feature-sliced/steiger`)
   sudah usang — nama paket yang benar sekarang:

```bash
bun add -D steiger @feature-sliced/steiger-plugin
```

```ts
// steiger.config.ts
import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  { ignores: ['**/routeTree.gen.ts'] },
  {
    // shadcn/ui = UI kit pihak ketiga, sering diimpor per file (`@/shared/ui/button`)
    files: ['./src/shared/ui/**'],
    rules: { 'fsd/no-public-api-sidestep': 'off' },
  },
]);
```

Rule yang paling relevan buat kita: `fsd/forbidden-imports` (arah layer + cross-import),
`fsd/public-api`, `fsd/no-layer-public-api` (dilarang `pages/index.ts`),
`fsd/no-segments-on-sliced-layers`, `fsd/no-ui-in-app`, `fsd/excessive-slicing`.

2. Tambah script: `"lint:fsd": "steiger ./src"`
3. Opsional tapi kuat: `eslint-plugin-boundaries` / `import/no-restricted-paths` untuk
   memaksa arah import `app → pages → shared` di CI.
4. Tulis `docs/architecture/adr-0001-fsd.md` berisi: keputusan pakai FSD minimal, alias `@/*`,
   `src/app/routes` sebagai lokasi routing, dan daftar deviasi dari §4.

### Fase 5 — Persiapan TanStack Query (belum dipasang)
Saat `@tanstack/react-query` masuk, ikuti `references/practical-examples.md` §TanStack Query:

- Query keys: mulai **Opsi 1** — `shared/api/queries/<domain>.ts` (project masih kecil, belum ada
  entities). Naik ke Opsi 2 (`shared/api/<controller>/`) kalau endpoint membengkak.
- `QueryClientProvider` → `app/providers/`
- Integrasi Router + Query: inject `queryClient` ke router context, lalu prefetch di loader —
  route ada di layer `app`, jadi `app → shared` tetap sah:

```tsx
// app/router.tsx
const queryClient = new QueryClient();
createTanStackRouter({ routeTree, context: { queryClient }, defaultPreload: 'intent' });

// app/routes/trading/index.tsx
export const Route = createFileRoute('/trading/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(instrumentQueries.list()),
  component: TradingPage,
});
```

- Auth nanti: token/session → `shared/auth/`, **bukan** entity `user` (§6).

---

## 6. Risiko & mitigasi

| Risiko | Mitigasi |
|---|---|
| `routeTree.gen.ts` basi setelah pindah folder | selalu `bun run generate-routes` sebelum build; file ini ter-commit, jangan diedit manual |
| `autoCodeSplitting: true` sensitif terhadap isi route file | jaga route file tipis (hanya `createFileRoute` + `component`), semua UI di `pages/` |
| shadcn CLI menulis ke lokasi lama | update `components.json` di Fase 1, tes dengan `bunx shadcn add badge` |
| `index.html` masih menunjuk `/src/main.tsx` | bagian dari Fase 3 langkah 5 |
| `noUnusedLocals`/`noUnusedParameters` aktif → import sisa langsung error | justru menguntungkan: build gagal cepat saat ada import nyasar |
| Barrel `index.ts` menyembunyikan circular import | arah import satu arah + Steiger; hindari barrel di dalam slice yang sama |

---

## 7. Definition of Done

- [ ] `src/` hanya berisi `app/`, `pages/`, `shared/` (+ `index.html` menunjuk entry baru)
- [ ] Tidak ada folder `features/`, `entities/`, `widgets/` yang kosong/prematur
- [ ] Nol import `#/`; nol import yang menembus internal slice (`@/pages/x/ui/...`) dari luar
- [ ] Setiap slice `pages/*` punya `index.ts`; `pages/auth/` **tidak** punya `index.ts`
- [ ] Route file hanya routing, tanpa komposisi UI
- [ ] `bun run build` hijau, `bun run lint:fsd` bersih (atau exception terdokumentasi)
- [ ] ADR ditulis
