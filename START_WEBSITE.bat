@echo off
title ApexOrion Tech - Website Launcher
cd /d "%~dp0"

echo ===================================================
echo           APEXORION TECH WEBSITE LAUNCHER
echo ===================================================
echo.

:: Node.js check
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js install nahi hai! 
    echo Barah-e-karam Node.js install karein: https://nodejs.org/
    echo.
    pause
    exit /b
)

:: node_modules check
if not exist "node_modules\" (
    echo [INFO] Dependencies install nahi hain. Packages install ho rahe hain, thora intezar karein...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install me masla aya hai!
        pause
        exit /b
    )
)

echo [SUCCESS] Local server start ho raha hai...
echo [INFO] Browser khud-ba-khud open ho jayega.
echo.
echo URL: http://localhost:5173/
echo Server band karne ke liye is window ko close kar dein ya Ctrl + C dabayein.
echo ===================================================
echo.

:: Run dev server and open in browser automatically
call npm run dev -- --open

pause
