@echo off
REM Home Price Predictor - Windows Setup Script

echo.
echo ======================================
echo  Home Price Predictor Setup
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download and install from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python is not installed!
    echo Please download and install from: https://www.python.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo ✅ Python found
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install npm packages
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

REM Install backend dependencies
echo Installing backend dependencies...
call pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python packages
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Create .env file if not exists
if not exist .env (
    echo Creating .env file...
    (
        echo VITE_API_URL=http://localhost:5000
        echo FLASK_ENV=development
    ) > .env
    echo ✅ .env file created
)

echo.
echo ======================================
echo  Setup Complete! 🎉
echo ======================================
echo.
echo Next steps:
echo.
echo 1. Open VS Code:
echo    code .
echo.
echo 2. Open TWO terminals in VS Code (Terminal > New Terminal)
echo.
echo 3. In TERMINAL 1, run:
echo    npm run dev
echo.
echo 4. In TERMINAL 2, run:
echo    python backend.py
echo.
echo 5. Open browser and go to:
echo    http://localhost:5173
echo.
echo ======================================
echo.
pause
