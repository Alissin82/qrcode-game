import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
    const [isLoggedin, setisLoggedin] =
        useState(true);

    if (isLoggedin) {
        return <Outlet />;
    }
}
