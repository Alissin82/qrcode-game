import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import './style.css';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import DashboardPage from './pages/DashboardPage';
import { GamesPage } from './pages/GamesPage';
import { GiftsPage } from './pages/GiftsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import MissionDetailPage from './pages/MissionDetailPage';
import MissionsPage from './pages/MissionsPage';
import { MyTeamPage } from './pages/MyTeamPage';
import { PuzzleListPage } from './pages/PuzzlesPage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import SettingsPage from './pages/SettingPage';
import { TeamsLeaderboardPage } from './pages/TeamsPage';
import { VideoMissionPage } from './pages/VideoMissionPage';
import { VideoUploadPage } from './pages/VideoUploadPage';
import { useEffect, useState } from 'react';
import { TeamDataContext } from './contexts/TeamDataContext.ts';
import { apiClient } from './utils';
import { config } from './config/config.ts';

function App() {
    const [teamData, setTeamData] =
        useState<Team | null>(null);

    useEffect(() => {
        apiClient.get(
            `${config.host}sanctum/csrf-cookie`,
        );
        async function fetchTeam() {
            const response =
                await apiClient.get('/teams/me');
            setTeamData(response.data.data);
        }
        if (!teamData) fetchTeam();
    }, []);

    return (
        <BrowserRouter>
            <TeamDataContext.Provider
                value={{
                    data: teamData,
                    setData: setTeamData,
                }}
            >
                <Routes>
                    <Route
                        element={
                            <ProtectedLayout />
                        }
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
                            element={
                                <SettingsPage />
                            }
                        />
                        <Route
                            path='teams'
                            element={
                                <TeamsLeaderboardPage />
                            }
                        />
                        <Route
                            path='my-team'
                            element={
                                <MyTeamPage />
                            }
                        />
                        <Route
                            path='gifts'
                            element={
                                <GiftsPage />
                            }
                        />
                        <Route
                            path='missions'
                            element={
                                <MissionsPage />
                            }
                        />
                        <Route
                            path='mission/:missionId'
                            element={
                                <MissionDetailPage />
                            }
                        />
                        <Route
                            path='map'
                            element={<MapPage />}
                        />
                        <Route
                            path='puzzles'
                            element={
                                <PuzzleListPage />
                            }
                        />
                        <Route
                            path='games'
                            element={
                                <GamesPage />
                            }
                        />
                        <Route
                            path='video-mission'
                            element={
                                <VideoMissionPage />
                            }
                        />

                        <Route
                            path='upload-video-mission'
                            element={
                                <VideoUploadPage />
                            }
                        />
                        <Route
                            path='questionnaire-mission'
                            element={
                                <QuestionnairePage />
                            }
                        />
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
                                صفحه ی مورد نظر
                                یافت نشد
                            </p>
                        }
                    />
                </Routes>
            </TeamDataContext.Provider>
        </BrowserRouter>
    );
}

export default App;
