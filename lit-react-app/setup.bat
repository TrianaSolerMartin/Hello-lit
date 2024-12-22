@echo off
setlocal EnableDelayedExpansion

echo Creating Lit Bank Application...

REM Create directories
if not exist src\components\profile mkdir src\components\profile
if not exist src\components\transactions mkdir src\components\transactions
if not exist src\components\dashboard mkdir src\components\dashboard
if not exist src\services mkdir src\services
if not exist src\styles mkdir src\styles

REM Create package.json
(
echo {
echo   "name": "lit-bank-app",
echo   "version": "1.0.0",
echo   "type": "module",
echo   "scripts": {
echo     "start": "web-dev-server --node-resolve --open --watch"
echo   },
echo   "dependencies": {
echo     "lit": "^3.1.0",
echo     "chart.js": "^4.4.1"
echo   },
echo   "devDependencies": {
echo     "@web/dev-server": "^0.4.3"
echo   }
echo ^}
) > package.json

REM Create dashboard component
(
echo import { LitElement, html, css ^} from 'lit';
echo.
echo class DashboardView extends LitElement {
echo   static styles = css`
echo     :host { display: block; ^}
echo   `;
echo.
echo   render(^) {
echo     return html`^<div^>Dashboard^</div^>`;
echo   ^}
echo ^}
echo.
echo customElements.define('dashboard-view', DashboardView^);
) > src\components\dashboard\dashboard-view.js

REM Create index.html
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<title^>Bank App^</title^>
echo ^</head^>
echo ^<body^>
echo     ^<dashboard-view^>^</dashboard-view^>
echo     ^<script type="module" src="src/components/dashboard/dashboard-view.js"^>^</script^>
echo ^</body^>
echo ^</html^>
) > index.html

REM Install and start
call npm install
call npm start

pause