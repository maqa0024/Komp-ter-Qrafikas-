# 🪐 WebGL2 // Real-Time Geometry & Point Light Shadows

![WebGL2](https://img.shields.io/badge/WebGL2-GPU--Accelerated-5bf0c8?style=for-the-badge&logo=webgl)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-ffe15b?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-e87a9a?style=for-the-badge&logo=html5)

Bu layihə, **WebGL2** qrafik API-sindən istifadə edilərək kənar heç bir qrafik kitabxana (Three.js, Babylon.js və s.) olmadan, sıfırdan hazırlanmış real-zamanlı qrafik render mühərrikidir. Tətbiq prosedural həndəsi fiqurların GPU-da generasiyasını, Blinn-Phong işıqlandırma modelini və **Omnidirectional Cubemap Shadow Mapping** (nöqtəvi işıq kölgələri) alqoritmini yüksək performansla nümayiş etdirir.

---

## 🚀 Əsas Xüsusiyyətlər

* **Dinamik Prosedural Mesh Generasiyası (`drawElements`):** * Kürə (Sphere), Torus (Simit) və Kub (Box) fiqurlarının riyazi tənliklərlə sıfırdan qurulması.
  * Sol paneldəki idarəetmə elementləri vasitəsilə radius, boru qalınlığı və seqment saylarının (lat/lon) anlıq olaraq yenidən hesablanması.
* **İki-Mərhələli Render (Multi-pass Rendering):**
  * **Pass 1 (Depth Pass):** Dinamik nöqtəvi işıq mənbəyindən hər 6 istiqamət (+X, -X, +Y, -Y, +Z, -Z) üçün məsafə dəyərləri hesablanır və **Cubemap Texture**-a dərinlik (depth map) olaraq yazılır.
  * **Pass 2 (Color Pass):** Əsas səhnə Blinn-Phong işıqlandırma modeli, material xüsusiyyətləri və hesablanmış kölgə xəritəsi birləşdirilərək render olunur.
* **Yumşaq Kölgələr (PCF - Percentage-Closer Filtering):**
  * Kölgə kənarlarındakı pikselləşməni (aliasing) azaltmaq üçün shader daxilində 20 fərqli 3D istiqamət vektoru üzrə nümunələmə (sampling) tətbiq olunub. Nümunə sayı dinamik tənzimlənə bilir.
* **5 Fərqli Shader Rejimi:**
  * 👤 `Shadow` — PCF ilə yumşaldılmış real kölgə və Blinn-Phong işıqlandırması.
  * 💡 `Phong` — Kölgəsiz, çoxlu işıq effektli klassik Phong shading.
  * 📐 `Normals` — Obvəktlərin normal ($v\_normal$) vektorlarının RGB rəng fazasında vizuallaşdırılması.
  * 🏁 `UV Checker` — Fiqurların üzərinə riyazi olaraq hesablanmış UV koordinat şəbəkəsi.
  * 🌊 `Fresnel` — Baxış bucağına əsasən mərkəzdən kənarlara doğru rəng keçidi effekti (Rim lighting).
* **Cubemap Depth Preview:** İşıq mənbəyinin ətrafı necə gördüyünü göstərən real-zamanlı 6 tərəfli mini-canvas monitorinq paneli.
* **İnteraktiv Kamera:** Mouse və ya sensor ekran (Touch) vasitəsilə səhnəni fırlatma (Orbit), yaxınlaşdırma (Zoom/Scroll) və avtomatik kamera fırlanması.

---

## 🛠️ Texnoloji Stack və Arxitektura

* **Qrafik API:** WebGL2 (Core Profile, `#version 300 es` GLSL shader tərzi)
* **Dizayn & UI:** Cyberpunk / Dark-mode üslubunda minimalist HTML5/CSS3 interfeys. Məlumatların skan edilməsini asanlaşdırmaq üçün *JetBrains Mono* və *Syne* şriftlərindən istifadə olunmuşdur.
* **Xüsusi Riyazi Kitabxana (Custom Math Engine):** Proqramda `glMatrix` kimi xarici matris kitabxanalarından istifadə **olunmayıb**. Bütün sütun-əsaslı (column-major) 4x4 matris əməliyyatları, `perspective`, `lookAt` funksiyaları və normal matris invertasiyası (`nrm3`) təmiz JavaScript ilə yazılıb.
* **Yaddaş Optimizasiyası:** Səhnə obyektlərinin sürətli renderi və GPU-ya yüklənməsini minimuma endirmək üçün **VAO (Vertex Array Object)** arxitekturasından istifadə olunub.

---

## 📂 Layihənin Strukturu

Fayl tamamilə modulyar bir şəkildə tək bir HTML daxilində optimallaşdırılmışdır:

```markdown
├── Torus.html
    ├── CSS (Cyberpunk Panel Layout & Range Sliders)
    ├── HTML Structure (Sidebar controls, Cubemap Preview, Main Canvas)
    ├── JS Math Library (Matrix & Vector helpers)
    ├── Geometry Engine (Sphere, Torus, Box, Plane generators)
    ├── GLSL Shader Programs (Vertex & Fragment Shaders)
    └── Render Loop & UI Event Handlers
