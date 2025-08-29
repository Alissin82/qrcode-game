import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import './Style.css';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<ProtectedLayout />}
                >
                    <Route
                        path='/'
                        element={<HomePage />}
                    />
                    <Route
                        path='dashboard'
                        element={<p>داشبورد</p>}
                    />
                    <Route
                        path='/settings'
                        element={<p>تنظیمات</p>}
                    />
                    <Route
                        path='teams'
                        element={<p>تیم ها</p>}
                    />
                    <Route
                        path='gifts'
                        element={
                            <p>جوایز دریافتی</p>
                        }
                    />
                    <Route
                        path='missions'
                        element={
                            <p>ماموریت‌ها</p>
                        }
                    />
                    <Route
                        path='map'
                        element={<p>نقشه</p>}
                    />
                    <Route
                        path='puzzles'
                        element={<p>پازل ها</p>}
                    />
                    <Route
                        path='scores'
                        element={<p>امتیازات</p>}
                    />
                    =
                    <Route
                        path='notifications'
                        element={<p>اعلان‌ها</p>}
                    />
                </Route>

                <Route
                    path='/login'
                    element={<LoginPage />}
                />
                <Route
                    path='*'
                    element={
                        <p>
                            صفحه ی مورد نظر یافت
                            نشد
                        </p>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
