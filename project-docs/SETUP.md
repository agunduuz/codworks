# Kurulum Rehberi — Sıfırdan Vercel'e Kadar

Bu doküman, projeyi boş bir klasörden başlayıp GitHub'a push edip Vercel'de yayına alana kadar atman gereken **her komutu** sırayla içerir. Paket yöneticisi olarak **npm** kullanılıyor.

Her adımı tamamladıktan sonra bir sonrakine geç — aralarında doğrulama noktaları var, onları atlama.

---

## Adım 0 — Ön Gereksinim Kontrolü

Terminalde şunları çalıştırıp sürümleri doğrula:

```bash
node -v
npm -v
git --version
```

**Node.js sürümü kritik önemde — burayı atlama.** Next.js 15 teknik olarak 18.18+ istiyor gibi görünse de, Node.js 20 (Iron) desteği Nisan 2026'da tamamen sona erdi (artık güvenlik yaması bile almıyor) ve `create-fumadocs-app`'in kullandığı `@clack/core` gibi modern CLI araçları artık `node:util` modülünün `styleText` export'unu varsayıyor — bu, Node.js 20.12 / 21.7'den önceki sürümlerde yok. Bu yüzden **en az Node.js 22 (Jod), tercihen güncel LTS olan Node.js 24 (Krypton)** kullanılmalı.

**Node.js sürümünü nvm ile yönet (önerilen):** Farklı projelerde farklı Node sürümlerine ihtiyaç duyacağın için, doğrudan nodejs.org'dan tek bir sürüm kurmak yerine nvm (Node Version Manager) kullanmak uzun vadede çok daha rahat.

```bash
# nvm zaten kurulu mu kontrol et
nvm --version
```

Kurulu değilse (macOS/Linux):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.6/install.sh | bash
```

Kurulumdan sonra terminali kapat/aç, ya da doğrudan:

```bash
source ~/.zshrc      # macOS varsayılan kabuğu zsh'tir
# source ~/.bashrc   # bash kullanıyorsan bunu çalıştır
```

Doğrula:

```bash
nvm --version
```

Şimdi güncel LTS Node.js sürümünü kur ve varsayılan yap:

```bash
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'

node -v    # v24.x görmelisin
npm -v
```

> nvm kullanmak istemezsen https://nodejs.org adresinden doğrudan güncel **LTS** yükleyiciyi indirip kurabilirsin — ama ileride başka bir projede farklı bir Node sürümü gerekirse nvm işini çok kolaylaştırır.

Git eksikse: https://git-scm.com/downloads

GitHub CLI kullanmak istersen (Adım 7'de "Yol A" için, opsiyonel ama önerilir):

```bash
gh --version
```

Kurulu değilse:
```bash
# macOS
brew install gh

# Windows (PowerShell)
winget install --id GitHub.cli

# Linux (Debian/Ubuntu)
sudo apt install gh
```

---

## Adım 1 — Proje İskeletini Oluştur

```bash
npm create fumadocs-app
```

Bu, interaktif bir sihirbaz açar. Şu şekilde cevapla:

```
◇ Project name
│ kod-atlasi
◆ Choose a framework
│ ● Next.js
◆ Choose a content source
│ ● Fumadocs MDX
```

Sihirbaz bittiğinde `kod-atlasi/` adlı yeni bir klasör oluşmuş olacak.

```bash
cd kod-atlasi
```

### Sorun Giderme: "node:util does not provide an export named 'styleText'"

Bu komutu çalıştırdığında şuna benzer bir hata alırsan:

```
SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'
```

Bu, **Adım 0'daki Node.js sürüm yükseltmesinin yapılmadığı** anlamına gelir — `create-fumadocs-app`'in arayüzünü çizen `@clack/core` paketi artık `node:util`'in `styleText` export'unu kullanıyor, bu da Node.js 20.12/21.7'den eski sürümlerde yok. Node.js 20.11 gibi sürümler zaten Nisan 2026 itibarıyla destek dışı kaldı.

**Çözüm:** Adım 0'a dön, nvm ile Node.js'i güncel LTS'e (24) yükselt, `node -v` ile doğrula, sonra bu komutu tekrar çalıştır:

```bash
nvm install --lts
nvm use --lts
node -v            # v24.x olmalı

npm create fumadocs-app
```

---

## Adım 2 — Bağımlılıkları Kur ve Doğrula

```bash
npm install
npm run dev
```

Tarayıcıda **http://localhost:3000/docs** adresini aç. Fumadocs'un varsayılan örnek sayfasını görüyorsan bu adım tamam demektir. Terminali durdurmak için `Ctrl+C`.

---

## Adım 3 — Ek Paketleri Kur

```bash
npm install lucide-react
npm install -D @tailwindcss/typography
```

- `lucide-react` → callout ikonları ve genel arayüz ikonları için.
- `@tailwindcss/typography` → uzun makale gövdelerinin (`prose`) tipografisini otomatik güzelleştirmek için.

---

## Adım 4 — İçerik Klasör Yapısını Kur

`ARCHITECTURE.md`'de tanımlanan kategori klasörlerini oluştur:

```bash
mkdir -p content/docs/javascript
mkdir -p content/docs/react
mkdir -p content/docs/nextjs
mkdir -p content/docs/genel
```

Her kategori için bir `meta.json` oluştur (sidebar başlığı ve sayfa sırası buradan kontrol edilir):

```bash
cat > content/docs/javascript/meta.json << 'EOF'
{
  "title": "JavaScript",
  "pages": ["scope-closure", "object-methods-this"]
}
EOF

cat > content/docs/react/meta.json << 'EOF'
{
  "title": "React",
  "pages": []
}
EOF

