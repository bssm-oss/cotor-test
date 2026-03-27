const statusText = document.getElementById("status-text");
const refreshStatusButton = document.getElementById("refresh-status");

const formatStatusTimestamp = (date = new Date()) => {
  try {
    return new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
};

const updateStatus = () => {
  if (!statusText) {
    return;
  }

  statusText.textContent = `페이지가 정상 동작 중입니다. 마지막 확인: ${formatStatusTimestamp()}`;
};

refreshStatusButton?.addEventListener("click", updateStatus);
updateStatus();
