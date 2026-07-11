# Windows 데스크톱 앱 빌드 (Electron)

Dasaron Solar Guard v2.1을 Windows 설치형(.exe) 앱으로 만드는 방법입니다.

## 준비물
- Windows PC + [Node.js LTS](https://nodejs.org) 설치

## 빌드 절차 (약 5분)

```bat
:: 1) 이 폴더(windows)로 이동
cd windows

:: 2) 앱 본체 복사 — 저장소 루트의 웹앱 파일을 app/ 폴더로
mkdir app
copy ..\index.html app\
copy ..\sw.js app\
copy ..\manifest.webmanifest app\
copy ..\icon-192.png app\
copy ..\icon-512.png app\

:: 3) 의존성 설치
npm install

:: 4) 실행 테스트
npm start

:: 5) 설치 파일(.exe) 생성 → dist\ 폴더에 생성됨
npm run dist
```

- `dist/Dasaron Solar Guard Setup 2.1.0.exe` — 설치형
- `dist/Dasaron Solar Guard 2.1.0.exe` — 무설치 포터블

## 참고
- 인터넷이 연결되어 있으면 벡터지도(MapLibre)·차트(Chart.js)가 CDN에서 로드됩니다. 오프라인에서는 내장 SVG 지도로 자동 전환됩니다.
- 코드사이닝 인증서가 없으면 Windows SmartScreen 경고가 표시될 수 있습니다(사내 배포는 "추가 정보 → 실행"으로 진행).
