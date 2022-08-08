# Tauri playground

데스크탑 앱 개발자를 체험해보자

## 먼저 rust 깔아야함

https://tauri.app/v1/guides/getting-started/prerequisites/

## Shell 사용하려면

https://tauri.app/v1/api/js/modules/shell/#shell
src-tauri/tauri.conf.json 파일에 shell 필드 추가

```json
{
	...
	"tauri": {
    "allowlist": {
      "all": true,
      "shell": {
        "all": true, // enable all shell APIs
        "execute": true, // enable process spawn APIs
        "sidecar": true, // enable spawning sidecars
        "open": true, // enable opening files/URLs using the default program
        "scope": [
          {
            "name": "run-git-commit",
            "cmd": "git",
            "args": ["commit", "-m", { "validator": "\\S+" }] // 이렇게 validator를 쓸수도 있지만,
          },
          {
            "name": "node",
            "cmd": "node",
            "args": true // 이렇게 true로만 둬도 괜찮다.
          }
        ]
      }
    },
	...
}
```

그리고 클라이언트(src) 폴더 내에서 import하여 실행하면 됨.

```js
import { Command } from "@tauri-apps/api/shell";

// 예시...
const cmd = new Command("run-git-commit", [
  "commit",
  "-m",
  "the commit message",
]);

await cmd.execute();
```
