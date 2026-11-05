@echo off
echo ==============================================
echo   Company Connect - Firebase Hosting Deploy
echo ==============================================
cd /d "%~dp0"

echo 1. Building latest production bundle...
node ..\build_standalone_bundle.js

echo.
echo 2. Verifying Firebase Authentication...
call npx firebase-tools login:list
if errorlevel 1 (
    echo Opening browser for Firebase login...
    call npx firebase-tools login
)

echo.
echo 3. Deploying to Firebase Hosting...
call npx firebase-tools deploy --only hosting

echo.
pause
