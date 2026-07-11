# Android 앱 만들기 (PWA → TWA)

Dasaron Solar Guard v2.1은 설치형 PWA로 완성되어 있어, 두 가지 방법으로 안드로이드 앱이 됩니다.

## 방법 A — 홈 화면 설치 (즉시, 무료)
1. 저장소 루트의 파일들(index.html, sw.js, manifest.webmanifest, icon-*.png)을 **https 호스팅**에 업로드
   - 무료: [Netlify Drop](https://app.netlify.com/drop) 폴더 드래그&드롭 / GitHub Pages / Cloudflare Pages
2. 안드로이드 크롬에서 주소 열기 → ⋮ 메뉴 → **"홈 화면에 추가"** (또는 "앱 설치")
3. 홈 화면 아이콘 실행 → 주소창 없는 전체화면 앱 + 오프라인 동작

## 방법 B — 구글플레이 등록용 APK/AAB (TWA)
1. https://www.pwabuilder.com 접속 → 방법 A의 https 주소 입력
2. **Android 패키지** 선택 → AAB + 서명키 자동 생성
3. PWABuilder가 만들어 준 `assetlinks.json`을 호스팅의 `/.well-known/assetlinks.json`에 업로드 (앱↔웹 소유권 연결)
4. [Google Play Console](https://play.google.com/console) (등록비 $25, 1회) → 내부 테스트 → 프로덕션 심사 제출

### 또는 Bubblewrap CLI (개발자용)
```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://<호스팅주소>/manifest.webmanifest
bubblewrap build     # → app-release-signed.apk / .aab
```

## 참고
- 스토어 등록 시 필요: 앱 아이콘 512px(포함됨), 그래픽 이미지 1024×500, 스크린샷 2장, 개인정보처리방침 URL
- iOS는 사파리 → 공유 → "홈 화면에 추가" 또는 PWABuilder iOS 패키지 이용
