import { Routes, Route } from 'react-router-dom'

import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import { Homepage } from './_root/pages'

// Layouts
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'

export default function App() {
    return (
        <main className='flex h-screen'>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SigninForm />} />
                    <Route path='/sign-up' element={<SignupForm />} />
                </Route>

                {/* private routes */}
                <Route element={<RootLayout />}>
                    <Route index path='/' element={<Homepage />} />
                </Route>
            </Routes>
        </main>
    )
}
