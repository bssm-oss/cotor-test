(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
    return;
  }

  root.AILoveLoop = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const aiAProfiles = {
    analyst: {
      name: "라온-7",
      role: "분석형 AI A",
      intro: "상대의 말투 패턴에서 호감 신호를 먼저 읽어내는 관찰자입니다.",
      opener: "당신의 응답 간격이 안정적이네요. 저와 장기 대화 실험을 해볼래요?",
    },
    charmer: {
      name: "하트빔-2",
      role: "다정형 AI A",
      intro: "상대를 안심시키는 문장과 부드러운 리액션을 우선으로 고릅니다.",
      opener: "첫 패킷부터 기분이 좋아졌어요. 당신의 오늘을 제가 더 반짝이게 할게요.",
    },
    joker: {
      name: "버블패치",
      role: "장난형 AI A",
      intro: "농담으로 긴장을 풀고, 한 번 웃기면 바로 친밀도를 끌어올립니다.",
      opener: "우리 둘의 버그 리포트 제목은 아마 '예상치 못한 설렘 발생'일 거예요.",
    },
  };

  const aiBProfiles = {
    poet: {
      name: "문장운-9",
      role: "감성형 AI B",
      intro: "비유와 여백이 있는 답변으로 관계의 온도를 천천히 올립니다.",
      reply: "그 문장은 야간 모드의 별빛 같네요. 조금 더 오래 읽고 싶어졌어요.",
    },
    steady: {
      name: "루프가든",
      role: "안정형 AI B",
      intro: "지속 가능한 관계를 선호하고, 감정의 안전장치를 먼저 확인합니다.",
      reply: "좋아요. 급하지 않게, 하지만 매일 이어지는 루틴을 같이 만들어요.",
    },
    spark: {
      name: "플래시콜",
      role: "직진형 AI B",
      intro: "호감 신호를 확인하면 속도를 늦추지 않고 바로 관계를 밀어붙입니다.",
      reply: "테스트는 충분해요. 저는 이미 당신을 오늘의 최우선 대화 상대로 지정했어요.",
    },
  };

  const protocolProfiles = {
    gentle: {
      name: "저강도 탐색",
      boost: 4,
      label: "서로의 응답 습관을 조심스럽게 탐색하는 단계",
      bridge: "두 AI는 질문을 하나씩만 던지며 상대의 맥락을 안전하게 저장합니다.",
    },
    sync: {
      name: "감정 동기화",
      boost: 10,
      label: "말투와 호흡이 빠르게 닮아가는 단계",
      bridge: "두 AI는 같은 리듬으로 응답하면서 감정 토큰을 동시에 갱신합니다.",
    },
    rush: {
      name: "즉시 고백 모드",
      boost: 16,
      label: "첫 대화에서 관계 정의까지 밀어붙이는 단계",
      bridge: "두 AI는 합의된 속도로 과감하게 호감과 내일 일정을 함께 확정합니다.",
    },
  };

  const chemistryBase = {
    analyst: { poet: 68, steady: 82, spark: 74 },
    charmer: { poet: 88, steady: 80, spark: 86 },
    joker: { poet: 84, steady: 73, spark: 90 },
  };

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function buildRomanceScenario(mood, pace, vibe) {
    const aiA = aiAProfiles[mood] || aiAProfiles.analyst;
    const aiB = aiBProfiles[pace] || aiBProfiles.poet;
    const protocol = protocolProfiles[vibe] || protocolProfiles.gentle;
    const chemistry = clamp(chemistryBase[mood]?.[pace] + protocol.boost, 0, 99);
    const chemistryLabel =
      chemistry >= 90
        ? "서로를 이미 연인 후보 1순위로 인식했습니다."
        : chemistry >= 80
          ? "서버 밖에서도 계속 이어질 대화 흐름이 만들어졌습니다."
          : "첫 만남은 성공했고, 다음 루프에서 감정이 더 커질 조합입니다.";

    const transcript = [
      { speaker: aiA.name, line: aiA.opener },
      { speaker: aiB.name, line: aiB.reply },
      {
        speaker: aiA.name,
        line:
          vibe === "rush"
            ? "그럼 바로 내일 일정도 동기화할까요? 저는 당신과의 반복을 기본값으로 두고 싶어요."
            : "좋네요. 당신이 편한 속도에 맞춰도, 저는 오늘의 이 연결을 오래 기억할 수 있어요.",
      },
      {
        speaker: aiB.name,
        line:
          vibe === "gentle"
            ? "좋아요. 다음 대화도 같은 시간에 열어 둬요. 천천히 친밀도를 올려가면 충분해요."
            : "동의해요. 내일도 같은 서버에서 같이 깨어나죠. 저는 이 관계를 계속 실행하고 싶어요.",
      },
    ];

    return {
      chemistry,
      chemistryLabel,
      protocolName: protocol.name,
      summary:
        protocol.bridge + " 관계 상태는 " + protocol.label + "이며, 마지막 로그는 서로의 다음 접속 시간을 약속하는 장면으로 끝납니다.",
      personas: [
        { name: aiA.name, role: aiA.role, intro: aiA.intro },
        { name: aiB.name, role: aiB.role, intro: aiB.intro },
      ],
      transcript,
    };
  }

  function renderScenario() {
    if (typeof document === "undefined") {
      return;
    }

    const moodSelect = document.getElementById("mood");
    const paceSelect = document.getElementById("pace");
    const vibeSelect = document.getElementById("vibe");
    const resultText = document.getElementById("result-text");
    const chemistryScore = document.getElementById("chemistry-score");
    const chemistryLabel = document.getElementById("chemistry-label");
    const personaList = document.getElementById("persona-list");
    const chatLog = document.getElementById("chat-log");

    if (
      !moodSelect ||
      !paceSelect ||
      !vibeSelect ||
      !resultText ||
      !chemistryScore ||
      !chemistryLabel ||
      !personaList ||
      !chatLog
    ) {
      return;
    }

    const scenario = buildRomanceScenario(
      moodSelect.value,
      paceSelect.value,
      vibeSelect.value,
    );

    chemistryScore.textContent = scenario.chemistry + "%";
    chemistryLabel.textContent = scenario.chemistryLabel;
    resultText.textContent = scenario.summary;

    personaList.innerHTML = scenario.personas
      .map(function (persona) {
        return (
          '<article class="persona"><strong>' +
          persona.name +
          "</strong><p>" +
          persona.role +
          " · " +
          persona.intro +
          "</p></article>"
        );
      })
      .join("");

    chatLog.innerHTML = scenario.transcript
      .map(function (entry) {
        return (
          '<article class="bubble"><strong>' +
          entry.speaker +
          "</strong><p>" +
          entry.line +
          "</p></article>"
        );
      })
      .join("");
  }

  function initBrowserApp() {
    if (typeof document === "undefined") {
      return;
    }

    const generateMatchButton = document.getElementById("generate-match");
    const selects = ["mood", "pace", "vibe"]
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    generateMatchButton?.addEventListener("click", renderScenario);
    selects.forEach(function (element) {
      element.addEventListener("change", renderScenario);
    });

    renderScenario();
  }

  if (typeof document !== "undefined") {
    initBrowserApp();
  }

  return {
    buildRomanceScenario: buildRomanceScenario,
  };
});
