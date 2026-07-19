@echo off
chcp 65001 >nul
cd /d "%~dp0"

set "LAUNCHER=C:\Users\dgjyj\Desktop\拼车Claude\启动Claude.ps1"
if not exist "%LAUNCHER%" (
    echo.
    echo [X] 找不到主启动器:
    echo     %LAUNCHER%
    echo.
    echo 请确认 拼车Claude 文件夹没被删除/移动
    echo.
    pause
    exit /b 1
)

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%LAUNCHER%"
if errorlevel 1 (
    echo.
    echo Script exited with error. Scroll up to see what went wrong.
    pause
)
