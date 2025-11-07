# AI Tutor Gemini (Render Deployment)

Langkah ringkas:
1. Upload folder ini ke GitHub (contoh: wan-syahrul/ai-tutor-gemini)
2. Pergi ke https://render.com → New Web Service
3. Sambungkan repo GitHub ini
4. Tetapan:
   - Build Command: npm install
   - Start Command: npm start
   - Node version: 18+
5. Tambah Environment Variable:
   GEMINI_API_KEY = (API key kamu dari Google AI Studio)
6. Deploy dan dapatkan URL API, contoh:
   https://ai-tutor-gemini.onrender.com/get-answer
