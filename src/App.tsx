import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GuestLayout from './components/layouts/GuestLayout.tsx';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import { config } from './config/config.ts';
import { TeamDataContext } from './contexts/TeamDataContext.ts';
import ActionsPage from './pages/ActionsPage.tsx';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import DashboardPage from './pages/DashboardPage';
import { UploadFileMission } from './pages/FileUploadPage.tsx';
import GamePages from './pages/GamePages.tsx';
import { GamesPage } from './pages/GamesPage';
import { GiftsPage } from './pages/GiftsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import MissionDetailPage from './pages/MissionDetailPage';
import { MyTeamPage } from './pages/MyTeamPage';
import { PuzzleListPage } from './pages/PuzzlesPage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import SettingsPage from './pages/SettingPage';
import { TeamsLeaderboardPage } from './pages/TeamsPage';
import { VideoMissionPage } from './pages/VideoMissionPage';
import { VideoUploadPage } from './pages/VideoUploadPage';
import './style.css';
import { apiClient } from './utils';

function App() {
    const [teamData, setTeamData] = useState<Team | null>(null);

    useEffect(() => {
        apiClient.get(`${config.host}/sanctum/csrf-cookie`);
    }, []);

    return (
        <>
            {
                <BrowserRouter>
                    <TeamDataContext.Provider
                        value={{
                            data: teamData,
                            setData: setTeamData,
                        }}
                    >
                        <Routes>
                            <Route element={<ProtectedLayout />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="dashboard" element={<DashboardPage />} />
                                <Route path="/settings" element={<SettingsPage />} />
                                <Route path="teams" element={<TeamsLeaderboardPage />} />
                                <Route path="my-team" element={<MyTeamPage />} />
                                <Route path="gifts" element={<GiftsPage />} />
                                <Route path="missions" element={<ActionsPage />} />
                                <Route path="mission/:missionId" element={<MissionDetailPage />} />
                                <Route path="map" element={<MapPage />} />
                                <Route path="puzzles" element={<PuzzleListPage />} />
                                <Route path="games" element={<GamesPage />} />
                                <Route path="games/:id" element={<GamePages />} />
                                <Route path="video-mission/:id" element={<VideoMissionPage />} />
                                <Route path="upload-file-mission/:id" element={<UploadFileMission />} />
                                <Route path="upload-video-mission/:id" element={<VideoUploadPage />} />
                                <Route path="questionnaire-mission/:id" element={<QuestionnairePage />} />
                                <Route path="notifications" element={<AnnouncementsPage />} />
                            </Route>
                            <Route element={<GuestLayout />}>
                                <Route path="/login" element={<LoginPage />} />
                            </Route>
                            <Route path="*" element={<p>صفحه ی مورد نظر یافت نشد</p>} />
                        </Routes>
                    </TeamDataContext.Provider>
                </BrowserRouter>
            }
        </>
    );
}

export default App;
