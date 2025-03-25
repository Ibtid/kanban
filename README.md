# SwapAttend

SwapAttend is a full-stack task management system built with Laravel (REST API) and React Vite for the frontend.

## 🚀 Project URL

🔗 **Live Demo:** [SwapAttend](https://swapattend.vercel.app/)

⚠️ **Note:** Directly accessing routes like `/auth` or `/tasks` via URL may not work due to client-side routing. Navigate using the app interface instead.

## Paste the url for live demo - https://swapattend.vercel.app/ 

---

## 🛠 Tech Stack

### Backend (Laravel API)
- Laravel (PHP)
- MySQL
- JWT Authentication
- REST API

### Frontend (React Vite)
- React.js
- Vite
- Redux Toolkit (State Management)
- Tailwind CSS
- Drag & Drop (Dnd-Kit)

---

## 📂 Project Setup

### Backend (Laravel API)
#### Prerequisites
- PHP 8+
- Composer
- MySQL

#### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Ibtid/kanban.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   composer install
   ```
3. Set up environment variables:
   ```sh
   cp .env.example .env
   ```
   - Configure database credentials in `.env`
4. Generate application key:
   ```sh
   php artisan key:generate
   ```
5. Run migrations:
   ```sh
   php artisan migrate --seed
   ```
6. Start the Laravel server:
   ```sh
   php artisan serve
   ```

---

### Frontend (React Vite)
#### Prerequisites
- Node.js 18+
- npm or yarn

#### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Ibtid/kanban.git
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the API base URL:
     ```sh
     VITE_API_BASE_URL=http://localhost:8000/api
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