cat > content/docs/nextjs/meta.json << 'EOF'
{
  "title": "Next.js",
  "pages": []
}
EOF

cat > content/docs/genel/meta.json << 'EOF'
{
  "title": "Genel",
  "pages": []
}
EOF
```

> Windows'ta PowerShell kullanıyorsan `cat > dosya << 'EOF' ... EOF` yerine dosyayı doğrudan bir kod editöründe (VS Code) oluşturup içeriği yapıştırman daha pratik olur.

---

## Adım 5 — MDX Component Klasörünü Aç

```bash
mkdir -p components/mdx
```

Bu klasör, `Callout`, `ExampleCard`, `CheatSheet` gibi component'lerin yaşayacağı yer — bu component'lerin kodu bir sonraki oturumda (`CONTENT-GUIDELINES.md` ve `ARCHITECTURE.md`'ye göre) Claude Code ile yazılacak.

---

## Adım 6 — İlk Commit'i At

`create fumadocs-app` genelde git'i otomatik başlatır. Kontrol et:

```bash
git status
```

"not a git repository" hatası alırsan:

```bash
git init
git branch -M main
```

`.gitignore` dosyasının `node_modules`, `.next`, `.env*.local` satırlarını içerdiğinden emin ol (Next.js şablonunda bu genelde hazır gelir):

```bash
cat .gitignore
```

Her şey yolundaysa değişiklikleri kaydet:

```bash
git add .
git commit -m "chore: proje iskeleti - Next.js + Fumadocs kurulumu"
```

---

## Adım 7 — GitHub Reposu Oluştur

İki yoldan birini seç.

### Yol A — GitHub CLI ile (hızlı, önerilen)

```bash
gh auth login
```
(Tarayıcı üzerinden giriş yapmanı isteyecek — talimatları takip et.)

```bash
gh repo create kod-atlasi --private --source=. --remote=origin --push
```

Bu tek komut hem GitHub'da repoyu oluşturur hem `origin` remote'unu bağlar hem de mevcut commit'i push eder. `--private` yerine `--public` da kullanabilirsin.

### Yol B — Manuel (GitHub web arayüzünden)

1. https://github.com/new adresine git.
2. Repository name: `kod-atlasi`.
3. **README, .gitignore veya lisans ekleme** (zaten yerelde var, çakışma yaratmasın).
4. "Create repository" butonuna bas.
5. Terminalde (GitHub'ın verdiği kullanıcı adını kullan):

```bash
git remote add origin https://github.com/KULLANICI_ADIN/kod-atlasi.git
git push -u origin main
```

**Doğrulama:** GitHub'da repo sayfasını yenile, dosyaların göründüğünü kontrol et.

---

## Adım 8 — Production Build'i Yerelde Test Et

Vercel'e göndermeden önce build'in hatasız geçtiğinden emin ol:

```bash
npm run build
```

Hata almazsan devam et. Hata alırsan Vercel'de de aynı hatayı alırsın — önce burada çöz.

---

## Adım 9 — Vercel'e Deploy

İki yoldan birini seç (ikisi birbirini dışlamaz, ama Yol B uzun vadede daha rahat).

### Yol A — Vercel CLI ile Hızlı Deploy

```bash
npm install -g vercel
vercel login
vercel
```

Sorulara şu şekilde cevap ver:
```
Set up and deploy "~/kod-atlasi"? Yes
Which scope? (kendi hesabını seç)
Link to existing project? No
What's your project's name? kod-atlasi
In which directory is your code located? ./
```

Vercel, Next.js'i otomatik algılar; ayar değiştirmene gerek yok. Komut bitince bir **preview URL** verir.

Production'a almak için:

```bash
vercel --prod
```

### Yol B — Vercel Dashboard + GitHub Entegrasyonu (Önerilen — Kalıcı Kurulum)

1. https://vercel.com/new adresine git.
2. "Import Git Repository" ile GitHub hesabını bağla, `kod-atlasi` reposunu seç.
3. Framework Preset: **Next.js** (otomatik algılanır, değiştirme).
4. Root Directory: `./` (değiştirme).
5. "Deploy" butonuna bas.

Bu yöntemin farkı: bundan sonra her `git push origin main` **otomatik production deploy**, her yeni branch/PR **otomatik preview link** üretir. Yeni bir içerik makalesini Claude Code ile yazıp push ettiğinde, canlıya almadan önce preview linkten tarayıcıda görebilirsin.

---

## Adım 10 — Sonraki Push'lar İçin Standart Akış

Kurulum bittikten sonra, her yeni içerik veya kod değişikliği için:

```bash
git add .
git commit -m "feat: prototype ve inheritance konusu eklendi"
git push origin main
```

Vercel dashboard'a bağlıysan (Adım 9 — Yol B) bu otomatik olarak yeni bir deploy tetikler.

---

## Doğrulama Kontrol Listesi

- [ ] `npm run dev` → `localhost:3000/docs` açılıyor
- [ ] `npm run build` hatasız tamamlanıyor
- [ ] `git log` içinde en az bir commit var
- [ ] GitHub'da `kod-atlasi` reposu görünüyor ve dosyalar orada
- [ ] Vercel production URL'i tarayıcıda açılıyor
- [ ] Vercel dashboard, GitHub reposuna bağlı (her push'ta otomatik deploy)

Hepsi işaretliyse proje iskeleti tamamlanmış demektir — sıradaki adım `ARCHITECTURE.md`'deki component'leri (Callout, ExampleCard, CheatSheet) yazmak ve `CONTENT-ROADMAP.md`'deki bir sonraki konuyu (Prototype & Inheritance) içerik olarak üretmek.
