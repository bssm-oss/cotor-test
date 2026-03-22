#!/bin/sh
set -eu

root="${1:-.}"
found_surface=0
found_list=""

for path in \
  "$root/index.html" \
  "$root/src" \
  "$root/app" \
  "$root/pages" \
  "$root/public"
do
  if [ -e "$path" ]; then
    found_surface=1
    found_list="${found_list}\n- ${path#"$root"/}"
  fi
done

if [ "$found_surface" -eq 0 ]; then
  cat <<'EOF'
검증 결과: FAIL
판정: 이 브랜치는 아직 "아무 웹이나 만드십시오"를 충족하지 못합니다.
사유: 웹 엔트리 파일 또는 앱 디렉터리를 찾지 못했습니다.

잔여 위험:
- 브라우저에서 열어볼 HTML 또는 앱 표면이 없습니다.
- 빌드/실행 구성이 없어 시각 품질, 반응형, 접근성을 검증할 수 없습니다.
- 사용자에게 보여줄 산출물이 아직 없는 상태입니다.
EOF
  exit 1
fi

printf '검증 결과: PASS\n'
printf '판정: 웹 표면이 존재합니다.\n'
printf '확인된 경로:%b\n\n' "$found_list"
cat <<'EOF'
잔여 위험:
- 실제 브라우저 기준의 시각 품질 검증은 별도로 필요합니다.
- 반응형, 접근성, 로딩 상태는 이 스크립트만으로 보장되지 않습니다.
EOF
