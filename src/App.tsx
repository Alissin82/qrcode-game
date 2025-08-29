import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import './Style.css';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import DashboardPage from './pages/DashboardPage';
import { GamesPage } from './pages/GamesPage';
import { GiftsPage } from './pages/GiftsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { MyTeamPage } from './pages/MyTeamPage';
import SettingsPage from './pages/SettingPage';
import { TeamsLeaderboardPage } from './pages/TeamsPage';
import MapPage from './pages/MapPage';

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
                        element={
                            <DashboardPage />
                        }
                    />
                    <Route
                        path='/settings'
                        element={<SettingsPage />}
                    />
                    <Route
                        path='teams'
                        element={
                            <TeamsLeaderboardPage />
                        }
                    />
                    <Route
                        path='my-team'
                        element={<MyTeamPage />}
                    />
                    <Route
                        path='gifts'
                        element={<GiftsPage />}
                    />
                    <Route
                        path='missions'
                        element={
                            <p>ماموریت‌ها</p>
                        }
                    />
                    <Route
                        path='map'
                        element={<MapPage />}
                    />
                    <Route
                        path='puzzles'
                        element={<p>پازل ها</p>}
                    />
                    <Route
                        path='games'
                        element={<GamesPage />}
                    />
                    =
                    <Route
                        path='notifications'
                        element={
                            <AnnouncementsPage />
                        }
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
