@echo off
REM Quick Start Script - Run both servers

echo.
echo ======================================
echo  Home Price Predictor - Quick Start
echo ======================================
echo.
echo Checking if Node.js and Python are installed...
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js first.
    pause
    exit /b 1
)

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Python not found. Please install Python first.
    pause
    exit /b 1
)

echo ✅ All prerequisites found!
echo.
echo Starting servers...
echo.
echo Frontend will run on: http://localhost:5173
echo Backend API will run on: http://localhost:5000
echo.
echo Press Ctrl+C in either terminal to stop
echo.

REM Open VS Code
code .

REM Wait a moment for VS Code to open
timeout /t 2

echo.
echo VS Code is opening...
echo.
echo Please:
echo 1. Open Terminal > New Terminal (Ctrl + `)
echo 2. Split the terminal (Ctrl + Shift + 5)
echo.
echo Terminal 1:
echo   npm run dev
echo.
echo Terminal 2:
echo   python backend.py
echo.
pause
