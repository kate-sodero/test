document.addEventListener("DOMContentLoaded", function () {
  // 현재 저장소 이름(test)을 포함한 경로에서 versions.json을 찾습니다.
  // 또는 간단하게 "../../versions.json" 처럼 상대 경로를 쓸 수도 있습니다.
  const repoName = window.location.pathname.split("/")[1]; 
  const fetchUrl = `/${repoName}/versions.json`;

  fetch(fetchUrl)
    .then(res => {
      if (!res.ok) throw new Error("versions.json을 찾을 수 없습니다.");
      return res.json();
    })
    .then(data => {
      const select = document.querySelector(".version-select");
      if (!select) return; // select 박스가 없는 페이지면 종료

      // 현재 URL에서 버전 부분(예: v1.0) 추출
      const pathSegments = window.location.pathname.split("/");
      // 보통 /test/v1.0/index.html 구조면 segments[2]가 버전입니다.
      const currentVersion = pathSegments[2];

      data.forEach(v => {
        const opt = document.createElement("option");
        // 이동할 주소도 /test/버전명/ 형식이 되어야 합니다.
        opt.value = `/${repoName}/${v.version}/`;
        opt.text = v.title || v.version;

        if (v.version === currentVersion) {
          opt.selected = true;
        }

        select.appendChild(opt);
      });

      select.addEventListener("change", e => {
        window.location.href = e.target.value;
      });
    })
    .catch(err => console.error("버전 로드 에러:", err));
});